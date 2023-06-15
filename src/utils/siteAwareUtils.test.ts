import { addRemoveSiteParam, setSubdomain } from './siteAwareUtils'

const launchDarklyContent = `
      app.launchdarkly.com
      clientsdk.launchdarkly.com
      clientstream.launchdarkly.com
      events.launchdarkly.com
      sdk.launchdarkly.com
      status.launchdarkly.com
      stream.launchdarkly.com
    `

const federalContent = `
      app.launchdarkly.us
      clientsdk.launchdarkly.us
      clientstream.launchdarkly.us
      events.launchdarkly.us
      sdk.launchdarkly.us
      status.launchdarkly.us
      stream.launchdarkly.us
    `

describe('setSubdomain', () => {
  it('replaces all launchDarkly urls to federal', () => {
    expect(setSubdomain(launchDarklyContent, 'federal', true)).toEqual(federalContent)
  })
})

describe('setSubdomain', () => {
  it('mobile.launchdarkly.com is a legacy URL that is not migrated to a .us URL', () => {
    const mobileUrl = 'mobile.launchdarkly.com'
    expect(setSubdomain(mobileUrl, 'federal', true)).toEqual(mobileUrl)
  })
})

jest.mock('@gatsbyjs/reach-router', () => {
  const actual = jest.requireActual('@gatsbyjs/reach-router')
  return {
    ...actual,
    globalHistory: { location: { search: '', hash: '#mock-anchor' } },
  }
})

describe('site selector', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('generate federal query string', () => {
    const result = addRemoveSiteParam('', 'federal')
    expect(result).toEqual('?site=federal')
  })

  test('generate general query string', () => {
    const result = addRemoveSiteParam('', 'general')
    expect(result).toEqual('')
  })

  test('generate query string with hash', () => {
    const result = addRemoveSiteParam('', 'federal', true)
    expect(result).toEqual('?site=federal#mock-anchor')
  })

  test('append site param to path', () => {
    const result = addRemoveSiteParam('https://docs.launchdarkly.com/home', 'federal')
    expect(result).toEqual('https://docs.launchdarkly.com/home?site=federal')
  })
})
