import React, { Component } from 'react';
import HeaderNav from './nav.js';

class App extends Component {
	render() {
		return (
			<div>
				<HeaderNav/>

				<div id="wrap">
					<div className="container">
						{this.props.children}
					</div>
				
					<div id="push"></div>
				</div>

				<div id="footer">
			      <div className="container">
			        <p className="text-muted credit">Footer.</p>
			      </div>
			    </div>

			</div>
		);
	}
}

export default App;