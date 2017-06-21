import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.props.loadTransactionsFromServer();

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
				<div>SOME BANNER AND STUFF WILL GO HERE!</div>
				<BootstrapTable ref='table' data={ this.props.content } pagination={ true } options={ this.options } striped hover condensed>
					<TableHeaderColumn dataField="_id" isKey hidden>Id</TableHeaderColumn>
					<TableHeaderColumn dataField='firstName' dataSort={ true }>FG</TableHeaderColumn>
				</BootstrapTable>
				<button type="submit" onClick={ this.handleSaveBtnClick } className='btn btn-primary'>Add Player</button>
				<button type="submit" onClick={ this.handleDropBtnClick } className='btn btn-danger'>Drop Player</button>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return { 
		content: state.auth.content,
		errorMessage: state.auth.error
	};
}

export default connect(mapStateToProps, actions)(HomePage);