/** @jsx jsx */
import React from 'react'
import { Themed } from '@theme-ui/mdx'
import { jsx } from 'theme-ui'

import { copyToClipboard } from '../../utils/copyToClipboard'
import Icon from '../icon'

// This module defines custom heading components to be used in place
// of the default HTML elements that Markdown compiles to.

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type HeadingProps = { id: string }

function createHeading(tag: HeadingTag) {
  const Heading: React.FunctionComponent<React.PropsWithChildren<HeadingProps>> = props => {
    const Tag = Themed[tag]

    const copyLinkToClipboard = () => {
      const location = new URL(window.location.href)
      location.hash = props.id
      copyToClipboard(location.href)
    }

    return (
      <Tag
        {...props}
        css={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          '& > a': {
            visibility: 'hidden',
          },
          ':hover > a': {
            visibility: 'visible',
          },
        }}
      >
        <a
          href={`#${props.id}`}
          onClick={copyLinkToClipboard}
          sx={{
            paddingRight: 2,
            marginLeft: -6,
            float: 'left',
            display: ['none', 'flex'],
          }}
        >
          <Icon name="link-variant" variant="heading" />
        </a>
        {props.children}
      </Tag>
    )
  }

  return Heading
}

export const H1 = createHeading('h1')

export const H2 = createHeading('h2')

export const H3 = createHeading('h3')

export const H4 = createHeading('h4')

export const H5 = createHeading('h5')

export const H6 = createHeading('h6')
