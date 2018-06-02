// @flow

import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faAngleDown} from '@fortawesome/fontawesome-free-solid';

import './OfficeRemoving.scss'

class OfficeRemoving extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRemoving: false,
            reason: '',
            notes: '',
            reasonValid: true
        }
    }

    handleCancelRemoveOffice = (e) => {
        if (e.currentTarget === e.target) {
            if(this.props.handleCancelRemoveOffice) {
                this.props.handleCancelRemoveOffice(false);
            }
        }
    };

    setFocus(fieldName) {
        this[fieldName].focus();
    };

    handleSetValue = (e) => {
        const value = e.target.innerText;
        this.setState(() => ({
            reason: value
        }));
    };

    handleChangeNotes = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        this.setState({[name]: value}, () => {
            this.validateField(name, value);
        });
    };

    validateField(fieldName: string, value: string) {
        let reasonValid: string = this.state.reasonValid;

        switch(fieldName) {
            case 'country':
                reasonValid = value.length > 1 && value.length < 255;
                break;
            default:
                break;
        }

        this.setState({
            reasonValid: reasonValid,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const officeData : {
            reason: string,
        } = {
            reason: this.state.reason
        };

        const err = this.validateForm();

        if(!err) {
            console.log(officeData);
            this.props.handleOfficeDelete();
        }
    };

    validateForm = () => {
        let isError = false;
        const errors = {
            reasonValid: true
        };

        errors.reasonValid = this.state.reason.length > 1 && this.state.reason.length < 255;

        if (!errors.reasonValid) {
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
            <div onClick={this.handleRemoveOffice} className='PopupRemove active'>
                <div className="RemoveBlock">
                    <p className="Description">Please tell us why you’re removing this record.</p>
                    <form autoComplete="off" className='OfficeRemove' onSubmit={this.handleSubmit}>
                        <div className="FormGroup">
                            <span onClick={this.setFocus.bind(this, 'reason')} className='AngleDown'>
                                <FontAwesomeIcon icon={faAngleDown}/>
                            </span>
                            <input ref={(input) => { this.reason = input; }} className={this.state.reasonValid ? '' : 'invalid'} name='reason' value={this.state.reason} type='text'/>
                            <ul>
                                <li onClick={this.handleSetValue}>Former Record</li>
                                <li onClick={this.handleSetValue}>Duplicate Record</li>
                                <li onClick={this.handleSetValue}>Record never Existed</li>
                                <li onClick={this.handleSetValue}>Other</li>
                            </ul>
                        </div>
                        <div className="FormGroup">
                            <label htmlFor="Notes">Notes:</label>
                            <textarea rows="4" onChange={this.handleChangeNotes} name='notes' value={this.state.notes} className='Notes' id='Notes'/>
                        </div>
                        <div className="FormAction">
                            <button onClick={this.handleCancelRemoveOffice} className='Btn'>Cancel</button>
                            <button type='submit' className='Btn BtnPrimary'>Remove Record</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default OfficeRemoving;