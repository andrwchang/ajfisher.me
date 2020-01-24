module.exports = {
  siteMetadata: {
    defaultTitle: `ajfisher`,
    description: `The blog and portfolio of AJFisher - technologist`,
    author: `@ajfisher`,
    siteURL: 'https://ajfisher.me'
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `image`,
        path: `${__dirname}/src/img`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
        ignore: [`**/\.*`],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-transformer-remark-tags`,
          `gatsby-remark-reading-time`,
          {
            resolve: `gatsby-remark-relative-images`
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1000,
              backgroundColor: `none`,
              quality: 90,
              withWebp: { quality: 90 },
              showCaptions: true,
              disableBgImage: true
            },
          },
          {
            resolve: `gatsby-remark-responsive-image`,
            options: {
              maxWidth: 1000,
              backgroundColor: `none`,
              quality: 90,
              withWebp: { quality: 90 },
              showCaptions: true,
              disableBgImage: true
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ajfisher website`,
        short_name: `ajfisher`,
        start_url: `/`,
        background_color: `#FF5E9A`,
        theme_color: `#FF5E9A`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-robots-txt`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
