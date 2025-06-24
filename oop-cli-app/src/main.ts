import Command from './domain/Command';
import { MenuEntryBuilder } from './domain/menu/MenuEntryBuilder';
import CliMenu from './domain/menu/MenuManager';
import { menuEntries } from './domain/menu/const';
import { DatabaseService } from './domain/services/DatabaseService';

main().catch(console.log);

async function main() {
	const { log } = console;
	const [, , command, ...args] = process.argv;

	log('App init...');

	//@ts-ignore
	const db = DatabaseService.getInstance();

	const menu = new CliMenu('Application Menu', menuEntries);

	menu.start();

	const quit = () => {
		console.log('Quitting application...');
		(menu as CliMenu).stop();
	};
}
