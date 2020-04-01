import React from 'react';
import { Component } from 'react';

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

export default class Header extends Component {
    render(){
        return (
            <Navbar>
                <a href="#">
                    <FontAwesomeIcon icon={faBars} size="2x" />
                </a>
                
                <Navbar.Brand>CredFica</Navbar.Brand>
                
                <a href="#">
                    <span>Master</span>
                    <FontAwesomeIcon icon={faUserCircle} size="2x" />
                </a>
            </Navbar>
        )
    }
}

