import React from 'react'

import styles from './styles.module.css'

import { MDXProvider, Components } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import ExternalLink from '../../../ExternalLink'

interface IMarkdownProps {
  body: string
}

const components: Components = { ExternalLink }

const Markdown: React.FC<IMarkdownProps> = ({ body }) => (
  <div className={styles.wrapper}>
    <MDXProvider components={components}>
      <MDXRenderer>{body}</MDXRenderer>
    </MDXProvider>
  </div>
)

export default Markdown
