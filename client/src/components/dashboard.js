import React, { Component } from 'react';
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

class Dashboard extends Component {

	constructor(props) {
		super(props);
		//this.props.protectedTest();
		this.props.loadPlayersFromServer();
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
			<BootstrapTable data={ this.props.data } striped hover condensed>
				<TableHeaderColumn dataField='name' isKey>Player Name</TableHeaderColumn>
				<TableHeaderColumn dataField='g'>Games</TableHeaderColumn>
				<TableHeaderColumn dataField='fg'>Field Goals</TableHeaderColumn>
			</BootstrapTable>
		);
	}

}

function mapStateToProps(state) {
	return { content: state.auth.content };
}

export default connect(mapStateToProps, actions)(Dashboard);