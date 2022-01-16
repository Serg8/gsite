import React, { useState, useEffect, useRef } from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import useWindowSize from "../utils/useWindowSize"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({data}) => {
  const { nodes } = data.allMarkdownRemark;
  let portionNodes = 20;
  const { width } = useWindowSize();
  if (width > 767) {
    portionNodes = 50;
  }

  // State for the list
  const [list, setList] = useState([...nodes.slice(0, portionNodes)]);

  // State to trigger load more
  const [loadMore, setLoadMore] = useState(false);

  // State of whether there is more to load
  const [hasMore, setHasMore] = useState(nodes.length > portionNodes);

  //Set a ref for the loading div
  const loadRef = useRef();

  // Handle intersection with load more div
  const handleObserver = (entities) => {
    const target = entities[0]
    if (target.isIntersecting) {
      setLoadMore(true)
    }
  }

  //Initialize the intersection observer API
  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "16px",
      threshold: 1.0,
    }
    const observer = new IntersectionObserver(handleObserver, options)
    if (loadRef.current) {
      observer.observe(loadRef.current)
    }
  }, []);

  // Handle loading more nodes
  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length
      const isMore = currentLength < nodes.length
      const nextResults = isMore
        ? nodes.slice(currentLength, currentLength + portionNodes)
        : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore]) //eslint-disable-line

  //Check if there is more
  useEffect(() => {
    const isMore = list.length < nodes.length
    setHasMore(isMore)
  }, [list]) //eslint-disable-line

  return (
  <Layout>
    <Seo lang="ru" title="Home" />
    <h1>Nature pictures</h1>
    <div className="cards">
      {list.map(card => {
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
    <div ref={loadRef}>
      {hasMore ? <div className="spinner-wrap"><svg className="spinner" viewBox="0 0 50 50">
          <circle className="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
        </svg></div> : ''}
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
                gatsbyImageData(placeholder: BLURRED, formats: [AUTO, AVIF], width: 700)
              }
            }
        }
        id
      }
    }
  }
`;
