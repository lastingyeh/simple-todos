// for each database operation we want to perform on the client.
// Methods should be defined in code that is executed on the client and the server
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

// to specify explicitly what the server sends to the client.
// The functions in Meteor that do this are Meteor.publish and Meteor.subscribe.
if (Meteor.isServer) {
	Meteor.publish('tasks', function tasksPublication() {
		return Tasks.find({
			$or: [{ private: { $ne: true } }, { owner: this.userId }]
		});
	});
}

Meteor.methods({
	'tasks.insert'(text) {
		check(text, String);

		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		Tasks.insert({
			text,
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});
	},
	'tasks.remove'(taskId) {
		check(taskId, String);

		const task = Tasks.findOne(taskId);

		if (task.private && task.owner !== Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}
		Tasks.remove(taskId);
	},
	'tasks.setChecked'(taskId, setChecked) {
		check(taskId, String);
		check(setChecked, Boolean);

		const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

		Tasks.update(taskId, { $set: { checked: setChecked } });
	},
	'tasks.setPrivate'(taskId, setToPrivate) {
		check(taskId, String);
		check(setToPrivate, Boolean);

		const task = Tasks.findOne(taskId);

		if (task.owner !== Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		Tasks.update(taskId, { $set: { private: setToPrivate } });
	}
});
