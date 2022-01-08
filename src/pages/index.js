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
    <div className="cards">
      {nodes.map(card => {
        const {title, url, image} = card.frontmatter;
        const img = getImage(image);
        return (
          <Link to={`/${url}`} key={card.id} className="card" >
            <h3 className="card__title">{title}</h3>
            <GatsbyImage alt={title} image={img} />
          </Link>
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
                gatsbyImageData(placeholder: BLURRED, formats: [AUTO, AVIF], width: 540)
              }
            }
        }
        id
      }
    }
  }
`;
