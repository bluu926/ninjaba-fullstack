import React, { Component } from 'react';
import {Navbar, NavbarHeader, NavbarItems, Item, NavbarDropdown, DropdownMenu} from 'react-bootstrap-navbar';

const dropdownItems = [
    {href: '#', name: 'Placeholder'},
    {href: '#', name: 'Placeholder'},
    {href: '#', name: 'Placeholder'},
];
 
const NavBar = (
    <Navbar>
        <NavbarHeader href="/" name="Website Name"/>
        <NavbarItems>
            <Item link="/#/dashboard" title="Players" />
            <NavbarDropdown name="Placeholder">
                  <DropdownMenu menuItems={dropdownItems}/>
            </NavbarDropdown>
        </NavbarItems>
    </Navbar>
);

class App extends Component {
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
		);
	}
}

export default App;