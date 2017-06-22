import React, { Component } from 'react';
import Nav from './nav.js';

class App extends Component {
	render() {
		return (
			<div>
				<p>Header here</p>
				<Nav/>

				<div className="container">
					{this.props.children}
				</div>

				<p>Footer here</p>
			</div>
		);
	}
}

export default App;