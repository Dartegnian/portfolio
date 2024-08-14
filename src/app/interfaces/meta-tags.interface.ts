export default interface MetaTags {
	description: string;
	keywords: string;
	title: string;
	image: string;
	imageAlt: string;
	favicons?: { type: string; sizes: string; href: string }[];
}
