// @flow

import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faCheck, faAngleDown} from '@fortawesome/fontawesome-free-solid';

import {COUNTRIES, STATES} from '../constants/OfficeConst';

import './OfficeEditor.scss'

type Props = {
    data: {
        country: string,
        province: string,
        code: string,
        city: string,
        address: string,
        address2: string,
        phone: string,
        fax: string,
        email: string,
        primary: boolean,
        _id: string
    },
    stateForm: Function,
    saveOffice: Function,
    officeStates: {
        onCreate: boolean
    }
};

type State = {
    country: string,
    province: string,
    code: string,
    city: string,
    address: string,
    address2: string,
    phone: string,
    fax: string,
    email: string,
    primary: boolean,
    id: string,
    countryValid: boolean,
    provinceValid: boolean,
    codeValid: boolean,
    cityValid: boolean,
    addressValid: boolean,
    address2Valid: boolean,
    phoneValid: boolean,
    faxValid: boolean,
    emailValid: boolean,
    displayCountries: Array<string>,
    displayCity: Array<string>
};

class OfficeEditor extends Component<Props, State> {
    state = {
        country: this.props.data.country,
        province: this.props.data.province,
        code: this.props.data.code,
        city: this.props.data.city,
        address: this.props.data.address,
        address2: this.props.data.address2,
        phone: this.props.data.phone,
        fax: this.props.data.fax,
        email: this.props.data.email,
        primary: this.props.data.primary,
        id: this.props.data._id,
        countryValid: true,
        provinceValid: true,
        codeValid: true,
        cityValid: true,
        addressValid: true,
        address2Valid: true,
        phoneValid: true,
        faxValid: true,
        emailValid: true,
        displayCountries: COUNTRIES,
        displayCity: STATES
    };

    country:? HTMLInputElement;
    city:? HTMLInputElement;

    handleShowForm = (e: SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(this.props.stateForm) {
            this.props.stateForm(false);
        }
    };

    handleChange(array: Array<string>, e: SyntheticEvent<HTMLInputElement>) {
        const name: string = e.currentTarget.name;
        let value: string = e.currentTarget.value;
        if (name === 'phone') {
            let x = value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/);
            if (x) {
                value = '+' + x[1] + (!x[3] ? x[2] : ' (' + x[2] + ') ') + x[3] + (x[4] ? '-' + x[4] : '');
                this.setState(() => ({
                    phone: value
                }));
            }
        }
        this.setState({[name]: value}, () => {
            this.validateField(name, value);
        });

