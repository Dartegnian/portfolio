declare module 'colorthief' {
	export type RGBColor = [number, number, number];
	export default class ColorThief {
		getColor: (img: HTMLImageElement | null, quality: number) => RGBColor;
		getPalette: (img: HTMLImageElement | null, colorCount: number, quality: number) => RGBColor[];
	}
}