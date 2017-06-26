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

				<div id="footer">
			      <div class="container">
			        <p class="text-muted credit">Footer.</p>
			      </div>
			    </div>

			</div>
		);
	}
}

export default App;