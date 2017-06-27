import React, { Component } from 'react';
import HeaderNav from './nav.js';

class App extends Component {
	render() {
		return (
			<div>
				<HeaderNav/>

				<div className="container">
					{this.props.children}
				</div>

				<footer className="footer">
				    <div className="container">
				    	<p className="text-muted text-center center-footer">Blah</p>
				 	</div>
				</footer>

			</div>
		);
	}
}

export default App;