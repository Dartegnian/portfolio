import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import api from './api/index.js'; // Your Vercel SSR app promise

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const containerApp = express();

// Location of the built browser assets.
const browserDistFolder = join(__dirname, 'dist/dartegnians-portfolio/browser');

// Only serve static assets if the URL appears to request a file (has a dot).
containerApp.use((req, res, next) => {
	if (/\.[^\/]+$/.test(req.path)) {
		// Use static middleware for asset requests.
		return express.static(browserDistFolder, {
			maxAge: '1y',
			index: false,
			// If the file isn’t found, let it return 404 (don’t call next())
			fallthrough: false,
		})(req, res, next);
	}
	next();
});

// Intercept known problematic paths (e.g. Angular’s service worker and Vercel Insights)
containerApp.all(['/ngsw*', '/_vercel/insights*'], (req, res) => {
	res.status(404).send('Not Found');
});

// For all other requests (like "/"), delegate to the SSR app.
api.then(ssrApp => {
	containerApp.use((req, res, next) => {
		ssrApp(req, res, next);
	});
	const port = process.env.PORT || 4000;
	containerApp.listen(port, () =>
		console.log(`Container SSR server running on port ${port}`)
	);
}).catch(err => {
	console.error('Failed to load SSR app:', err);
});
