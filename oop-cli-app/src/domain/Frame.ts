export default class {
	constructor(private readonly len: number) {}

	line(lines: number = 1) {
		Array.from({ length: lines }).forEach(() =>
			console.log('-'.repeat(this.len))
		);
	}

	space(spaces: number = 1) {
		Array.from({ length: spaces }).forEach(() =>
			console.log('\n')
		);
	}
}
