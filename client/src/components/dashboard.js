import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import cookie from 'react-cookie';
import $ from 'jquery';

const token = cookie.load('token');

const allOwners = {
  '--free agent--': '--FA--',
  'Acgreen831': 'Alan',
  'bluu': 'Ben',
  'dfung': 'Danny',
  'PG13': 'Eric',
  'Frank167': 'Frank',
  'hliang': 'Hugo',
  'hobo': 'Joe',
  'Munch!!!': 'Peter',
  'Mad': 'Sam',
  'Magnificent614': 'Ricky',
  'Betterthandreamteam': 'Wayne'
}

const allTeams = {
  'ATL': 'ATL',
  'BOS': 'BOS',
  'BRK': 'BRK',
  'CHI': 'CHI',
  'CHO': 'CHO',
  'CLE': 'CLE',
  'DAL': 'DAL',
  'DEN': 'DEN',
  'DET': 'DET',
  'GSW': 'GSW',
  'HOU': 'HOU',
  'IND': 'IND',
  'LAC': 'LAC',
  'LAL': 'LAL',
  'MEM': 'MEM',
  'MIA': 'MIA',
  'MIL': 'MIL',
  'MIN': 'MIN',
  'NOP': 'NOP',
  'NYK': 'NYK',
  'OKC': 'OKC',
  'ORL': 'ORL',
  'POR': 'POR',
  'PHI': 'PHI',
  'PHO': 'PHO',
  'TOR': 'TOR',
  'TOT': 'TOT',
  'SAC': 'SAC',
  'SAS': 'SAS',
  'UTA': 'UTA',
  'WAS': 'WAS'  
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
	var userInfo = JSON.parse(localStorage.getItem('user'));
	var username = userInfo['username'];


	if(row['owner'] == '--free agent--') {
		$('#add-player-btn').show();
		$('#drop-player-btn').hide();
	} else if (row['owner'] == username) {
		$('#add-player-btn').hide();
		$('#drop-player-btn').show();
	} else {
		$('#add-player-btn').hide();
		$('#drop-player-btn').hide();
	}

//	for(var prop in row){
//		rowStr+=prop+": '"+row[prop]+"' ";
//	}
//	alert("is selected: " + isSelected + ", " + rowStr);
}

class Dashboard extends Component {

	constructor(props) {
		super(props);
		//this.props.protectedTest();
		this.props.loadPlayersFromServer();
		//this.props.loadPlayersFromServer();
		this.userInfo = JSON.parse(localStorage.getItem('user'));

		this.displayTableByTotal = true;

		this.options = {
			defaultSortName: 'name',  // default sort column name
			defaultSortOrder: 'asc',  // default sort order

			sizePerPageList: [ {
				text: '10', value: 10
			}, {
				text: '25', value: 25
			}, {
				text: '100', value: 100
			}, {
				text: 'All', value: 10000
			} ], // you can change the dropdown list for size per page
			sizePerPage: 25,  // which size per page you want to locate as default
			pageStartIndex: 1, // where to start counting the pages
			paginationSize: 3,  // the pagination bar size.
			prePage: '<', // Previous page button text
			nextPage: '>', // Next page button text
			firstPage: '<<', // First page button text
			lastPage: '>>', // Last page button text
			paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
			paginationPosition: 'bottom'  // default is bottom, top and both is all available
		};

	}

	handleSaveBtnClick = () => {
		this.props.message = '';

		const playerId = this.refs.table.state.selectedRowKeys;
		const username = this.userInfo['username'];

		if (!playerId || !username) {
			return;
		}

		this.props.addPlayer(playerId, username);

		$("html, body").animate({ scrollTop: 0 }, "slow");

		setTimeout(() => this.props.loadPlayersFromServer(), 500);

		$('#add-player-btn').hide();
		$('#drop-player-btn').hide();
	}

