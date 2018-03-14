import * as React from 'react'
import styled from 'styled-components'

const Menu = styled.ul`
  list-style: none !important;
  li {
    display: inline;
  }
  li:after {
    content: ' | ';
  }
  li:last-child:after {
    content: '';
  }
`

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="content has-text-centered">
        <Menu>
          <li>&copy; 2018 Lumenbox - All rights reserved</li>
          <li>
            <a href="/page/terms">Terms and Conditions</a>
          </li>
          <li>
            <a href="https://lumenbox.org/privacy-policy/">Privacy</a>
          </li>
        </Menu>
      </div>
    </div>
  </footer>
)

export default Footer
