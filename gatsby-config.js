const config = require('./src/data/config/config');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: config.defaultTitle,
    description: config.defaultDescription,
    author: config.author,
    menuLinks: [
      {
        name: 'Projects',
        link: '/projects',
      },
      {
        name: 'People',
        link: '/people',
      },
      {
        name: 'Diversity',
        link: '/diversity',
      },
      {
        name: 'About',
        link: '/about',
      },
    ],
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-breakpoints',
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: config.themeColor,
        showSpinner: false,
      },
    },
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './static/favicon/favicon-512.png',
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.defaultTitle,
        short_name: 'starter',
        start_url: '/',
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'minimal-ui',
        icon: './static/favicon/favicon-512.png',
      },
    },
    // Reads files from file system. In this case, markdown files
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `project`,
        path: `${__dirname}/src/projects`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `people`,
        path: `${__dirname}/src/data/people`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `sponsors`,
        path: `${__dirname}/src/data/sponsors`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `photos`,
        path: `${__dirname}/src/data/photos`,
      },
    },
    // Transforms Markdown/YAML files to HTML/JSON
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
            },
          },
          {
            resolve: `gatsby-remark-embed-video`,
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, // Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, // Optional: Disable insertion of <style> border: 0
              containerClass: 'embedVideo-container', // Optional: Custom CSS class for iframe container, for multiple classes separate them by space
            },
          },
          `gatsby-remark-responsive-iframe`,
        ],
      },
    },
    'gatsby-plugin-offline',
    // allows reading local JSON data--to be used to query the people.json data as GraphQL
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: `PeopleJson`, // a fixed string
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [`Playfair Display`, `Lato`],
        display: 'swap',
      },
    },
  ],
};
