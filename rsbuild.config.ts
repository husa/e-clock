import { defineConfig } from '@rsbuild/core';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';

export default defineConfig({
  plugins: [pluginSass(), pluginTypeCheck()],
  tools: {
    cssLoader: {
      url: false,
    },
    htmlPlugin: {
      template: 'src/index.html',
      title: 'New Tab',
    },
  },
  output: {
    copy: [
      { from: 'src/manifest.json' },
      { from: 'src/_locales', to: '_locales' },
      { from: 'src/assets', to: 'assets' },
    ],
  },
});
