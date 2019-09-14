import React from 'react';
import { Button } from '@rmwc/button';
import { TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarTitle, TopAppBarFixedAdjust, TopAppBarActionItem } from '@rmwc/top-app-bar';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './Title.css';

import Logo from '../assets/images/logo.png';

class NavBar extends React.Component {
    render() {
        return (
            <>
                <div className='title'>
                    {/* <img src={Logo} /> */}
                    <h4>Attire Addict.</h4>
                </div>
            </>
        );
    }
}

export { NavBar as default, NavBar };