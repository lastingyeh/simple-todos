import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
	describe('Tasks', () => {
		describe('methods', () => {
			const userId = Random.id();
			let taskId;

			beforeEach(() => {
				Tasks.remove();
				taskId = Tasks.insert({
					text: 'test task',
					createdAt: new Date(),
					owner: userId,
					username: 'tmeasday'
				});
			});
			it('can delete owned task', () => {
				const deleteTask = Meteor.isServer.method_handlers['tasks.remove'];
				const invocation = { userId };

				deleteTask.apply(invocation, [taskId]);

				assert.equal(Tasks.find().count(), 0);
			});
		});
	});
}
