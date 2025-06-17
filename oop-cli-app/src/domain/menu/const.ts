import HelloWorld from '../../commands/HelloWorld';
import { MenuEntryBuilder } from './MenuEntryBuilder';
import type CliMenu from './MenuManager';

export const menuEntries = [
	new MenuEntryBuilder('Hello world').setAction(new HelloWorld().run).get(),
];
