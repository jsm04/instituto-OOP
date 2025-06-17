import Command from './domain/Command';
import { MenuEntryBuilder } from './domain/menu/MenuEntryBuilder';
import CliMenu from './domain/menu/MenuManager';
import { menuEntries } from './domain/menu/const';

main().catch(console.log);

async function main() {
	const [, , command, ...args] = process.argv;

	const menu = new CliMenu('Application Menu', menuEntries);

	menu.start();

	const quit = () => {
		console.log('Quitting application...');
		(menu as CliMenu).stop();
	};
}
