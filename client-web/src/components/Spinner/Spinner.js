import styled from 'styled-components'

const Spinner = styled.div`
  display: inline-block;
  width: 1em;
  height: 1em;

  &::after {
    top: 2px;
    position: relative;
    animation: spinAround 500ms infinite linear;
    border: 2px solid #ccc;
    border-radius: 290486px;
    border-right-color: transparent;
    border-top-color: transparent;
    display: block;
    content: '';
    height: 1em;
    width: 1em;
  }
`

export default Spinner
