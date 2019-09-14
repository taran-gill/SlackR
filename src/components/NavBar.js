import React from 'react';
import { Button } from '@rmwc/button';
import { TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarTitle, TopAppBarFixedAdjust, TopAppBarActionItem } from '@rmwc/top-app-bar';

import './NavBar.css';

import Logo from '../assets/images/logo.png';

class NavBar extends React.Component {
    render() {
        return (
            <>
                <TopAppBar className='navbar'>
                    <TopAppBarRow>
                    <TopAppBarSection alignStart>
                        <img src={Logo} className='navbar__logo' />
                        <TopAppBarTitle>Haulsmart</TopAppBarTitle>
                    </TopAppBarSection>
                    <TopAppBarSection alignEnd>
                        <Button label="Sign Up" theme='secondary' outlined />
                        <Button label="Sign In" theme='secondary' />
                    </TopAppBarSection>
                    </TopAppBarRow>
                </TopAppBar>
                <TopAppBarFixedAdjust />
            </>
        );
    }
}

export { NavBar as default, NavBar };