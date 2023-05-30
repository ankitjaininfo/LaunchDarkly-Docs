import { TOC } from '../components/tableOfContents'

import { Frontmatter } from './frontmatter'

export type MdxNode = {
  id: string
  frontmatter: Frontmatter
  toc: TOC
  fileAbsolutePath: string
  timeToRead: number
  lastModifiedTime: string
  isLandingPage: boolean
  modifiedDate: string
  internal: {
    contentFilePath: string
    contentDigest: string
  }
  body: string
}
