import Singleton from '../Singleton';

export class CacheService extends Singleton {
	private cache: Map<string, any> = new Map();

	protected constructor() {
		super();
	}

	set(key: string, value: any) {
		this.cache.set(key, value);
	}

	get(key: string) {
		return this.cache.get(key);
	}
}
