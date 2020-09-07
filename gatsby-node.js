const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};

// TODO: Add Markdown pages for summary

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
// exports.createPages = async ({ graphql, actions, reporter }) => {
//   const { createPage } = actions;

// Query for markdown nodes to use in creating pages.
// const result = await graphql(
//   `
//     {
//       allSitePage {
//         edges {
//           node {
//             component
//             path
//           }
//         }
//       }
//     }
//   `
// );

// eslint-disable-next-line no-console
// console.log('result', result.data.allSitePage);

// Handle errors
// if (result.errors) {
//   reporter.panicOnBuild(`Error while running GraphQL query.`);
// }

// result.data.sitePage.edges.forEach(edge => {
//   createPage({
//     path: path.resolve(edge.node.path),
//   });
// });
// };
