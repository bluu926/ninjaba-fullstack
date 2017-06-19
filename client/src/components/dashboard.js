import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import cookie from 'react-cookie';
import $ from 'jquery';

const token = cookie.load('token');

const allTeams = {
  'Warriors': 'Warriors',
  'OKC': 'OKC'
};

const selectRowProp = {
  mode: 'radio',
  onSelect: onRowSelect,
  clickToSelect: true
};

function enumFormatter(cell, row, enumObject) {
	return enumObject[cell];
}

function onRowSelect(row, isSelected){
	var rowStr = "";

	for(var prop in row){
		rowStr+=prop+": '"+row[prop]+"' ";
	}
	alert("is selected: " + isSelected + ", " + rowStr);
}

class Dashboard extends Component {

	constructor(props) {
		super(props);
		//this.props.protectedTest();
		this.props.loadPlayersFromServer();
		this.userInfo = localStorage.getItem('user');

		alert(Object.keys(this.userInfo));

		this.options = {
			defaultSortName: 'Name',  // default sort column name
			defaultSortOrder: 'asc',  // default sort order

			sizePerPageList: [ {
				text: '1', value: 1
			}, {
				text: '10', value: 10
			}, {
				text: '25', value: 25
			}, {
				text: '100', value: 100
			}, {
				text: 'All', value: 10000
			} ], // you can change the dropdown list for size per page
			sizePerPage: 1,  // which size per page you want to locate as default
			pageStartIndex: 1, // where to start counting the pages
			paginationSize: 3,  // the pagination bar size.
			prePage: 'Prev', // Previous page button text
			nextPage: 'Next', // Next page button text
			firstPage: 'First', // First page button text
			lastPage: 'Last', // Last page button text
			paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
			paginationPosition: 'top'  // default is bottom, top and both is all available
		};
	}

	handleSaveBtnClick = () => {
		alert(Object.keys(this.props.userInfo));

		const playerId = this.refs.table.state.selectedRowKeys;
		alert(playerId);
		const username = this.props.userInfo['username'];
		alert(username);
		this.props.addPlayer(playerId, username);
	}

	handleDropBtnClick = () => {
		alert(this.props.userInfo['username']);

		const selected = this.refs.table.state.selectedRowKeys;
		var rowStr = "";

		alert(selected);
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
			<div>
				<BootstrapTable ref='table' data={ this.props.content } pagination={ true } options={ this.options } selectRow={ selectRowProp } striped hover condensed>
					<TableHeaderColumn dataField="_id" isKey hidden>Id</TableHeaderColumn>
					<TableHeaderColumn dataField='Name' dataSort={ true } filter={ { type: 'TextFilter', delay: 500 } }>Player Name</TableHeaderColumn>
					<TableHeaderColumn dataField='Team' dataSort={ true } filterFormatted dataFormat={ enumFormatter } formatExtraData={ allTeams }
						filter={ { type: 'SelectFilter', options: allTeams } }>Team Name</TableHeaderColumn>
					<TableHeaderColumn dataField='G'>Games</TableHeaderColumn>
					<TableHeaderColumn dataField='FG'>Field Goals</TableHeaderColumn>
					<TableHeaderColumn dataField='Owner'>Owner</TableHeaderColumn>
				</BootstrapTable>
				<button onClick={ this.handleSaveBtnClick } className='btn btn-primary'>Add Player</button>
				<button onClick={ this.handleDropBtnClick } className='btn btn-danger'>Drop Player</button>
			</div>
		);
	}

}

function mapStateToProps(state) {
	localStorage.setItem('user', state.auth.user);
	alert(Object.keys(localStorage.getItem('user')));
	return { 
		content: state.auth.content
		//user: state.auth.user
	};
}

export default connect(mapStateToProps, actions)(Dashboard);