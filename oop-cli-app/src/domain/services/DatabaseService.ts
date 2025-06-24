import Singleton from '../Singleton';
import { Database } from 'bun:sqlite';

export class DatabaseService extends Singleton {
	private _db = new Database(':memory:');

	protected constructor() {
		super();
		this.connect();
	}

	private connect() {
		console.log(`Connecting to in-memory sqlite...`);
	}

	get instance() {
		return this._db;
	}
}
