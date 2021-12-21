import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => {

  return (
    <header className='header'>
      <div className='container'>
        <>
          <Link to="/" >
            {siteTitle}
          </Link>
        </>
      </div>
    </header>
  )}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
