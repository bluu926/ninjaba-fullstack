import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const allTeams = {
  0: 'Warriors',
  1: 'OKC'
};

function enumFormatter(cell, row, enumObject) {
	return enumObject[cell];
}

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
				<TableHeaderColumn dataField='Team' filterFormatted dataFormat={ enumFormatter } formatExtraData={ allTeams }
					filter={ { type: 'SelectFilter', options: allTeams } }>Team Name</TableHeaderColumn>
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