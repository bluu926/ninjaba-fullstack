//CommentBox.js
import React, { Component } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import DATA from '../data';
import style from './style';
import * as actions from '../../actions';

class CommentBox extends Component {
	constructor(props) {
		super(props);
		this.state = { data: [] };
		this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
		}

		handleCommentSubmit(comment) {
		//add POST request
		}

		componentDidMount() {
			this.state.loadCommentsFromServer();
			setInterval(this.loadCommentsFromServer, this.props.pollInterval);
		}				

	render() {
		return (
			<div style={ style.commentBox }>
			<h2>Comments:</h2>
			<CommentList data={ this.state.data }/>
			<CommentForm onCommentSubmit={ this.handleCommentSubmit }/>
			</div>
		)
	}
}
export default CommentBox;