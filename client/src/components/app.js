import React, { Component } from 'react';
import HeaderNav from './nav.js';

class App extends Component {
	render() {
		return (
			<div>
				
				<div className="container">
					<HeaderNav/>

					<div className="container">
						{this.props.children}
					</div>
				</div>

				<footer className="footer">
				    <div className="container">
				    	<p className="text-muted">Footer</p>
				 	</div>
				</footer>

			</div>
		);
	}
}

export default App;