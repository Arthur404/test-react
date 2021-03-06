// @flow

import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';

import OfficeEditor from './OfficeEditor';
import OfficeRemoving from './OfficeRemoving';

import './Office.scss'

type Props = {
    officeStates: {
        offices: [],
        fetching: boolean,
        error: any,
        onCreate: boolean
    },
    officeActions: {
        deleteOffice: (id: string) => Object,
        updateOffice: (id: string, data: Object) => Object
    },
    data: {}
};

type State = {
    isEdit: boolean,
    isRemove: boolean
};

class Office extends Component<Props, State> {
    state = {
        isEdit: false,
        isRemove: false
    };

    handleCancelDeleteOffice(state: boolean) {
        this.setState(() => ({
            isRemove: state
        }));
    };

    handleUpdateOffice = (data: {id: string}) => {
        this.props.officeActions.updateOffice(data.id, data);
    };

    handleDeleteOffice(office: {_id: string}) {
        this.props.officeActions.deleteOffice(office._id);
    };

    editOffice (state: boolean) {
        this.setState(prevState => ({
            isEdit: state
        }));
    };

    render() {
        const data: Object = this.props.data;

        return (
            this.state.isEdit ?
                <OfficeEditor data={data} saveOffice={this.handleUpdateOffice} stateForm={this.editOffice.bind(this)} officeStates={this.props.officeStates} /> :
                <React.Fragment>
                    {
                        this.state.isRemove ?
                            <OfficeRemoving handleCancelDeleteOffice={this.handleCancelDeleteOffice.bind(this)} handleDeleteOffice={this.handleDeleteOffice.bind(this, data)}/>
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
                        <button onClick={this.handleCancelDeleteOffice.bind(this, true)} className='Btn BtnRemove BtnSm'>Remove</button>
                        <button onClick={this.editOffice.bind(this, true)} className='Btn BtnPrimary BtnSm'>Edit</button>
                    </div>
                </React.Fragment>
        );
    }
}

export default Office;
