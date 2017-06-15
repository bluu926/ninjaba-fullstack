import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

var products = [{
	id: 1,
	name: "Product1",
	price: 120
}, {
	id: 2,
	name: "Product2",
	price: 80
}];

const API_URL = 'https://ben-test-ninja.herokuapp.com/api';
const PLAYERS_URL = API_URL + '/auth/players';

class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.props.protectedTest();
		this.state = { data: [] };
		this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
	}

	loadCommentsFromServer() {
		axios.get(PLAYERS_URL)
			.then(res => {
				this.setState({ data: res.data });
			})
	}

	renderContent() {
		console.log('test' + this.props.content);
		if(this.props.content) {
			return (
				<p>{this.props.content}</p>
			);
		}
	}

//	render() {
//		return (
//			<div>
//				{this.renderContent()}
//			</div>
//		);
//	}

	render() {
		return (
			<BootstrapTable data={ this.state.data } striped hover condensed>
				<TableHeaderColumn dataField='id' isKey>Product ID</TableHeaderColumn>
				<TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
				<TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
			</BootstrapTable>
		);
	}

}

function mapStateToProps(state) {
	return { content: state.auth.content };
}

export default connect(mapStateToProps, actions)(Dashboard);