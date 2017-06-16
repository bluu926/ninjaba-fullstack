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
			<BootstrapTable data={ this.props.content } striped hover condensed>
				<TableHeaderColumn dataField='Name' isKey>Player Name</TableHeaderColumn>
				<TableHeaderColumn dataField='G'>Games</TableHeaderColumn>
				<TableHeaderColumn dataField='FG'>Field Goals</TableHeaderColumn>
				<TableHeaderColumn dataField='Owner'>Owner</TableHeaderColumn>
			</BootstrapTable>
		);
	}

}

function mapStateToProps(state) {
	return { content: state.auth.content };
}

export default connect(mapStateToProps, actions)(Dashboard);