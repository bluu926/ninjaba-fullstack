import React, { Component } from 'react';
import {Navbar, NavbarHeader, NavbarItems, Item, NavbarDropdown, DropdownMenu} from 'react-bootstrap-navbar';

const dropdownItems = [
    {href: '#', name: 'Placeholder'},
    {href: '#', name: 'Placeholder'},
    {href: '#', name: 'Placeholder'},
];
 
class Nav extends React.Component {
    render() { 
        return (
            <Navbar>
                <NavbarHeader href="/" name="Website Name"/>
                <NavbarItems>
                    <Item link="/#/dashboard" title="Players" />
                    <NavbarDropdown name="Placeholder">
                          <DropdownMenu menuItems={dropdownItems}/>
                    </NavbarDropdown>
                </NavbarItems>
            </Navbar>
        )
	}
}

export default Nav;