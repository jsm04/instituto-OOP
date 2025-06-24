import Command from '../Command';
import type Frame from '../Frame';
import FrameManager from '../Frame';

export interface MenuEntry {
	key: number;
	description: string;
	action: () => Promise<void> | void;
}

export default class {
	private header: string;
	private entries: MenuEntry[] = [];
	private running: boolean = false;
	private frame: Frame;

	constructor(header: string, entries: MenuEntry[]) {
		this.header = `--- ${header} ---`;
		this.entries = entries;
		this.frame = new FrameManager(this.header.length);
	}

	private display(): void {
		this.frame.space();
		this.frame.line();

		console.log(this.header);

		this.frame.line();
		this.frame.space();

		this.entries.forEach((item) => {
			console.log(`${item.key}. ${item.description}`);
		});

		this.frame.space();
		this.frame.line(2);
		this.frame.space();
	}

	private async getResponse(): Promise<MenuEntry> {
		let chosenItem: MenuEntry | undefined;
		while (!chosenItem) {
			this.display();
			const answer = await prompt('Enter your choice: ');
			chosenItem = this.entries.find((item) => item.key === Number(answer));

			if (!chosenItem) {
				console.log('Invalid choice. Please try again.');
			}
		}
		return chosenItem;
	}

	public async start(): Promise<void> {
		this.running = true;
		while (this.running) {
			try {
				const choice = await this.getResponse();
				console.log(`\nExecuting: ${choice.description}`);
				await Promise.resolve(choice.action());
			} catch (error) {
				console.error('An error occurred:', error);
			}
		}
		console.log('Exiting menu. Goodbye!');
	}

	public stop(): void {
		this.running = false;
	}
}
