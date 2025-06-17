import fs from 'fs';
import path from 'path';
import Command from '../domain/Command';

export async function readAndBuildCommandsRecord(default_path = 'commands') {
	const dir = path.join(__dirname, default_path);

	const commands: Record<string, Command> = {};

	const files = await fs.promises.readdir(dir);

	for (const file of files) {
		const command = (await import(path.join(dir, file))).default;

		if (command.getInstance()) {
			const instance = command.getInstance();
			commands[instance.name] = instance;
		}
	}

	return commands;
}
