const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  // const { createPage } = actions
  // createPage({
  //   path: "/using-dsg",
  //   component: require.resolve("./src/templates/using-dsg.js"),
  //   context: {},
  //   defer: true,
  // })

  const { data } = await graphql(`
      query Photos {
        allMarkdownRemark {
          nodes {
            id
            frontmatter {
              category
              url
            }
          }
        }
      }
  `)

  data.allMarkdownRemark.nodes.forEach(node => {
    const { url } = node.frontmatter;
    let id = node.id;
    actions.createPage({
      path: `/${url}`,
      component: path.resolve('./src/templates/nodeCard.js'),
      context: { id },
    });
  });
}
