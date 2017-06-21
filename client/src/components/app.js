import React, { Component } from 'react';
import {Navbar, NavbarHeader, NavbarItems, Item, NavbarDropdown, DropdownMenu} from 'react-bootstrap-navbar';

const dropdownItems = [
    {href: '#', name: 'Placeholder'},
    {href: '#', name: 'Placeholder'},
    {href: '#', name: 'Placeholder'},
];

const navbar = (
	<Navbar>
	    <NavbarHeader href="homepage.html" name="Website Name"/>
	    <NavbarItems>
	        <Item link="/#/dashboard" title="Players" />
	        <Item link="/#/login" title="Login" />
	        <NavbarDropdown name="Ignore">
	              <DropdownMenu menuItems={dropdownItems}/>
	        </NavbarDropdown>
	    </NavbarItems>
	</Navbar>
);

class App extends Component {
	render() {
		return (
			<div>
				<p>~~~~~</p>
				{navbar}				

				<div className="container">
					{this.props.children}
				</div>

				<p>Footer here</p>
			</div>
		);
	}
}

export default App;