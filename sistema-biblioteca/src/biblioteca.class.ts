import type { Libro } from './libro.class';
import type { Usuario } from './usuario.class';

export class Biblioteca {
	#librosStorage: Set<Libro> = new Set();
	#usuariosStorage: Set<Usuario> = new Set();

	constructor(private config = { silent: false }) {}

	#normalizarTexto(s: string) {
		return s.toLowerCase().replace(/\s+/g, '_').trim();
	}

	registrarUsuario(usuario: Usuario) {
		const normalizado = usuario;

		normalizado.nombre = this.#normalizarTexto(usuario.nombre);

		if (this.#usuariosStorage.has(normalizado)) {
			console.log('El usuario ya se encuentra registrado.');
			return;
		}

		this.#usuariosStorage.add(normalizado);

		if (this.config.silent) {
			return;
		}

		console.log(
			`Se registro el usuario ${usuario.nombre} con exito. Id -> ${usuario.id}`
		);
	}

	agregarLibro(libro: Libro) {
		const normalizado = libro;

		normalizado.autor = this.#normalizarTexto(libro.autor);
		normalizado.titulo = this.#normalizarTexto(libro.titulo);

		if (this.#librosStorage.has(normalizado)) {
			console.log('El libro ya se encuentra registrado.');
			return;
		}

		this.#librosStorage.add(normalizado);

		if (this.config.silent) {
			return;
		}

		console.log(
			`Se agrego el libro ${libro.titulo} - ${libro.ISBN} al inventario.`
		);
	}

	buscarLibroPorTitulo(titulo: string) {
		const normalizado = this.#normalizarTexto(titulo);

		console.log('Buscando:', normalizado);

		const result = [...this.#librosStorage].filter((l) => {
			const t = this.#normalizarTexto(l.titulo);
			return t === normalizado;
		});

		if (result.length === 0) {
			console.log('No se encontraron libros con el titulo actual.');
			return [];
		}

		return result;
	}

	buscarLibroPorTituloFuzzy(palabraClave: string): Libro[] {
		const keyword = this.#normalizarTexto(palabraClave);
		return [...this.#librosStorage].filter((libro) =>
			libro.titulo.includes(keyword)
		);
	}

	buscarLibroPorAutor(autor: string) {
		const normalizado = this.#normalizarTexto(autor);

		console.log('Buscando:', normalizado);

		const result = [...this.#librosStorage].filter(
			(l) => l.autor === normalizado
		);

		if (result.length === 0) {
			console.log('No se encontraron libros con el autor actual.');
			return;
		}

		return result;
	}

	buscarLibroPorISBN(ISBN: number) {
		const result = [...this.#librosStorage].find((l) => l.ISBN === ISBN);

		if (!result) {
			console.log('No se encontraron libros con el ISBN actual.');
			return;
		}

		return result;
	}

	getTodosLosLibros() {
		return [...this.#librosStorage];
	}

	getTodosLosUsuarios() {
		return [...this.#usuariosStorage];
	}

	getUsuarioRegistrado(nombre: string) {
		const usuario = [...this.#usuariosStorage].find(
			(u) => u.nombre === this.#normalizarTexto(nombre)
		);

		if (!usuario) {
			console.log('No se encontro usuario con este nombre.');
			return;
		}

		return usuario;
	}

	prestarLibroAUsuario(nombre: string, libro_isbn: number) {
		const usuario = this.getUsuarioRegistrado(nombre);
		if (!usuario) return;

		const libro = this.buscarLibroPorISBN(libro_isbn);
		if (!libro) return;

		usuario.pedirLibroPrestado(libro);
	}
}
