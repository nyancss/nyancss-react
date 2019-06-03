import generate from '.'

const h = (...whatever) => whatever

describe('generate', () => {
  it('generates simple components', t => {
    const { Component } = generate(h, {
      Component: { tag: undefined, className: 'component-class', props: {} }
    })
    const [tag, props, children] = Component({ children: 42 })
    expect(tag).toBe('div')
    expect(props).toEqual({ className: 'component-class' })
    expect(children).toBe(42)
  })

  // it('passes children arrays', t => {
  //   const { Component } = generate(h, { Component: 'component-class' })
  //   const [, , c1, c2, c3] = Component({ children: [1, 2, 3] })
  //   t.true(c1 === 1)
  //   t.true(c2 === 2)
  //   t.true(c3 === 3)
  // })

  // it('generates components with bool props', t => {
  //   const { Component } = generate(h, {
  //     Component: 'component-class',
  //     'Component-disabled': 'component-disabled'
  //   })
  //   const defaultArgs = Component({ children: 42 })
  //   t.deepEqual(defaultArgs, ['div', { className: 'component-class' }, 42])
  //   const disabledArgs = Component({ children: 42, disabled: true })
  //   t.deepEqual(disabledArgs, [
  //     'div',
  //     { className: 'component-class component-disabled' },
  //     42
  //   ])
  // })

  // test('it generates components with enum props', t => {
  //   const { Component } = generate(h, {
  //     Component: 'component-class',
  //     'Component-color-red': 'component-red',
  //     'Component-color-green': 'component-green'
  //   })
  //   const defaultArgs = Component({ children: 42 })
  //   t.deepEqual(defaultArgs, ['div', { className: 'component-class' }, 42])
  //   const redArgs = Component({ children: 42, color: 'red' })
  //   t.deepEqual(redArgs, [
  //     'div',
  //     { className: 'component-class component-red' },
  //     42
  //   ])
  // })

  // test('it allows to override the tag using props', t => {
  //   const { Component } = generate(h, {
  //     Component: 'component-class'
  //   })
  //   const args = Component({ tag: 'span', children: 42 })
  //   t.deepEqual(args, ['span', { className: 'component-class' }, 42])
  // })

  // test('it allows to override the default props', t => {
  //   const { Component } = generate(
  //     h,
  //     {
  //       Component: 'component-class',
  //       'Component-color-red': 'component-red',
  //       'Component-color-green': 'component-green',
  //       'Component-disabled': 'component-disabled'
  //     },
  //     {
  //       Component: { tag: 'main', disabled: true, color: 'green' }
  //     }
  //   )
  //   const args = Component({ children: 42 })
  //   t.deepEqual(args, [
  //     'main',
  //     { className: 'component-class component-disabled component-green' },
  //     42
  //   ])
  // })

  // test('it allows to override the tag using default props', t => {
  //   const { Component } = generate(
  //     h,
  //     {
  //       Component: 'component-class'
  //     },
  //     {
  //       Component: { tag: 'span' }
  //     }
  //   )
  //   const args = Component({ children: 42 })
  //   t.deepEqual(args, ['span', { className: 'component-class' }, 42])
  // })

  // test('it allows to mix classes with custom `className` props', t => {
  //   const { Component } = generate(h, { Component: 'component-class' })
  //   const [, props] = Component({ className: 'original-class' })
  //   t.deepEqual(props, { className: 'component-class original-class' })
  // })

  // test('it passes extra props to the tag element', t => {
  //   const { Component } = generate(h, {
  //     Component: 'component-class',
  //     'Component-test': 'component-test'
  //   })
  //   const args = Component({ children: 42, a: 1, b: 2 })
  //   t.deepEqual(args, ['div', { className: 'component-class', a: 1, b: 2 }, 42])
  // })

  // test('it passes refs callback to the tag element', t => {
  //   const refsCallback = () => {}
  //   const { Component } = generate(h, {
  //     Component: 'component-class'
  //   })
  //   const args = Component({ children: 42, innerRef: refsCallback })
  //   t.deepEqual(args, [
  //     'div',
  //     { className: 'component-class', ref: refsCallback },
  //     42
  //   ])
  // })

  // test('it works with a number of zero as children', t => {
  //   const { Component } = generate(h, { Component: 'component-class' })
  //   const [, props, children] = Component({ children: 0 })
  //   t.deepEqual(props, { className: 'component-class' }, 0)
  //   t.true(children === 0)
  // })

  // test('it works with class names not matching the convension', t => {
  //   const classes = generate(h, {
  //     Component: 'component-class',
  //     'Component-enum-': '123',
  //     'Component--option': 'qwe'
  //   })
  //   t.deepEqual(Object.keys(classes), ['Component'])
  // })
})
