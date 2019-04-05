import React, { useState } from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import {
  Columns,
  Heading,
  Loader,
  Media,
  Image,
  Icon,
  Tag,
  Card
} from 'react-bulma-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Section from './Section'

const GET_POLL_QUERY = gql`
  query GET_POLL_QUERY($address: ID! ){
    getPoll(address: $address){
      address
      title
      doe
      description
      options {
        text
        address
      }
    }
  }
`

const Option = styled(({ className, text, address }) => {
  const [copied, setCopied] = useState(false)

  const unmarkAsCopied = () => {
    setCopied(false)
  }

  const markAsCopied = () => {
    setCopied(true)
    setTimeout(unmarkAsCopied, 3000)
  }

  const filename = text.toLowerCase().replace(' ', '-')
  return (
    <Card className={className}>
      <Card.Content>
        <Media>
          <Media.Item renderAs='figure' position='left'>
            <Image size={64} alt={text} className='option_image' src={`https://dev-res.thumbr.io/masterbc/${filename}.jpg?size=128x128s`} />
          </Media.Item>
          <Media.Item>
            <Heading className='option_name' renderAs='h3' size={1}>{text}</Heading>
            <Heading className='option_address' renderAs='p' subtitle size={5}>
              {address}
            </Heading>
            <Tag.Group className='option_copy' gapless>
              <Tag className='is-large'>
                <CopyToClipboard text={address}s
                  onCopy={markAsCopied}>
                  <Icon>
                    <span class='mdi mdi-16px mdi-content-copy' />
                  </Icon>
                </CopyToClipboard>
              </Tag>
              {copied && <Tag color='danger' className='is-large'>¡Copiado!</Tag>}
            </Tag.Group>
          </Media.Item>
        </Media>
      </Card.Content>
    </Card>
  )
})`
  margin-bottom: 2rem;
  position: relative;

  & .option_name {
    margin-bottom: 0.5em;
  }

  & .option_image {
    border: 1px solid rgba(10,10,10,.1);
  }

  & .option_address {
    margin-top: 1rem;
    margin-bottom: 0;
  }

  & .option_copy {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
  }
`

const Poll = styled(({ className, address = 'TBZTW6YHZ4KZRLNF5KUTVLHKPZFGOQCMHY7NAHOU' }) => {
  return (
    <Query query={GET_POLL_QUERY} variables={{ address }}>
      {({ data: { getPoll }, loading }) => {
        if (loading) return <Loader />
        const {
          title,
          description,
          options
        } = getPoll

        return (
          <Section className={className}>
            <Columns breakpoint='mobile'>
              <Columns.Column tablet={{
                size: 'half',
                offset: 'one-quarter'
              }}>
                <Heading className='poll_title'
                  renderAs='h2'
                >
                  {title}
                </Heading>
                <Heading className='poll_description'
                  renderAs='p'
                  size={4}
                >
                  {description}
                </Heading>
                <ul>
                  {options.map(({ text, address }) => (
                    <li>
                      <Option text={text} address={address} />
                    </li>
                  ))}
                </ul>
              </Columns.Column>
            </Columns>
          </Section>
        )
      }}
    </Query>
  )
})`
  & .poll_title {
    font-size: 3rem;
    line-height: 4rem;
    text-align: center;
  }

  & .poll_description {
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 3rem;
    margin-bottom: 1.5rem;
  }
`

export default Poll
