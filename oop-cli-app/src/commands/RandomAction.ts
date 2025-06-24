import Command from '../domain/Command';

export default class RandomAction extends Command {
	name = 'random_action';

	run() {
		console.log('random action runned');
	}
}
