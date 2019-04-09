import React, { useState, Component } from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import posed, { PoseGroup } from "react-pose"
import {
  Columns,
  Heading,
  Media,
  Image,
  Icon,
  Tag,
  Card,
  Progress
} from 'react-bulma-components'

import Section from './Section'
import Loading from './Loading'
import Error from './Error'

const SUSCRIBE_RESULTS = gql`
  subscription SUSCRIBE_RESULTS($address: ID!){
    getResults(address: $address){
      address
      totalVotes
      options {
        text
        votes
      }
    }
  }
`

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
      results {
        address
        totalVotes
        options {
          text
          votes
        }
      }
    }
  }
`

const AnimatedLI = posed.li({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});

const OptionImage = ({text, filename}) =>
  <Image size={64} alt={text} className='option_image' src={`https://lib.tutellus.com/masterbc/${filename}.jpg`} />

const OptionVotes = styled(({ className, text, result = 0, index = -1 }) => {
  const filename = text.toLowerCase().replace(' ', '-')
  const getColorByIndex = (index) => {
    switch(index) {
      case 0:
        return 'primary'
      case 1:
        return 'info'
      case 2:
        return 'link'
      default:
        return 'light'
    }
  }
  return (
    <Card className={className}>
      <Card.Content>
        <Media>
          <Media.Item renderAs='figure' position='left'>
            <OptionImage alt={text} filename={filename} />
          </Media.Item>
          <Media.Item>
            <Heading className='option_name' renderAs='h3' size={2}>{text}</Heading>
            <Tag.Group className='option_result' gapless>
              <Tag size='large' color={getColorByIndex(index)}>{result === 0 ? '--' : result}</Tag>
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
    margin-top: 1.75rem;
  }

  & .option_image {
    border: 1px solid rgba(10,10,10,.1);
  }

  & .option_result {
    position: absolute;
    right: 1.5rem;
    top: 2.25rem;
    > .tag {
      font-size: 2.25rem;
      font-weight: 700;
    }
  }
`

export const PollVotes = styled(class extends Component {
  componentDidMount() {
    this.props.more();
  }
  render() {
    const {
      className,
      data,
      error,
      loading
    } = this.props

    if (loading) return <Loading />;
    if (error) return <Error />;

    const {
      getPoll: {
        title,
        description,
        options,
        results
      }
    } = data

    const votesOptions = options
      .map(option => {
        const finded = results.options.find(result => result.text === option.text)
        option.votes = finded.votes
        return option
      });

    votesOptions.sort((a,b) => b.votes - a.votes)

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
            <Heading className='poll_votes'>
              {results.totalVotes}
              {results.totalVotes > 1 ? ' Votos': ' Voto'}
            </Heading>
            <ul>
              <PoseGroup>
                {votesOptions.map(({ text, address, votes }, index) => (
                  <AnimatedLI key={address}>
                    <OptionVotes text={text} result={votes} index={index}/>
                  </AnimatedLI>
                ))}
              </PoseGroup>
            </ul>
          </Columns.Column>
        </Columns>
      </Section>
    )
  }
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
  & .poll_title {
    font-size: 3rem;
    line-height: 4rem;
    text-align: center;
  }
  & .poll_votes {
    text-align: right;
  }
`;

const OptionCopy = styled(({ className, text, address }) => {
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
            <OptionImage alt={text} filename={filename} />
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
                    <span className='mdi mdi-16px mdi-content-copy' />
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

export const PollBasic = styled(class extends Component {
  componentDidMount() {
    this.props.more();
  }
  render() {
    const {
      data,
      error,
      loading
    } = this.props

    if (loading) return <Loading />;
    if (error) return <Error />;

    const {
      getPoll: {
        title,
        description,
        options
      }
    } = data

    return (
      <Section className={this.props.className}>
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
                <li key={address}>
                  <OptionCopy text={text} address={address} />
                </li>
              ))}
            </ul>
          </Columns.Column>
        </Columns>
      </Section>
    )
  }
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

const PollInfo = ({
  address = process.env.POLL_ADDRESS,
  renderAs:RenderAs = PollBasic
}) =>
  <Query
    query={GET_POLL_QUERY}
    variables={{ address }}
  >
    {({ subscribeToMore, ...props }) => {
      const more = () => subscribeToMore({
        document: SUSCRIBE_RESULTS,
        variables: { address },
        updateQuery: (prev, {subscriptionData}) => {
          if (!subscriptionData.data || !subscriptionData.data.getResults){
            return prev
          }

          if (prev && prev.getPoll) {
            prev.getPoll.results = subscriptionData.data.getResults
          }

          return prev
        },
      })
      return <RenderAs {...props} more={more} />
    }}
  </Query>


export default PollInfo
