import type { StorybookConfig } from '@storybook/react/vite';
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/react',
    options: {}
  },
  docs: {
    autodocs: true
  }
};
export default config;
