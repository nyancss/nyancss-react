import generate from '.'

const h = (...whatever) => whatever

describe('generate', () => {
  it('generates simple components', () => {
    const { Component } = generate(h, {
      Component: { tag: undefined, className: 'component-class', props: {} }
    })
    const [tag, props, children] = Component({ children: 42 })
    expect(tag).toBe('div')
    expect(props).toEqual({ className: 'component-class' })
    expect(children).toBe(42)
  })

  it('passes children arrays', () => {
    const { Component } = generate(h, {
      Component: { tag: undefined, className: 'component-class', props: {} }
    })
    const [, , c1, c2, c3] = Component({ children: [1, 2, 3] })
    expect(c1).toBe(1)
    expect(c2).toBe(2)
    expect(c3).toBe(3)
  })

  it('generates components with bool props', () => {
    const { Component } = generate(h, {
      Component: {
        tag: undefined,
        className: 'component-class',
        props: {
          disabled: {
            type: 'boolean',
            propName: 'disabled',
            className: 'component-disabled'
          }
        }
      }
    })
    const defaultArgs = Component({ children: 42 })
    expect(defaultArgs).toEqual(['div', { className: 'component-class' }, 42])
    const disabledArgs = Component({ children: 42, disabled: true })
    expect(disabledArgs).toEqual([
      'div',
      { className: 'component-class component-disabled' },
      42
    ])
  })

  it('generates components with enum props', () => {
    const { Component } = generate(h, {
      Component: {
        tag: undefined,
        className: 'component-class',
        props: {
          color: {
            type: 'enum',
            propName: 'color',
            values: ['red', 'green'],
            classNames: {
              red: 'component-red',
              green: 'component-green'
            }
          }
        }
      }
    })
    const defaultArgs = Component({ children: 42 })
    expect(defaultArgs).toEqual(['div', { className: 'component-class' }, 42])
    const redArgs = Component({ children: 42, color: 'red' })
    expect(redArgs).toEqual([
      'div',
      { className: 'component-class component-red' },
      42
    ])
  })

  it('allows to override the tag using props', () => {
    const { Component } = generate(h, {
      Component: { tag: undefined, className: 'component-class', props: {} }
    })
    const args = Component({ tag: 'span', children: 42 })
    expect(args).toEqual(['span', { className: 'component-class' }, 42])
  })

  it('allows to mix classes with custom `className` props', () => {
    const { Component } = generate(h, {
      Component: { tag: undefined, className: 'component-class', props: {} }
    })
    const [, props] = Component({ className: 'original-class' })
    expect(props).toEqual({ className: 'component-class original-class' })
  })

  it('passes extra props to the tag element', () => {
    const { Component } = generate(h, {
      Component: {
        tag: undefined,
        className: 'component-class',
        props: {
          test: {
            type: 'boolean',
            propName: 'test',
            className: 'component-test'
          }
        }
      }
    })
    const args = Component({ children: 42, a: 1, b: 2 })
    expect(args).toEqual([
      'div',
      { className: 'component-class', a: 1, b: 2 },
      42
    ])
  })

  it('passes refs callback to the tag element', () => {
    const refsCallback = () => {}
    const { Component } = generate(h, {
      Component: { tag: undefined, className: 'component-class', props: {} }
    })
    const args = Component({ children: 42, innerRef: refsCallback })
    expect(args).toEqual([
      'div',
      { className: 'component-class', ref: refsCallback },
      42
    ])
  })

  it('works with a number of zero as children', () => {
    const { Component } = generate(h, {
      Component: { tag: undefined, className: 'component-class', props: {} }
    })
    const [, props, children] = Component({ children: 0 })
    expect(props).toEqual({ className: 'component-class' })
    expect(children).toBe(0)
  })
})
