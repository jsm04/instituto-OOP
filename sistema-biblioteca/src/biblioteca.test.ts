import { describe, expect, test, beforeEach } from 'bun:test';
import { Biblioteca } from './biblioteca.class';
import { Usuario } from './usuario.class';
import { Libro } from './libro.class';

describe('Biblioteca', () => {
	let biblioteca: Biblioteca;
	let usuario: Usuario;
	let libro: Libro;

	beforeEach(() => {
		biblioteca = new Biblioteca({ silent: true });
		usuario = new Usuario('Antonio');
		libro = new Libro('El Gran Libro', 'Autor Desconocido', 123456, true);
		biblioteca.registrarUsuario(usuario);
		biblioteca.agregarLibro(libro);
	});

	test('Registrar un usuario correctamente', () => {
		const nuevoUsuario = new Usuario('Carlos');
		biblioteca.registrarUsuario(nuevoUsuario);
		const usuarioRegistrado = biblioteca.getUsuarioRegistrado('Carlos');

		expect(usuarioRegistrado).toBeTruthy();
		expect(usuarioRegistrado?.nombre).toBe('carlos');
	});

	test('No registrar usuario duplicado', () => {
		biblioteca.registrarUsuario(usuario); // Usuario ya registrado
		const usuarios = biblioteca.getTodosLosUsuarios();
		expect(usuarios.length).toBe(1); // No debe agregarse un segundo usuario igual
	});

	test('Agregar libro correctamente', () => {
		const nuevoLibro = new Libro('Otro Libro', 'Autor Conocido', 789012, true);
		biblioteca.agregarLibro(nuevoLibro);
		const libros = biblioteca.getTodosLosLibros();
		expect(libros).toHaveLength(2); // Debería haber dos libros ahora
	});

	test('No agregar libro duplicado', () => {
		biblioteca.agregarLibro(libro); // Libro ya registrado
		const libros = biblioteca.getTodosLosUsuarios();
		expect(libros.length).toBe(1); // El libro no debería ser agregado nuevamente
	});

	test('Buscar libro por título', () => {
		const librosEncontrados = biblioteca.buscarLibroPorTitulo('El Gran Libro');
		expect(librosEncontrados).toHaveLength(1);
		expect(librosEncontrados![0].titulo).toBe('el_gran_libro');
	});

	test('Buscar libro por título no encontrado', () => {
		const librosEncontrados =
			biblioteca.buscarLibroPorTitulo('Libro Inexistente');
		expect(librosEncontrados).toHaveLength(0);
	});

	test('Buscar libro por autor', () => {
		const librosPorAutor = biblioteca.buscarLibroPorAutor('Autor Desconocido');
		expect(librosPorAutor).toHaveLength(1);
		expect(librosPorAutor![0].autor).toBe('autor_desconocido');
	});

	test('Prestar libro a usuario', () => {
		biblioteca.prestarLibroAUsuario('Antonio', 123456);
		const librosUsuario = usuario.getLibrosEnInventario();
		expect(librosUsuario).toHaveLength(1);
		expect(librosUsuario[0].titulo).toBe('el_gran_libro');
	});

	test('Prestar libro no disponible', () => {
		libro.disponible = false; // Marcar libro como no disponible
		biblioteca.prestarLibroAUsuario('Antonio', 123456);
		const librosUsuario = usuario.getLibrosEnInventario();
		expect(librosUsuario).toHaveLength(0); // No se debe agregar libro al inventario
	});

	test('Prestar más de 3 libros', () => {
		// Añadir libros al usuario
		const libro2 = new Libro('Libro 2', 'Autor 2', 234567, true);
		const libro3 = new Libro('Libro 3', 'Autor 3', 345678, true);
		const libro4 = new Libro('Libro 4', 'Autor 4', 456789, true);

		usuario.pedirLibroPrestado(libro2);
		usuario.pedirLibroPrestado(libro3);
		usuario.pedirLibroPrestado(libro4);

		const librosUsuario = usuario.getLibrosEnInventario();
		expect(librosUsuario).toHaveLength(3); // El usuario no puede tener más de 3 libros prestados
	});

	test('Prestar libro duplicado', () => {
		biblioteca.prestarLibroAUsuario('Antonio', 123456);
		const librosUsuario = usuario.getLibrosEnInventario();
		expect(librosUsuario).toHaveLength(1); // No debe agregar el mismo libro nuevamente
	});
});
