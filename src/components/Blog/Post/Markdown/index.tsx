import React from 'react'

import styles from './styles.module.css'

interface IMarkdownProps {
  html: string
}

import { MDXRenderer } from 'gatsby-plugin-mdx'

const Markdown: React.FC<IMarkdownProps> = ({ body }) => (
  <div className={styles.wrapper}>
    <MDXRenderer>{body}</MDXRenderer>
  </div>
)

export default Markdown
