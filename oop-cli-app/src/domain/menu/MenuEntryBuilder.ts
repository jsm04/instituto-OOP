import Command from '../Command';
import type { MenuEntry } from './MenuManager';

export class MenuEntryBuilder {
	private static key = 0;
	private key: number;
	private description: string;
	private action!: () => Promise<void> | void;

	constructor(description: string) {
		this.key = MenuEntryBuilder.key++;
		this.description = description;
	}

	setAction<T>(action: MenuEntry['action'] | Command) {
		if (action instanceof Command) {
			this.action = action.run.bind(this);
		} else {
			this.action = action;
		}

		return this;
	}

	get(): MenuEntry {
		if (!this.action)
			throw new Error('Action is missing concrete implementation.');
		return {
			key: this.key,
			description: this.description,
			action: this.action,
		};
	}
}
