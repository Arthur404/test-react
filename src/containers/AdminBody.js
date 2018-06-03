// @flow

import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';

import OfficeActions from '../actions/OfficeActions'
import Offices from '../components/Offices'

import './AdminBody.scss'

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
    }
}

class AdminBody extends Component<Props> {
    render() {
        return (
            <section className="AdminBody">
                <div className="BodyHeader">
                    <h2 className='Title'>
                        Offices <span>| Company info</span>
                    </h2>
                    <p className='Description'>Updating your location and contact information helps you appeal to regional investors and service providers.</p>
                </div>
                <Offices officeStates={this.props.officeStates} officeActions={this.props.officeActions}/>
                <div className="BodyFooter">
                    <div className="LeftActions">
                        <button className='Btn'>Back</button>
                        <span className='Comments'><FontAwesomeIcon icon={faPlusCircle}/>Provide additional comments</span>
                    </div>
                    <div className="RightActions">
                        <button className='Btn'>Skip this step</button>
                        <button className='Btn BtnPrimary'>Continue</button>
                    </div>
                </div>
            </section>
        );
    }
}


const mapStateToProps = (state: Object) : Object => (
    {
        officeStates: state.OfficeReducer
    }
);

const mapDispatchToProps = (dispatch: Object) : Object => (
    {
        officeActions: bindActionCreators(OfficeActions, dispatch)
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(AdminBody);
