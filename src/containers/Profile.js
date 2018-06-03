// @flow

import React, {Component} from 'react';
import {Grid}  from 'react-bootstrap';

import AdminMenu from '../components/AdminMenu'
import AdminBody from './AdminBody'

import './Profile.scss'

class Profile extends Component<{}> {
    render() {
        return (
            <Grid fluid={true}>
                <section className='Profile'>
                    <AdminMenu/>
                    <AdminBody/>
                </section>
            </Grid>
        );
    }
}

export default Profile;
