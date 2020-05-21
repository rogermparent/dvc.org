declare module '@mdx-js/react' {
  import * as React from 'react'
  export type Components = {
    [string]: React.ComponentType<{ children: React.ReactNode }>
  }
  export interface IMDXProviderProps {
    children: React.ReactNode
    components: Components
  }
  export class MDXProvider extends React.Component<IMDXProviderProps> {}
}
