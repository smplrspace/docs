// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Smplrspace docs',
  tagline: 'Learn how to embed our viewer with smplr.js and access the API reference',
  url: 'https://docs.smplrspace.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'smplrspace',
  projectName: 'docs',

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/smplrspace/docs/edit/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Docs',
        logo: {
          alt: 'Smplrspace logo',
          src: 'img/logo.svg',
          srcDark: 'img/logo-white.svg'
        },
        items: [
          {
            href: 'https://www.smplrspace.com',
            label: 'Homepage',
            position: 'right',
          },
          {
            href: 'https://examples.smplrspace.com',
            label: 'Examples',
            position: 'right',
          },
          {
            href: 'https://github.com/smplrspace/docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        links: [],
        copyright: `© 2019-${new Date().getFullYear()} Smplrspace Pte Ltd. All rights reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

    plugins: [
      [
        require.resolve('@easyops-cn/docusaurus-search-local'),
        {
          hashed: true,
          indexDocs: true,
          indexBlog: false,
          indexPages: false,
          docsRouteBasePath: '/',
          highlightSearchTermsOnTargetPage: true,
        },
      ],
    ],
};

module.exports = config;
