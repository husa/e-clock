import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/preset-scss',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  url: false,
                },
              },
              'sass-loader',
            ],
          },
        ],
      },
    },
  ],
  staticDirs: ['../src'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
};
export default config;
