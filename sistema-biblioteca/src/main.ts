import { Biblioteca } from './domain/biblioteca';
import { seedBiblioteca } from './domain/data';
import { Usuario } from './domain/usuario';
import { numeroAleatorio } from './utils';

const main = function () {
	const biblioteca = new Biblioteca({ silent: false });
	seedBiblioteca(biblioteca);

	// Registro usuario
	let user_name = 'Antonio';
	let temp_user = new Usuario(user_name);
	biblioteca.registrarUsuario(temp_user);

	const rand_books = ((lista = [...biblioteca.getTodosLosLibros()]) => {
		return Array.from({ length: 3 }, () => {
			const rand = numeroAleatorio(lista.length - 1);
			return lista[rand];
		});
	})();

	for (const book of rand_books)
		biblioteca.prestarLibroAUsuario(user_name, book.ISBN);

	const temp = biblioteca.getUsuarioRegistrado(user_name);
	console.log(temp!.getLibrosEnInventario());

	// Busqueda difusa en libros
	// const temp = biblioteca.buscarLibroPorTituloFuzzy("prag")

	// Busqueda por titulo en libros
	// const book_title = 'the_pragmatic_programmer';
	// const temp = biblioteca.buscarLibroPorTitulo(book_title);

	// Busqueda por autor
	// const autor_name = 'Kyle Simpson';
	// const temp = biblioteca.buscarLibroPorAutor(autor_name);
};

main();
