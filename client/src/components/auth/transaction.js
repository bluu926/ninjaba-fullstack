import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class Transaction extends Component {
	constructor(props) {
		super(props);
		this.props.loadTransactionsFromServer();

		this.options = {
			defaultSortName: 'createdAt',  // default sort column name
			defaultSortOrder: 'desc',  // default sort order

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
			prePage: 'Prev', // Previous page button text
			nextPage: 'Next', // Next page button text
			firstPage: 'First', // First page button text
			lastPage: 'Last', // Last page button text
			paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
			paginationPosition: 'bottom'  // default is bottom, top and both is all available
		};
	}


	render() {
		return (
			<div>
				<div>Transactions!</div>
				<BootstrapTable ref='table' data={ this.props.transaction } pagination={ true } options={ this.options } striped hover condensed>
					<TableHeaderColumn dataField="_id" isKey hidden>Id</TableHeaderColumn>
					<TableHeaderColumn dataField='firstName' dataSort={ true }>Owner</TableHeaderColumn>
					<TableHeaderColumn dataField='transactionType' dataSort={ true }>Action</TableHeaderColumn>
					<TableHeaderColumn dataField='playerName' dataSort={ true }>Player</TableHeaderColumn>
					<TableHeaderColumn dataField='createdAt' dataSort={ true }>Time</TableHeaderColumn>
				</BootstrapTable>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return { 
		content: state.auth.transaction,
		errorMessage: state.auth.error
	};
}

export default connect(mapStateToProps, actions)(Transaction);