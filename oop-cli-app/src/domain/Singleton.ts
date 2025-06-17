export default class<T> {
	private static _instance: any | null = null;

	protected constructor() {}

	static getInstance() {
		if (this._instance === null) {
			this._instance = new this();
		}
		return this._instance;
	}
}
