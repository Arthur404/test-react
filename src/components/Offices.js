// @flow

import React, {Component} from 'react';

import Office from './Office';
import OfficeEditor from './OfficeEditor';

import './Offices.scss'

const initialData: {
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
} = {
    country: '',
    province: '',
    code: '',
    city: '',
    address: '',
    address2: '',
    phone: '',
    fax: '',
    email: '',
    primary: false,
    _id: ''
};

type Props = {
    officeStates: {
        offices: [],
        fetching: boolean,
        error: any,
        onCreate: boolean
    },
    officeActions: {
        loadOffices: () => Object,
        createOffice: (data: Object) => Object,
        deleteOffice: (id: string) => Object,
        updateOffice: (id: string, data: Object) => Object
    },
};

type State = {
    activeForm: boolean,
};

class Offices extends Component<Props, State> {
    state = {
        activeForm: this.props.officeStates.onCreate
    };

    componentWillMount() {
        this.props.officeActions.loadOffices()
    }

    handleShowForm(state: boolean) {
        this.setState(prevState => ({
            activeForm: state
        }))
    };

    handleNewOffice = (data: Object) => {
        this.props.officeActions.createOffice(data);
    };

    render() {
        const offices = this.props.officeStates.offices;
        const officeActions = this.props.officeActions;
        const officeStates = this.props.officeStates;

        return (
            <section className="Offices">
                <div className="NewOffice">
                    <button className='Btn' onClick={this.handleShowForm.bind(this, true)}>Add New Office</button>
                    <span className="OfficeCount">{offices.length} Offices</span>
                </div>

                    {
                        this.state.activeForm ?
                            <div className="Office">
                                <OfficeEditor data={initialData} stateForm={this.handleShowForm.bind(this)} saveOffice={this.handleNewOffice} officeActions={officeActions} officeStates={officeStates}/>
                            </div>
                            : null
                    }
                    {
                        offices.map(function(item) {
                            return (
                                <div className="Office" key={item._id}>
                                    <Office data={item} officeActions={officeActions} officeStates={officeStates} />
                                </div>
                            )
                        })
                    }
            </section>
        );
    }
}

export default Offices;
