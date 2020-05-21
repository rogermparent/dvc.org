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
  return <div className={styles.cards}>{children}</div>
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
  if (icon) {
    iconElement = children[0]
    children = children.slice(1)
  }
  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        {iconElement && <div className={styles.cardIcon}>{iconElement}</div>}
        <div className={styles.cardContent}>
          {heading && (
            <Heading className={styles.cardHeading}>{heading}</Heading>
          )}
          {children}
        </div>
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
