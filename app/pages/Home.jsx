import React from 'react'
import Helmet from 'react-helmet-async'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import Section from '../components/Section'
import Hero from '../components/Hero'
import {
  Heading,
  Media,
  Image,
  Columns,
  Icon
} from 'react-bulma-components'

const Steps = styled.div`
  padding: 2rem 0;
  max-width: 400px;
  margin: 0 auto;
`
const Step = styled(({ className, title, description, url, link, show }) => {
  return (
    <Media className={className}>
      <Media.Item renderAs='figure' position='left'>
        <Image size={96} alt={title} className='step_image' src={url} />
      </Media.Item>
      <Media.Item>
        <Heading className='step_title'
          spaced
          renderAs='h3'
          exact
          size={2}
        >
          {title}
          {show
            ? <NavLink to={link} exact>
              <Icon color='info'>
                <span class='mdi mdi-16px mdi-open-in-new' />
              </Icon>
            </NavLink>
            : <Icon color='danger'>
              <span class='mdi mdi-16px mdi-open-in-new' />
            </Icon>
          }
        </Heading>
        <Heading className='step_description'
          renderAs='p'
          subtitle
          size={4}
        >
          {description}
        </Heading>
      </Media.Item>
    </Media>
  )
})`
  & .step_image {
    padding: 1.5rem;
    > img {
      border-radius: 50%;
    }
  }
  & .step_title {
    & .icon {
      margin-left: 1.5rem;
    }
  }
  & .step_description {
    line-height: 2rem;
  }
`

const MainSection = styled(({ className }) => {
  const content = {
    title: 'Bienvenido al primer sistema de votación público y descentralizado',
    steps: [
      {
        link: '/signup',
        url: '//placehold.jp/70/24a9bd/ffffff/180x180.jpg?text=1',
        title: 'Registro',
        description: 'Déjanos tu email y NEM address para enviarte XEM y que puedas votar',
        show: true
      },
      {
        link: '/poll',
        url: '//placehold.jp/70/24a9bd/ffffff/180x180.jpg?text=2',
        title: 'Votación',
        description: 'Elige el proyecto que más te haya gustado. Solo puedes votar 1 vez',
        show: +process.env.SHOW_VOTING_MENUS === 1
      },
      {
        link: '/results',
        url: '//placehold.jp/70/24a9bd/ffffff/180x180.jpg?text=3',
        title: 'Resultados',
        description: 'La info de la votación quedará almacenada en la Blockchain de NEM',
        show: +process.env.SHOW_VOTING_MENUS === 1
      }
    ],
    footer: 'Necesitas el nanowallet para votar',
    apps: [
      {
        url: 'https://itunes.apple.com/us/app/nem-wallet/id1227112677',
        image: 'https://lib.tutellus.com/images/badge-app-store.svg'
      },
      {
        url: 'https://play.google.com/store/apps/details?id=org.nem.nac.mainnet',
        image: 'https://lib.tutellus.com/images/badge-google-play.svg'
      }
    ]
  }
  return (
    <Section className={className}>
      <Columns breakpoint='mobile'>
        <Columns.Column tablet={{
          size: 'half',
          offset: 'one-quarter'
        }}>
          <Heading className='main_title' renderAs='h2' size={2}>{content.title}</Heading>
          <Steps>
            {
              content.steps.map(step =>
                <Step {...step} />
              )
            }
          </Steps>
          <Heading className='main_footer' subtitle renderAs='h2' size={3}>{content.footer}</Heading>
          <Columns breakpoint='mobile' className='app_table'>
            {
              content.apps.map(app =>
                <Columns.Column>
                  <a href={app.url} target='_blank' rel='noopener'>
                    <Image className='app_image' src={app.image} />
                  </a>
                </Columns.Column>
              )
            }
          </Columns>
        </Columns.Column>
      </Columns>
    </Section>
  )
})`
  & .main_title {
    line-height: 3.5rem;
    text-align: center;
  }

  & .main_footer {
    text-align: center;
  }
  & .app_table {
    max-width: 350px;
    margin: 0 auto;
  }
`

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home </title>
      </Helmet>
      <Hero color='primary' size='medium'>
        Blockchain Demo Day
      </Hero>
      <MainSection />
    </>
  )
}

export default Home
