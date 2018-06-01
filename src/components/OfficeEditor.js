// @flow

import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';

import {COUNTRIES, STATES} from '../constants/OfficeConst';

import './OfficeEditor.scss'

type State = {
    country: String,
    province: String,
    code: String,
    city: String,
    address: String,
    address2: String,
    phone: String,
    fax: String,
    email: String,
    primary: Boolean,
    countryValid: Boolean,
    provinceValid: Boolean,
    codeValid: Boolean,
    cityValid: Boolean,
    addressValid: Boolean,
    address2Valid: Boolean,
    phoneValid: Boolean,
    faxValid: Boolean,
    emailValid: Boolean,
};

class OfficeEditor extends Component<State> {
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

    handleShowForm = (e) => {
        e.preventDefault();
        if(this.props.stateForm) {
            this.props.stateForm(false);
        }
    };

    handleChange(array, e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, () => {
            this.validateField(name, value);
        });

        if(name === 'country' || name === 'city') {
            this.handleSearch(name, value, array)
        }
    };

    handleSearch = (name, val, array) => {
        const searchQuery = val.toLowerCase();

        const displayArray = array.filter((item) => {
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

    handleSetValue (fieldName, value) {
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
        let countryValid: string = this.state.countryValid;
        let provinceValid: string = this.state.provinceValid;
        let codeValid: string = this.state.codeValid;
        let cityValid: string = this.state.cityValid;
        let addressValid: string = this.state.addressValid;
        let address2Valid: string = this.state.address2Valid;
        let phoneValid: string = this.state.phoneValid;
        let faxValid: string = this.state.faxValid;
        let emailValid: string = this.state.emailValid;

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
                phoneValid = (/([+]?\d{1,2}[.-\\s]?)?(\d{2,3}[.-]?){2}\d{4}/gm.test(value)) || (value === '');
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

    handleSubmit = (e) => {
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
        errors.phoneValid = (/([+]?\d{1,2}[.-\\s]?)?(\d{2,3}[.-]?){2}\d{4}/gm.test(this.state.phone)) || (this.state.phone === '');
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

    render() {
        return (
            <form autoComplete="off" className="OfficeEdit" onSubmit={this.handleSubmit}>
                <div className="FormBox">
                    <div className="FormGroup">
                        <label htmlFor="Country">*Country:</label>
                        <input className={this.state.countryValid ? '' : 'invalid'} type='text' name="country" onChange={this.handleChange.bind(this, COUNTRIES)} value={this.state.country} id="Country"/>
                        <ul className='Countries'>
                            {
                                this.state.displayCountries.map((country, id) => (
                                    <li onClick={this.handleSetValue.bind(this, "country", country)} key={id} >{country}</li>
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
                    <div className="FormGroup">
                        <label htmlFor="City">*City:</label>
                        <input className={this.state.cityValid ? '' : 'invalid'} type='text' name='city' onChange={this.handleChange.bind(this, COUNTRIES)} value={this.state.city} id='City'/>
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
