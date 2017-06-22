import React, { Component } from 'react';
import {Navbar, NavbarHeader, NavbarItems, Item, NavbarDropdown, DropdownMenu} from 'react-bootstrap-navbar';

const dropdownItems = [
    {href: '#', name: 'Placeholder'},
    {href: '#', name: 'Placeholder'},
    {href: '#', name: 'Placeholder'},
];
 
var NavBar = React.createClass({
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
});

var App = React.createClass({
	render() {
		return (
			<div>
				<p>Header here</p>
				<NavBar />

				<div className="container">
					{this.props.children}
				</div>

				<p>Footer here</p>
			</div>
		)
	}
});
