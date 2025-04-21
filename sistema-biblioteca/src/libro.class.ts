export class Libro {
	titulo: string;
	autor: string;
	ISBN: number;
	disponible: boolean;
	static id_counter = 0;
	id = 0;

	constructor(
		titulo: string,
		autor: string,
		ISBN: number,
		disponible: boolean
	) {
		this.titulo = titulo;
		this.autor = autor;
		this.ISBN = ISBN;
		this.disponible = disponible;
		this.id = Libro.id_counter++;
	}
}

export class LibroDigital extends Libro {
	mb: number = 0;

	constructor(
		titulo: string,
		autor: string,
		ISBN: number,
		disponible: boolean,
		mb: number
	) {
		super(titulo, autor, ISBN, disponible);
		this.mb = mb;
	}

	descargar() {
		console.log(
			`Descargando libro ${this.titulo} - ${this.autor} - ${this.ISBN}`
		);
	}
}
