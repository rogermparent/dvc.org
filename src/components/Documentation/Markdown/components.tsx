import React from 'react'
import Collapsible from 'react-collapsible'
import Tooltip from './Tooltip'
import styles from './styles.module.css'
import Link from '../../Link'
import ExternalLink from '../../ExternalLink'

const Details: React.FC<{
  children: Array<{ props: { children: Array<string> } } | string>
}> = ({ children }) => {
  const filteredChildren = children.filter(child => child !== '\n')

  if (!filteredChildren.length) return null
  if (typeof filteredChildren[0] === 'string') return null

  const text = filteredChildren[0].props.children[0]

  return (
    <Collapsible trigger={text} transitionTime={200}>
      {filteredChildren.slice(1)}
    </Collapsible>
  )
}

const Abbr: React.FC<{ children: [string] }> = ({ children }) => {
  return <Tooltip text={children[0]} />
}

const Cards: React.FC<{
  children: Array<object | string>
}> = ({ children }) => {
  return (
    <div className={styles.cards}>
      {Array.isArray(children)
        ? children.reduce(
            (acc: Array<object>, child, i) =>
              typeof child === 'object'
                ? [...acc, <div key={i}>{child}</div>]
                : acc,
            []
          )
        : children}
    </div>
  )
}

const Card: React.FC<{
  children: Array<object | string> | object | string
  icon?: string
  heading?: string
  headingtag:
    | string
    | React.FC<{
        className: string
      }>
}> = ({ children, icon, heading, headingtag: Heading = 'h3' }) => {
  let iconElement
  if (Array.isArray(children) && icon) {
    const firstRealItemIndex = children.findIndex(x => x !== '\n')
    iconElement = children[firstRealItemIndex]
    children = children.slice(firstRealItemIndex + 1)
  }
  return (
    <div className={styles.card}>
      {iconElement && <div className={styles.cardIcon}>{iconElement}</div>}
      <div className={styles.cardContent}>
        {heading && <Heading className={styles.cardHeading}>{heading}</Heading>}
        {children}
      </div>
    </div>
  )
}

export default {
  a: Link,
  ExternalLink,
  Card,
  Cards,
  abbr: Abbr,
  details: Details
}
