import { ScullyConfig } from '@scullyio/scully';

/** this loads the default render plugin, remove when switching to something else. */
import '@scullyio/scully-plugin-puppeteer';
import './.scully/plugins/plugin';

export const config: ScullyConfig = {
	projectRoot: './src',
	projectName: 'dartegnians-portfolio',
	puppeteerLaunchOptions: {
	  args: ['--no-sandbox'],
	},
	outDir: './dist/static',
	routes: {},
};