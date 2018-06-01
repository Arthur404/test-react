// @flow

import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';

import OfficeEditor from './OfficeEditor';

import './Office.scss'

class Office extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        }
    }

    handleUpdateOffice = (data) => {
        this.props.officeActions.updateOffice(data.id, data);
    };

    handleOfficeDelete(office) {
        this.props.officeActions.deleteOffice(office._id);
    };

    editOffice (state) {
        this.setState(prevState => ({
            isEdit: state
        }));
    };

    render() {
        const data: Array = this.props.data;

        return (
            this.state.isEdit ?
                <OfficeEditor data={data} saveOffice={this.handleUpdateOffice} stateForm={this.editOffice.bind(this)} officeStates={this.props.officeStates} /> :
                <React.Fragment>
                    <table className='OfficeAddress'>
                        <tbody>
                        <tr>
                            <th>Address:</th>
                            <td>
                                {
                                    data.primary ?
                                        <span className='OfficePrimary'><FontAwesomeIcon icon={faCheck}/>Primary HQ</span> :
                                        null
                                }
                                <address>{data.country}, {data.address}, {data.address2}, {data.code} {data.city}</address>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table className='OfficeContact'>
                        <tbody>
                        <tr>
                            <th>Phone:</th>
                            <td>
                                <span className="OfficePhone">{data.phone}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>Fax:</th>
                            <td>
                                <span className="OfficeEmail">{data.fax}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>
                                <span className="OfficeEmail">{data.email}</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="OfficeActions">
                        <button onClick={this.handleOfficeDelete.bind(this, data)} className='Btn BtnRemove BtnSm'>Remove</button>
                        <button onClick={this.editOffice.bind(this, true)} className='Btn BtnPrimary BtnSm'>Edit</button>
                    </div>
                </React.Fragment>
        );
    }
}

export default Office;
