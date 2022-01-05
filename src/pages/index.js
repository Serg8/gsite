import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({data}) => {
  const { nodes } = data.allMarkdownRemark;
  return (
  <Layout>
    <Seo title="Home" />
    <h1>Nature pictures</h1>
    <h2>Nature pictures</h2>
    <div>
      <p>paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph </p>
      <p>paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph </p>
    </div>

    {/*<p>*/}
    {/*  <Link to="/page-2/">Go to page 2</Link> <br />*/}
    {/*  <Link to="/using-typescript/">Go to "Using TypeScript"</Link> <br />*/}
    {/*  <Link to="/using-ssr">Go to "Using SSR"</Link> <br />*/}
    {/*  <Link to="/using-dsg">Go to "Using DSG"</Link>*/}
    {/*</p>*/}
    <div className="posts">
      {nodes.map(post => {
        const {category, title, url, image} = post.frontmatter;
        const img = getImage(image);
        return (
          <div key={post.id} className="post">
            <GatsbyImage alt={title} image={img} />
            <Link to={`/${category}/${url}`} >{title}</Link>
          </div>
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
