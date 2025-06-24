export default abstract class Singleton {
	private static instances: Map<Function, any> = new Map();

	protected constructor() {}

	static getInstance<T extends Singleton>(this: new () => T): T {
		if (!Singleton.instances.has(this)) {
			Singleton.instances.set(this, new this());
		}
		return Singleton.instances.get(this) as T;
	}
}
