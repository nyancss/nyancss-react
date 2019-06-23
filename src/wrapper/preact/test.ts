import { NyanCSSMap } from '@nyancss/types'
import { createElement } from 'preact'
import { cleanup, render } from 'preact-testing-library'
import reactWrapper from '.'

describe('Preact wrapper', () => {
  afterEach(cleanup)

  const map: NyanCSSMap = {
    Button: {
      componentName: 'Button',
      tag: undefined,
      className: 'Button-xxx',
      props: {
        active: {
          propName: 'active',
          type: 'boolean',
          className: 'Button-active-xxx'
        },
        color: {
          propName: 'color',
          type: 'enum',
          values: ['red', 'green'],
          classNames: {
            red: 'Button-color-red-xxx',
            green: 'Button-color-green-xxx'
          }
        }
      }
    }
  }

  it('creates React element from the passed Nyan CSS map', () => {
    const { Button } = reactWrapper(map)
    const { getByText } = render(
      createElement(Button, { tag: 'button' }, 'Button text')
    )
    const el = getByText('Button text')
    expect('className' in el && el.className).toEqual('Button-xxx')
  })

  it('properly applies props', () => {
    const { Button } = reactWrapper(map)
    const { getByText } = render(
      createElement(Button, { tag: 'button', active: true, color: 'red' }, [
        'Button text'
      ])
    )
    const el = getByText('Button text')
    expect('className' in el && el.className).toEqual(
      'Button-xxx Button-active-xxx Button-color-red-xxx'
    )
  })
})
