import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const allTeams = {
  'Warriors': 'Warriors',
  'OKC': 'OKC'
};

function enumFormatter(cell, row, enumObject) {
	return enumObject[cell];
}

class Dashboard extends Component {

	constructor(props) {
		super(props);
		//this.props.protectedTest();
		this.props.loadPlayersFromServer();

		this.options = {
			defaultSortName: 'Name',  // default sort column name
			defaultSortOrder: 'asc'  // default sort order
		};
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
				<TableHeaderColumn dataField='Name' dataSort={ true } filter={ { type: 'TextFilter', delay: 500 } } isKey>Player Name</TableHeaderColumn>
				<TableHeaderColumn dataField='Team' dataSort={ true } filterFormatted dataFormat={ enumFormatter } formatExtraData={ allTeams }
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