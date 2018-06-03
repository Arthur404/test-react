// @flow

import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faAngleDown} from '@fortawesome/fontawesome-free-solid';

import './OfficeRemoving.scss'

type Props = {
    handleDeleteOffice: () => void,
    handleCancelDeleteOffice: (state: boolean) => void
}

type State = {
    isRemoving: boolean,
    reason: string,
    notes: string,
    reasonValid: boolean
};

class OfficeRemoving extends Component<Props, State> {
    state = {
        isRemoving: false,
        reason: '',
        notes: '',
        reasonValid: true
    };

    handleCancelDeleteOffice = (e: SyntheticEvent<HTMLElement>) => {
        if (e.currentTarget === e.target) {
            if(this.props.handleCancelDeleteOffice) {
                this.props.handleCancelDeleteOffice(false);
            }
        }
    };

    handleSetValue = (e: SyntheticEvent<HTMLUListElement>) => {
        const value: string = e.currentTarget.textContent;
        this.setState(() => ({
            reason: value
        }));
    };

    handleChangeNotes = (e: SyntheticEvent<HTMLInputElement>) => {
        const name: string = e.currentTarget.name;
        let value: string = e.currentTarget.value;

        this.setState({[name]: value}, () => {
            this.validateField(name, value);
        });
    };

    validateField(fieldName: string, value: string) {
        let reasonValid: boolean = this.state.reasonValid;

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

    handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const officeData : {
            reason: string,
        } = {
            reason: this.state.reason
        };

        const err = this.validateForm();

        if(!err) {
            console.log(officeData);
            this.props.handleDeleteOffice();
        }
    };

    validateForm = () => {
        let isError: boolean = false;
        const errors: {
            reasonValid: boolean
        } = {
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
            <div onClick={this.handleCancelDeleteOffice} className='PopupRemove active'>
                <div className="RemoveBlock">
                    <p className="Description">Please tell us why you’re removing this record.</p>
                    <form autoComplete="off" className='OfficeRemove' onSubmit={this.handleSubmit}>
                        <div className="FormGroup">
                            <label htmlFor='Reason' className='AngleDown'>
                                <FontAwesomeIcon icon={faAngleDown}/>
                            </label>
                            <input type='text' className={this.state.reasonValid ? '' : 'invalid'} name='reason' value={this.state.reason} id='Reason'/>
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
                            <button onClick={this.handleCancelDeleteOffice} className='Btn'>Cancel</button>
                            <button type='submit' className='Btn BtnPrimary'>Remove Record</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default OfficeRemoving;