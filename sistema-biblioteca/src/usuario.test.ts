import { describe, expect, test, beforeEach } from 'bun:test';
import { Usuario } from './usuario.class';
import { Libro } from './libro.class';

describe('Usuario', () => {
	let usuario: Usuario;
	let libros: Libro[];

	beforeEach(() => {
		usuario = new Usuario('Antonio');
		libros = [
			new Libro('Libro A', 'Autor A', 1, true),
			new Libro('Libro B', 'Autor B', 2, true),
			new Libro('Libro C', 'Autor C', 3, true),
			new Libro('Libro D', 'Autor D', 4, true),
		];
	});

	test('puede pedir un libro disponible', () => {
		usuario.pedirLibroPrestado(libros[0]);
		expect(usuario.getLibrosEnInventario()).toContain(libros[0]);
	});

	test('no puede pedir un libro si ya tiene 3', () => {
		usuario.pedirLibroPrestado(libros[0]);
		usuario.pedirLibroPrestado(libros[1]);
		usuario.pedirLibroPrestado(libros[2]);
		usuario.pedirLibroPrestado(libros[3]);

		expect(usuario.getLibrosEnInventario().length).toBe(3);
		expect(usuario.getLibrosEnInventario()).not.toContain(libros[3]);
	});

	test('no puede pedir dos veces el mismo libro', () => {
		usuario.pedirLibroPrestado(libros[0]);
		usuario.pedirLibroPrestado(libros[0]);

		expect(usuario.getLibrosEnInventario().length).toBe(1);
	});

	test('puede devolver un libro que tiene', () => {
		usuario.pedirLibroPrestado(libros[0]);
		usuario.devolverLibro(libros[0]);

		expect(usuario.getLibrosEnInventario()).not.toContain(libros[0]);
	});

	test('no puede devolver un libro que no tiene', () => {
		usuario.devolverLibro(libros[1]);
		expect(usuario.getLibrosEnInventario().length).toBe(0);
	});

	test('ignora préstamo si el libro no está disponible', () => {
		const libroNoDisponible = new Libro('No Disponible', 'Autor', 99, false);
		usuario.pedirLibroPrestado(libroNoDisponible);

		expect(usuario.getLibrosEnInventario()).not.toContain(libroNoDisponible);
	});
});
