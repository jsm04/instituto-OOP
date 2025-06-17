import Command from '../domain/Command';
import Singleton from '../domain/Singleton';

export default class HelloWorld extends Command {
	name = 'HelloCommand';

	run() {
		console.log('Hello world');
	}
}
