export const numeroAleatorio = (max: number, min: number = 0): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
