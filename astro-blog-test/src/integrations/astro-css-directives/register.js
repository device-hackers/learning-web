export default () => ({
  name: 'client:unless-supports',
  hooks: {
    'astro:config:setup': ({ addClientDirective }) => {
      addClientDirective({
        name: 'unless-supports',
        entrypoint: './src/integrations/astro-css-directives/client-unless-supports.js',
      });
    },
  },
});
