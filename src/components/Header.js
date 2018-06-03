// @flow

import React, {Component} from 'react';
import {Grid}  from 'react-bootstrap';
import {Link} from 'react-router-dom'

import './Header.scss'
import logo from '../img/spd-u.svg'

class Header extends Component<{}> {
    render() {
        return (
            <header className='MainHeader'>
                <Grid fluid={true}>
                    <div className="NawWrap">
                        <div className="LeftNaw">
                            <h1 className='Logo'>
                                <Link to="/">
                                    <img src={logo} alt="SPD logo"/>
                                    SPD University
                                </Link>
                            </h1>
                            <Link to="/profile">
                                Profile Editor
                            </Link>
                        </div>
                        <div className="RightNaw">
                            <Link to="/contact">
                                Contact
                            </Link>
                            <Link to="/faq">
                                FAQs
                            </Link>
                            <Link to="/">
                                Save and Exit
                            </Link>
                        </div>
                    </div>
                </Grid>
            </header>
        );
    }
}

export default Header;
