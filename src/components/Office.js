// @flow

import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';

import OfficeEditor from './OfficeEditor';
import OfficeRemoving from './OfficeRemoving';

import './Office.scss'

class Office extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            isRemove: false
        }
    }

    handleRemoveOffice(state) {
        this.setState(() => ({
            isRemove: state
        }));
    };

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
                    {
                        this.state.isRemove ?
                            <OfficeRemoving handleCancelRemoveOffice={this.handleRemoveOffice.bind(this)} handleOfficeDelete={this.handleOfficeDelete.bind(this, data)}/>
                            : null
                    }
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
                                <address>
                                    {data.address ? <span>{data.address} <br/></span> : null}
                                    {data.address2 ? <span>{data.address2} <br/></span> : null}
                                    {data.city ? `${data.city},` : null} {data.province} {data.code ? <span>{data.code} <br/></span> : null}
                                    {data.country}
                                </address>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table className='OfficeContact'>
                        <tbody>
                        {
                            data.phone ?
                                <tr>
                                    <th>Phone:</th>
                                    <td>
                                        <span className="OfficePhone">{data.phone}</span>
                                    </td>
                                </tr>
                                : null
                        }
                        {
                            data.fax ?
                                <tr>
                                    <th>Fax:</th>
                                    <td>
                                        <span className="OfficeEmail">{data.fax}</span>
                                    </td>
                                </tr>
                                : null
                        }
                        {
                            data.email ?
                                <tr>
                                    <th>Email:</th>
                                    <td>
                                        <span className="OfficeEmail">{data.email}</span>
                                    </td>
                                </tr>
                                : null
                        }
                        </tbody>
                    </table>
                    <div className="OfficeActions">
                        <button onClick={this.handleRemoveOffice.bind(this, true)} className='Btn BtnRemove BtnSm'>Remove</button>
                        <button onClick={this.editOffice.bind(this, true)} className='Btn BtnPrimary BtnSm'>Edit</button>
                    </div>
                </React.Fragment>
        );
    }
}

export default Office;
