import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { hideCompleted: false };
	}

	// getTasks() {
	// 	return [
	// 		{ _id: 1, text: 'This is task 1' },
	// 		{ _id: 2, text: 'This is task 2' },
	// 		{ _id: 3, text: 'This is task 3' }
	// 	];
	// }
	toggleHideCompleted() {
		this.setState({
			hideCompleted: !this.state.hideCompleted
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		const text = this.textInput.value.trim();

		// Tasks.insert({ text, createdAt: new Date(), owner: Meteor.userId(), username: Meteor.user().username });
		Meteor.call('tasks.insert', text);

		this.textInput.value = '';
	}

	renderTasks() {
		//return this.getTasks().map(task => <Task key={task._id} task={task} />);
		let filteredTasks = this.props.tasks;

		if (this.state.hideCompleted) {
			filteredTasks = filteredTasks.filter(task => !task.checked);
		}
		return filteredTasks.map(task => {
			const currentUserId = this.props.currentUser && this.props.currentUser._id;
			const showPrivateButton = task.owner === currentUserId;

			return <Task key={task._id} task={task} showPrivateButton={showPrivateButton} />;
		});
	}

	render() {
		return (
			<div className="container">
				<header>
					<h1>
						Todo List ({this.props.incompleteCount})
					</h1>
					<label className="hide-completed">
						<input
							type="checkbox"
							readOnly
							checked={this.state.hideCompleted}
							onClick={this.toggleHideCompleted.bind(this)}
						/>
						Hide Completed Tasks
					</label>

					<AccountsUIWrapper />

					{this.props.currentUser
						? <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
								<input
									type="text"
									ref={ref => (this.textInput = ref)}
									placeholder="Type to add new tasks"
								/>
							</form>
						: ''}
				</header>

				<ul>
					{this.renderTasks()}
				</ul>
			</div>
		);
	}
}

App.propTypes = {
	tasks: PropTypes.array.isRequired,
	incompleteCount: PropTypes.number.isRequired,
	currentUser: PropTypes.object
};

export default createContainer(() => {
	// subscribe tasks from server-side
	Meteor.subscribe('tasks');

	return {
		tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
		incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
		currentUser: Meteor.user()
	};
}, App);
