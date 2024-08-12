import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';

export default defineConfig({
  plugins: [pluginReact(), pluginSass()],
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
