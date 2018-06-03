// @flow

import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import Header from '../components/Header';
import Profile from './Profile';
import NoMatch from '../components/NoMatch';

type Props = {
    offices: {},
    officeActions?: {},
};

class App extends Component<Props> {
    render() {
        return (
            <React.Fragment>
                <Header/>
                <Switch>
                    <Route exact path='/profile' render={(props) => (
                        <Profile location={props}/>
                    )}/>
                    <Route component={NoMatch} />
                </Switch>
            </React.Fragment>
        );
    }
}

export default App;