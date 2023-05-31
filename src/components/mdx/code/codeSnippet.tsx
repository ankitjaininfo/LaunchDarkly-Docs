// /** @jsx jsx */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useCallback, useState } from 'react'
import { Themed } from '@theme-ui/mdx'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import Prism from 'prismjs'
import { Box, Button, jsx } from 'theme-ui'

import 'prismjs/components/prism-go'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-kotlin'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-haskell'
import 'prismjs/components/prism-hcl'
import 'prismjs/components/prism-lua'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-swift'
import 'prismjs/components/prism-objectivec'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-brightscript'
import 'prismjs/components/prism-nginx'
import 'prismjs/components/prism-dart'
import 'prismjs/components/prism-erlang'
import 'prismjs/components/prism-rust'

import { track } from '../../../utils/analyticsUtils'
import { copyToClipboard } from '../../../utils/copyToClipboard'

export type CodeSnippetProps = {
  className: string
  children: string
}

export function CodeSnippet({ children, className, ...props }: CodeSnippetProps) {
  const [showCopied, setShowCopied] = useState(false)

  const getLanguage = () => {
    if (!className.includes('language-')) {
      return 'text' as Language
    }

    const tokens = className.split(' ')
    const languageToken = tokens.find(t => t.includes('language-'))
    return languageToken.replace(/language-/, '') as Language
  }

  const onClickCopy = useCallback(() => {
    setShowCopied(true)

    setTimeout(() => setShowCopied(false), 2000)
    copyToClipboard(children)
    track('Copy to Clipboard Button Clicked')
  }, [children])

  return (
    <Box sx={{ position: 'relative' }}>
      <Highlight
        {...defaultProps}
        {...props}
        code={children.trim()}
        theme={undefined}
        // Override prism-react-renderer's vendored Prism and limited language list
        Prism={Prism as any}
        language={getLanguage()}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Fragment>
            <Themed.pre
              className={className}
              style={style}
              sx={{ position: 'relative', paddingLeft: 6, '& > div:last-child': { mb: 6 } }}
            >
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i })
                return (
                  <div key={lineProps.key} {...lineProps}>
                    <span
                      sx={{
                        color: 'grayMed',
                        paddingRight: 2,
                        marginRight: 2,
                        textAlign: 'right',
                        fontSize: 2,
                        display: 'inline-block',
                        userSelect: 'none',
                        pointerEvents: 'none',
                        width: 4,
                        position: 'absolute',
                        left: 0,
                        '::before': {
                          content: 'attr(data-pseudo-content)',
                        },
                      }}
                      data-pseudo-content={i + 1}
                    >
                      {/* no content - using pseudo-element */}
                    </span>
                    {line.map((token, key) => {
                      const tokenProps = getTokenProps({ token, key })
                      return <span key={tokenProps.key} {...tokenProps} sx={{ display: 'inline-block' }} />
                    })}
                  </div>
                )
              })}
            </Themed.pre>
          </Fragment>
        )}
      </Highlight>
      <Button
        sx={{ position: 'absolute', bottom: 4, right: 2 }}
        variant="code.copy"
        onClick={onClickCopy}
        aria-label="Copy code"
        type="button"
      >
        {showCopied ? 'COPIED' : 'COPY'}
      </Button>
    </Box>
  )
}
