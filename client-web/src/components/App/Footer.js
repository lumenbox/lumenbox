import * as React from 'react'
import styled from 'styled-components'
import config from '../../config'

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
          {config.termsLink && (
            <li>
              <a href={config.termsLink}>Terms and Conditions</a>
            </li>
          )}
          {config.privacyLink && (
            <li>
              <a href={config.privacyLink}>Privacy Policy</a>
            </li>
          )}
        </Menu>
      </div>
    </div>
  </footer>
)

export default Footer
