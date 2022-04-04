import React from 'react'
import {Routes, useNavigate } from 'react-router-dom';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faEarth,faHome } from '@fortawesome/free-solid-svg-icons'
import { Profilo } from '../Profilo';
import Home from './Home';

import './style.css';

export const Sidebar = () => {
    const navigate = useNavigate();

    return (

        <React.Fragment>
            <SideNav opened="true" aria-expanded="true"
                onSelect={(selected: string) => {
                    const to = '/' + selected;
                    if (window.location.pathname !== to) {
                        navigate(to);
                    }
                }}

            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="/">
                    <NavItem eventKey="home">
                        <NavText > Home</NavText>
                        <NavIcon>
                            <FontAwesomeIcon icon={faHome} style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                    </NavItem>
                    <NavItem eventKey="interessi">
                        <NavIcon>
                            <FontAwesomeIcon icon={faEarth} style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Interessi
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="profilo">
                        <NavIcon>
                            <FontAwesomeIcon icon={faDashboard} style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Modifica Profilo
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
            <main>
                <Routes path="/profilo" exact component={<Profilo />} />
                <Routes path="/home" component={<Home />} />
            </main>
        </React.Fragment>
    )
}
