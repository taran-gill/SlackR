import React from 'react';
import { Button } from '@rmwc/button';
import { TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarTitle, TopAppBarFixedAdjust, TopAppBarActionItem } from '@rmwc/top-app-bar';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './NavBar.css';

import Logo from '../assets/images/logo.jpg';

class NavBar extends React.Component {
    render() {
        return (
            <>
                <TopAppBar className='navbar'>
                    <TopAppBarRow>
                    <TopAppBarSection alignStart>
                        <img src={Logo} className='navbar__logo' />
                        <TopAppBarTitle>Slack R' Us</TopAppBarTitle>
                    </TopAppBarSection>
                    <TopAppBarSection alignEnd>
                        <Router>
                            <Route
                                path="/" 
                                exact 
                                render={() => (
                                    <>
                                        <Button label="Sign Up" theme='secondary' outlined />
                                        <Button label="Sign In" theme='secondary' />
                                    </>
                                )} 
                            />
                        </Router>
                    </TopAppBarSection>
                    </TopAppBarRow>
                </TopAppBar>
                <TopAppBarFixedAdjust />
            </>
        );
    }
}

export { NavBar as default, NavBar };