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


