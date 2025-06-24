import Command from '../domain/Command';

export default class HelloWorld extends Command {
	name = 'hello_world';

	run() {
		console.log('hello world runned');
	}
}