	handleDropBtnClick = () => {
		this.props.message = '';

		const playerId = this.refs.table.state.selectedRowKeys;
		const username = this.userInfo['username'];

		if (!playerId || !username) {
			return;
		}

		this.props.dropPlayer(playerId, username);

		$("html, body").animate({ scrollTop: 0 }, "slow");

		setTimeout(() => this.props.loadPlayersFromServer(), 500);

		$('#add-player-btn').hide();
		$('#drop-player-btn').hide();
	}

	renderContent() {
		if(this.props.content) {
			return (
				<p>{this.props.content}</p>
			);
		}
	}

	renderMessage() {
		if(this.props.message) {
	      return (
	        <div className='success'>
	          <span><strong> {this.props.message} </strong></span>
	        </div>
	  	  );			
		}
	}

	renderAlert() {
	  	if(this.props.errorMessage) {
	      return (
	        <div className='error'>
	          <span><strong>Error!</strong> {this.props.errorMessage}</span>
	        </div>
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
				{this.props.displayTableByTotal}
				{this.renderAlert()}
				{this.renderMessage()}
				<BootstrapTable ref='table' data={ this.props.content } pagination={ true } options={ this.options } selectRow={ selectRowProp } striped hover condensed>
					<TableHeaderColumn dataField="_id" isKey hidden>Id</TableHeaderColumn>
					<TableHeaderColumn dataField='name' width='160' dataSort={ true } filter={ { type: 'TextFilter', delay: 500 } }>Player</TableHeaderColumn>
					<TableHeaderColumn dataField='team' width='60' dataSort={ true } filterFormatted dataFormat={ enumFormatter } formatExtraData={ allTeams }
						filter={ { type: 'SelectFilter', options: allTeams } }>Team</TableHeaderColumn>
					<TableHeaderColumn dataField='g' width='40' dataSort={ true }>Gm</TableHeaderColumn>
					<TableHeaderColumn dataField='fg' width='40' dataSort={ true } hidden={ this.props.displayTableByTotal }>FG</TableHeaderColumn>
					<TableHeaderColumn dataField='ft' width='40' dataSort={ true } hidden={ this.props.displayTableByTotal }>FT</TableHeaderColumn>
					<TableHeaderColumn dataField='reb' width='40' dataSort={ true }>Reb</TableHeaderColumn>
					<TableHeaderColumn dataField='ast' width='40' dataSort={ true }>Ast</TableHeaderColumn>
					<TableHeaderColumn dataField='stl' width='40' dataSort={ true }>Stl</TableHeaderColumn>
					<TableHeaderColumn dataField='blk' width='40' dataSort={ true }>Blk</TableHeaderColumn>
					<TableHeaderColumn dataField='to' width='40' dataSort={ true }>TO</TableHeaderColumn>
					<TableHeaderColumn dataField='pts' width='50' dataSort={ true }>Pts</TableHeaderColumn>
					<TableHeaderColumn dataField='owner' width='90' dataSort={ true } filterFormatted dataFormat={ enumFormatter } formatExtraData={ allOwners }
						filter={ { type: 'SelectFilter', options: allOwners, defaultValue: '--free agent--' } }>Owner</TableHeaderColumn>
				</BootstrapTable>
				<button id="add-player-btn" type="submit" onClick={ this.handleSaveBtnClick } className='btn btn-primary'>Add Player</button>
				<button id="drop-player-btn" type="submit" onClick={ this.handleDropBtnClick } className='btn btn-danger'>Drop Player</button>
			</div>
		);

		setTimeout(() => this.refs.table.reset(), 1000);
	}

}

function mapStateToProps(state) {
	if (state.auth.user) {
		localStorage.setItem('user', JSON.stringify(state.auth.user));	
	}

	return { 
		content: state.auth.content,
		errorMessage: state.auth.error,
		message: state.auth.message
		//user: state.auth.user
	};
}

export default connect(mapStateToProps, actions)(Dashboard);