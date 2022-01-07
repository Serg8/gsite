import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({data}) => {
  const { nodes } = data.allMarkdownRemark;
  return (
  <Layout>
    <Seo lang="ru" title="Home" />
    <h1>Nature pictures</h1>

    {/*<p>*/}
    {/*  <Link to="/page-2/">Go to page 2</Link> <br />*/}
    {/*  <Link to="/using-typescript/">Go to "Using TypeScript"</Link> <br />*/}
    {/*  <Link to="/using-ssr">Go to "Using SSR"</Link> <br />*/}
    {/*  <Link to="/using-dsg">Go to "Using DSG"</Link>*/}
    {/*</p>*/}
    <div className="cards">
      {nodes.map(post => {
        const {category, title, url, image} = post.frontmatter;
        const img = getImage(image);
        return (
          <section key={post.id} className="card">
            <GatsbyImage alt={title} image={img} />
            <Link to={`/${category}/${url}`} >{title}</Link>
          </section>
        )
      })}
    </div>
  </Layout>
)}

export default IndexPage

export const query = graphql`
  query MainPage {
    allMarkdownRemark {
      nodes {
        html
        frontmatter {
          category
          title
          url
          image {
            childImageSharp {
                gatsbyImageData(placeholder: BLURRED, formats: [AUTO, AVIF])
              }
            }
        }
        id
      }
    }
  }
`;
