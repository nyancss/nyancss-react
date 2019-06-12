import { NyanCSSMap } from '@nyancss/types'
import { cleanup, render } from '@testing-library/react'
import { createElement } from 'react'
import reactWrapper from '.'

describe('React wrapper', () => {
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
    expect(el.className).toEqual('Button-xxx')
  })

  it('properly applies props', () => {
    const { Button } = reactWrapper(map)
    const { getByText } = render(
      createElement(Button, { tag: 'button', active: true, color: 'red' }, [
        'Button text'
      ])
    )
    const el = getByText('Button text')
    expect(el.className).toEqual(
      'Button-active-xxx Button-color-red-xxx Button-xxx'
    )
  })
})
