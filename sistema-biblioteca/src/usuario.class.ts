import type { Libro } from './libro.class';

export class Usuario {
	#inventarioUsuario: Libro[] = [];
	nombre: string;
	static id_counter = 0;
	id: number;

	constructor(nombre: string, id: number = Usuario.id_counter++) {
		this.nombre = nombre;
		this.id = id;
	}

	pedirLibroPrestado(libro: Libro) {
		if (!libro.disponible) {
			console.log('El libro no se encuentra disponible.');
			return;
		}

		if (this.#inventarioUsuario.length >= 3) {
			console.log('El usuario exede el numero de libros prestados. Maximo 3.');
			return;
		}

		if (this.#inventarioUsuario.some((l) => l.ISBN === libro.ISBN)) {
			console.log(
				'El usuario ya posee un libro de este tipo en su inventario. Solo una copia por persona.'
			);
			return;
		}

		this.#inventarioUsuario.push(libro);

		console.log(
			`Se agrego el libro ${libro.titulo} - ${libro.autor} - ${libro.ISBN} al inventario del usuario.`
		);
	}

	devolverLibro(libro: Libro) {
		if (!this.#inventarioUsuario.includes(libro)) {
			console.log('El libro no se encuentra en el inventario del usuario.');
			return;
		}

		this.#inventarioUsuario = this.#inventarioUsuario.filter(
			(l) => libro.ISBN !== l.ISBN
		);

		console.log(
			`Se removio el libro ${libro.titulo} - ${libro.autor} - ${libro.ISBN} del inventario del usuario`
		);
	}

	getLibrosEnInventario() {
		return [...this.#inventarioUsuario];
	}
}
