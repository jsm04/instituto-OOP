import {Libro} from './libro';


export class LibroDigital extends Libro {
	mb: number=0;

	constructor(
		titulo: string,
		autor: string,
		ISBN: number,
		disponible: boolean,
		mb: number
	) {
		super(titulo, autor, ISBN, disponible);
		this.mb=mb;
	}

	descargar() {
		console.log(
			`Descargando libro ${this.titulo} - ${this.autor} - ${this.ISBN}`
		);
	}
}
