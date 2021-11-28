import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Article = () => (
  <Layout>
    <Seo title="Article" />
    <h1>Hi from the Article page</h1>
    <p>Welcome to Article</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default Article
