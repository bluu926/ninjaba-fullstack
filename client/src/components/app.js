import React, { Component } from 'react';
import {Navbar, NavbarHeader, NavbarItems, Item, NavbarDropdown, DropdownMenu} from 'react-bootstrap-navbar';

const dropdownItems = [
    {href: '#', name: 'Placeholder'},
    {href: '#', name: 'Placeholder'},
    {href: '#', name: 'Placeholder'},
];

var App = React.createClass({
	render() {
		return (
			<div>
				<p>Header here</p>

				<div className="container">
					{this.props.children}
				</div>

				<p>Footer here</p>
			</div>
		)
	}
});
