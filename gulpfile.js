const { src, dest } = require('gulp');
const sharpResponsive = require('gulp-sharp-responsive');

const compress = () =>
	src("images/*.{png,jpg}")
		.pipe(
			sharpResponsive({
				formats: [
					// jpeg
					{ width: 256, format: "jpeg", rename: { suffix: "-256" } },
					{ width: 512, format: "jpeg", rename: { suffix: "-512" } },
					{ width: 1024, format: "jpeg", rename: { suffix: "-1024" } },
					// webp
					{ width: 256, format: "webp", rename: { suffix: "-256" } },
					{ width: 512, format: "webp", rename: { suffix: "-512" } },
					{ width: 1024, format: "webp", rename: { suffix: "-1024" } },
					// avif
					{ width: 256, format: "avif", rename: { suffix: "-256" } },
					{ width: 512, format: "avif", rename: { suffix: "-512" } },
					{ width: 1024, format: "avif", rename: { suffix: "-1024" } },
				],
			})
		)
		.pipe(dest("src/assets/img"));

module.exports = {
	compress
};