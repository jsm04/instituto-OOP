import HelloWorld from '../../commands/HelloWorld';
import RandomAction from '../../commands/RandomAction';
import { MenuEntryBuilder } from './MenuEntryBuilder';
import type CliMenu from './MenuManager';

export const menuEntries = [
	new MenuEntryBuilder('Hello world').setAction(new HelloWorld().run).get(),
	new MenuEntryBuilder('Random Action').setAction(new RandomAction().run).get(),
];
