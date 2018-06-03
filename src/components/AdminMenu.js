// @flow

import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';

import './AdminMenu.scss'

import step from '../img/8.svg'

class AdminMenu extends Component<{}> {
    handleShowItems = (e: SyntheticEvent<HTMLSpanElement>) => {
        const currentEl = e.currentTarget;
        currentEl.classList.toggle('Active')
    };

    render() {
        return (
            <div className='AdminMenu'>
                <div className='Steps'>
                    <img src={step} alt='Step'/>
                </div>
                <ul className='MenuItems'>
                    <li className='MenuItem'>
                        <span className='Active' onClick={this.handleShowItems}>Company info</span>
                        <ul className='SubItems'>
                            <li className='SubItem Check'>
                                Basic Info <FontAwesomeIcon className='CheckIcon' icon={faCheck} />
                            </li>
                            <li className='SubItem Active'>
                                Offices
                            </li>
                            <li className='SubItem'>
                                Competitors
                            </li>
                        </ul>
                    </li>
                    <li className='MenuItem'>
                        <span onClick={this.handleShowItems}>My Firm</span>
                        <ul className='SubItems'>
                            <li className='SubItem'>
                                Basic Info
                            </li>
                        </ul>
                    </li>
                    <li className='MenuItem'>
                        <span onClick={this.handleShowItems}>Deals</span>
                        <ul className='SubItems'>
                            <li className='SubItem'>
                                Basic Info
                            </li>
                        </ul>
                    </li>
                    <li className='MenuItem'>
                        <span onClick={this.handleShowItems}>Financial</span>
                        <ul className='SubItems'>
                            <li className='SubItem'>
                                Basic Info
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default AdminMenu;
