import * as React from "react"
import {graphql} from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

const Photo = ({data}) => {

  const { html } = data.markdownRemark;
  const { title, image } = data.markdownRemark.frontmatter;
  const img = getImage(image);

  return (
    <Layout>
      <Seo title={title} />
      <div>
        <h2>{title}</h2>
        <div>
          <GatsbyImage alt={title} image={img} />
        </div>
        <div dangerouslySetInnerHTML={{__html: html}} />
      </div>
    </Layout>
  )
}

export default Photo

export const query = graphql`
  query PhotoQuery($id: String) {
    markdownRemark(id: {eq: $id}) {
      html
      id
      frontmatter {
        url
        category
        title
        image {
          childImageSharp {
            gatsbyImageData(width: 880)
          }
        }
      }
    }
  }
`
