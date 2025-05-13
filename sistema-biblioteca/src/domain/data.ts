import type { Biblioteca } from './biblioteca';
import { Libro } from './libro';
import {LibroDigital} from './libro-digital';
import { Usuario } from './usuario';

const librosStore: Libro[] = [
	new Libro('1984', 'George Orwell', 978045152935, true),
	new Libro('Brave New World', 'Aldous Huxley', 9780060850524, false),
	new Libro('Fahrenheit 451', 'Ray Bradbury', 9781451673319, true),
	new Libro('Moby-Dick', 'Herman Melville', 9780142437247, true),
	new Libro('The Hobbit', 'J.R.R. Tolkien', 9780547928227, false),
	new Libro('Dune', 'Frank Herbert', 9780441172719, true),
	new Libro('Dracula', 'Bram Stoker', 9780486411095, true),
	new Libro('Frankenstein', 'Mary Shelley', 9780486282114, true),
	new Libro('The Odyssey', 'Homer', 9780140268867, false),
	new Libro('Hamlet', 'William Shakespeare', 9780451526922, true),
];

const librosDigitalesStore: LibroDigital[] = [
	new LibroDigital('Clean Code', 'Robert C. Martin', 9780132350884, true, 5),
	new LibroDigital(
		'The Pragmatic Programmer',
		'Andy Hunt',
		9780201616224,
		true,
		3
	),
	new LibroDigital(
		"You Don't Know JS",
		'Kyle Simpson',
		9781491904244,
		false,
		2
	),
	new LibroDigital(
		'Eloquent JavaScript',
		'Marijn Haverbeke',
		9781593279509,
		true,
		4
	),
	new LibroDigital(
		'JavaScript: The Good Parts',
		'Douglas Crockford',
		9780596517748,
		false,
		1
	),
	new LibroDigital('Design Patterns', 'Erich Gamma', 9780201633610, true, 6),
	new LibroDigital('Refactoring', 'Martin Fowler', 9780201485677, true, 4),
	new LibroDigital(
		'Introduction to Algorithms',
		'CLRS',
		9780262033848,
		false,
		8
	),
	new LibroDigital(
		'Artificial Intelligence',
		'Stuart Russell',
		9780136042594,
		true,
		7
	),
	new LibroDigital(
		'Python Crash Course',
		'Eric Matthes',
		9781593279288,
		true,
		2
	),
];

const usuariosStore: Usuario[] = [
	new Usuario('Ana'),
	new Usuario('Luis'),
	new Usuario('Marta'),
	new Usuario('Carlos'),
	new Usuario('Lucía'),
	new Usuario('Jorge'),
	new Usuario('Carmen'),
	new Usuario('Diego'),
	new Usuario('Sofía'),
	new Usuario('Pedro'),
];

export const seedBiblioteca = function (biblioteca: Biblioteca) {
	librosStore.forEach((l) => biblioteca.agregarLibro(l));
	librosDigitalesStore.forEach((l) => biblioteca.agregarLibro(l));
	usuariosStore.forEach((u) => biblioteca.registrarUsuario(u));
};