        if(name === 'country' || name === 'city') {
            this.handleSearch(name, value, array)
        }
    };

    handleSearch = (name: string, val: string, array: Array<string>) => {
        const searchQuery = val.toLowerCase();

        const displayArray: Array<string> = array.filter((item) => {
            let searchValue = item.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });

        if(name === 'country') {
            this.setState(() => ({
                displayCountries: displayArray
            }));
        }

        if(name === 'city') {
            this.setState(() => ({
                displayCity: displayArray
            }));
        }
    };

    handleSetValue (fieldName: string, value: string) {
        this.setState({[fieldName]: value}, () => {
            this.validateField(fieldName, value);
        });
    };

    handleCheck = () => {
        this.setState(prevState => ({
            primary: !prevState.primary
        }));
    };

    validateField(fieldName: string, value: string) {
        let countryValid: boolean = this.state.countryValid;
        let provinceValid: boolean = this.state.provinceValid;
        let codeValid: boolean = this.state.codeValid;
        let cityValid: boolean = this.state.cityValid;
        let addressValid: boolean = this.state.addressValid;
        let address2Valid: boolean = this.state.address2Valid;
        let phoneValid: boolean = this.state.phoneValid;
        let faxValid: boolean = this.state.faxValid;
        let emailValid: boolean = this.state.emailValid;

        switch(fieldName) {
            case 'country':
                countryValid = value.length > 1 && value.length < 255;
                break;
            case 'province':
                provinceValid = value.length > 1 && value.length < 255;
                break;
            case 'code':
                codeValid = value.length > 1 && value.length < 255;
                break;
            case 'city':
                cityValid = value.length > 1 && value.length < 255;
                break;
            case 'address':
                addressValid = value.length > 1 && value.length < 255;
                break;
            case 'address2':
                address2Valid = (value.length > 1 && value.length < 255) || (value === '');
                break;
            case 'phone':
                phoneValid = (/^\+\d{1}\s?\(\d{3}\)\s?\d{3}\-\d{4}$/g.test(value)) || (value === '');
                break;
            case 'fax':
                faxValid = (value.length > 1 && value.length < 255) || (value === '');
                break;
            case 'email':
                emailValid = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(value);
                break;
            default:
                break;
        }

        this.setState({
            countryValid: countryValid,
            provinceValid: provinceValid,
            codeValid: codeValid,
            cityValid: cityValid,
            addressValid: addressValid,
            address2Valid: address2Valid,
            phoneValid: phoneValid,
            faxValid: faxValid,
            emailValid: emailValid
        });
    };

    handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const officeData : {
            country: string,
            province: string,
            code: string,
            city: string,
            address: string,
            address2: string,
            phone: string,
            fax: string,
            email: string,
            primary: boolean,
            id: string
        } = {
            country: this.state.country,
            province: this.state.province,
            code: this.state.code,
            city: this.state.city,
            address: this.state.address,
            address2: this.state.address2,
            phone: this.state.phone,
            fax: this.state.fax,
            email: this.state.email,
            primary: this.state.primary,
            id: this.state.id
        };

        const err = this.validateForm();

        if(!err) {
            this.props.saveOffice(officeData);

            if(this.props.stateForm) {
                this.props.stateForm(this.props.officeStates.onCreate);
            }
        }
    };

    validateForm = () => {
        let isError = false;
        const errors = {
            countryValid: true,
            provinceValid: true,
            codeValid: true,
            cityValid: true,
            addressValid: true,
            address2Valid: true,
            phoneValid: true,
            faxValid: true,
            emailValid: true
        };

        errors.countryValid = this.state.country.length > 1 && this.state.country.length < 255;
        errors.provinceValid = this.state.province.length > 1 && this.state.province.length < 255;
        errors.codeValid = this.state.code.length > 1 && this.state.code.length < 255;
        errors.cityValid = this.state.city.length > 1 && this.state.city.length < 255;
        errors.addressValid = this.state.address.length > 1 && this.state.address.length < 255;
        errors.address2Valid = this.state.address2.length < 255;
        errors.phoneValid = (/^\+\d{1}\s?\(\d{3}\)\s?\d{3}\-\d{4}$/g.test(this.state.phone)) || (this.state.phone === '');
        errors.faxValid = this.state.fax.length < 255;
        errors.emailValid = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(this.state.email) || (this.state.email === '');

        if (!errors.countryValid
            || !errors.provinceValid
            || !errors.codeValid
            || !errors.cityValid
            || !errors.addressValid
            || !errors.address2Valid
            || !errors.phoneValid
            || !errors.faxValid
            || !errors.emailValid) {
            isError = true
        }

        this.setState({
            ...this.state,
            ...errors
        });

        return isError;
    };

    setFocus(fieldName: string) {
        this[fieldName].focus();
    }

    render() {
        return (
            <form autoComplete="off" className="OfficeEdit" onSubmit={this.handleSubmit}>
                <div className="FormBox">
                    <div className="FormGroup Select">
                        <label htmlFor="Country">*Country:</label>
                        <span onClick={this.setFocus.bind(this, 'country')} className='AngleDown'>
                            <FontAwesomeIcon icon={faAngleDown}/>
                        </span>
                        <input ref={(input) => { this.country = input; }} className={this.state.countryValid ? '' : 'invalid'} type='text' name='country' onChange={this.handleChange.bind(this, COUNTRIES)} value={this.state.country} id="Country"/>
                        <ul className='Countries'>
                            {
                                this.state.displayCountries.map((country, id) => (
                                    <li onClick={this.handleSetValue.bind(this, 'country', country)} key={id} >{country}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="FormGroup">
                        <label htmlFor="Province">*State/Province:</label>
                        <input className={this.state.provinceValid ? '' : 'invalid'} type='text' name='province' onChange={this.handleChange.bind(this, [])} value={this.state.province} id='Province'/>
                    </div>
                    <div className="FormGroup">
                        <label htmlFor="Code">*Postal Code:</label>
                        <input className={this.state.codeValid ? '' : 'invalid'} type='text' name='code' onChange={this.handleChange.bind(this, [])} value={this.state.code} id='Code'/>
                    </div>
                    <div className="FormGroup Select">
                        <label htmlFor="City">*City:</label>
                        <span onClick={this.setFocus.bind(this, 'city')} className="AngleDown">
                            <FontAwesomeIcon icon={faAngleDown}/>
                        </span>
                        <input ref={(input) => { this.city = input; }} className={this.state.cityValid ? '' : 'invalid'} type='text' name='city' onChange={this.handleChange.bind(this, STATES)} value={this.state.city} id='City'/>
                        <ul className='City'>
                            {
                                this.state.displayCity.map((city, id) => (
                                    <li onClick={this.handleSetValue.bind(this, "city", city)} key={id} >{city}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="FormGroup">
                        <label htmlFor="Street">*Street Address:</label>
                        <input className={this.state.addressValid ? '' : 'invalid'} type='text' name='address' onChange={this.handleChange.bind(this, [])} value={this.state.address} id='Street'/>
                    </div>
                    <div className="FormGroup">
                        <label htmlFor="Address2">Address 2:</label>
                        <input className={this.state.address2Valid ? '' : 'invalid'} type='text' name='address2' onChange={this.handleChange.bind(this, [])} value={this.state.address2} id='Address2'/>
                    </div>
                </div>
                <div className="FormBox">
                    <div className="FormGroup">
                        <label htmlFor="Phone">Phone:</label>
                        <input className={this.state.phoneValid ? '' : 'invalid'} type='text' name='phone' onChange={this.handleChange.bind(this, [])} value={this.state.phone} id='Phone'/>
                    </div>
                    <div className="FormGroup">
                        <label htmlFor="Fax">Fax:</label>
                        <input className={this.state.faxValid ? '' : 'invalid'} type='text' name='fax' onChange={this.handleChange.bind(this, [])} value={this.state.fax} id='Fax'/>
                    </div>
                    <div className="FormGroup">
                        <label htmlFor="Email">Email:</label>
                        <input className={this.state.emailValid ? '' : 'invalid'} type='email' name='email' onChange={this.handleChange.bind(this, [])} value={this.state.email} id='Email'/>
                    </div>
                    <div className="FormGroup">
                        <label htmlFor="OfficeType">Office Type:</label>
                        <input className='OfficeType' type='checkbox' name='primary' onChange={this.handleCheck} value={this.state.primary} checked={this.state.primary} id='OfficeType'/>
                        <span className='CustomCheckBox'>
                            <span onClick={this.handleCheck} className='CustomCheck'><FontAwesomeIcon icon={faCheck}/></span>
                            <span onClick={this.handleCheck} className='Label'>Primary HQ</span>
                        </span>
                    </div>
                </div>
                <div className="EditActions">
                    <button onClick={this.handleShowForm} className='Btn BtnSm'>Cancel</button>
                    <button type='submit' className='Btn BtnPrimary BtnSm'>Save</button>
                </div>
            </form>
        );
    }
}

export default OfficeEditor;
