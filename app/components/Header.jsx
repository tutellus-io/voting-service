import React, { useState } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import {
  Navbar,
  Container
} from 'react-bulma-components'

const Header = styled(({ className }) => {
  const [active, setActive] = useState(false)

  const toggle = () => setActive(!active)
  const closeBurger = () => setActive(false)

  return (
    <Navbar className={className} active={active}>
      <Container>
        <Navbar.Brand >
          <Navbar.Item renderAs='div'>
            <Navbar.Item
              renderAs={NavLink}
              to='/'
              exact
              onClick={() => closeBurger()}
            >
              <img
                src='https://www.tutellus.io/images/color-logo.svg'
                className='logo'
                alt='Tutellus'
              />
            </Navbar.Item>
          </Navbar.Item>
          <Navbar.Burger onClick={() => toggle()} />
        </Navbar.Brand >
        <Navbar.Menu >
          <Navbar.Container>
            <Navbar.Item
              renderAs={NavLink}
              to='/signup'
              exact
              activeClassName='active'
              onClick={() => closeBurger()}
            >
              Registro
            </Navbar.Item>
            {/* <Navbar.Item
              renderAs={NavLink}
              to='/poll'
              exact
              activeClassName='active'
              onClick={() => closeBurger()}
            >
              Votación
            </Navbar.Item>
            <Navbar.Item
              renderAs={NavLink}
              to='/results'
              exact
              activeClassName='active'
              onClick={() => closeBurger()}
            >
              Resultados
            </Navbar.Item> */}
          </Navbar.Container>
        </Navbar.Menu>
      </Container>
    </Navbar>
  )
})`
  padding: 0.75rem 1rem;
  & .navbar-item {
    padding: .5rem 1.25rem;
  }
  & .navbar-burger {
    margin-top: 1rem;
  }

  & .logo {
    max-height: inherit;
    width: 130px;
  }
`

export default Header
