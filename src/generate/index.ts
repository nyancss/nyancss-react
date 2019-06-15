import { NyanCSSComponent, NyanCSSMap, NyanCSSProp } from '@nyancss/types'
import {
  NyanCSSReactComponent,
  NyanCSSReactCreateElement,
  NyanCSSReactExports,
  NyanCSSReactProps
} from '../types'

export default function generate<Element>(
  createElement: NyanCSSReactCreateElement<Element>,
  map: NyanCSSMap
) {
  return Object.keys(map).reduce(
    (acc, componentName) => {
      acc[componentName] = createComponent(
        createElement,
        componentName,
        map[componentName]
      )
      return acc
    },
    {} as NyanCSSReactExports<Element>
  )
}

function createComponent<Element>(
  createElement: NyanCSSReactCreateElement<Element>,
  componentName: string,
  component: NyanCSSComponent
): NyanCSSReactComponent<Element> {
  const Component = (props: NyanCSSReactProps) => {
    const tag = props.tag || 'div'
    const className = getClassName(component, props)
    const tagProps = without(
      props,
      ['tag', 'children', 'className', 'innerRef'].concat(
        Object.keys(component.props)
      )
    )
    const compoundProps: NyanCSSReactProps = Object.assign(
      { className: className },
      tagProps
    )
    if (props.innerRef) {
      compoundProps.ref = props.innerRef
    }
    // TODO: Find a way to get rid of `as`
    const args = [tag, compoundProps].concat(props.children) as [
      string,
      NyanCSSReactProps,
      ...any[]
    ]
    return createElement.apply(null, args)
  }
  Component.displayName = componentName
  return Component
}

function getClassName(component: NyanCSSComponent, props: NyanCSSReactProps) {
  const componentPropsClassNames = Object.keys(component.props).reduce(
    (acc, componentPropName) => {
      const componentProp = component.props[componentPropName]
      const propValue = props[componentPropName]
      return acc.concat(findModifierClassName(componentProp, propValue) || [])
    },
    [] as string[]
  )
  return classesToString(
    [props.className, component.className].concat(componentPropsClassNames)
  )
}

function findModifierClassName(componentProp: NyanCSSProp, propValue: any) {
  switch (componentProp.type) {
    case 'boolean':
      if (propValue) return componentProp.className
      break
    case 'enum':
      return componentProp.classNames[propValue]
  }
}

function classesToString(classes: Array<string | undefined>) {
  return classes
    .filter(c => !!c)
    .sort()
    .join(' ')
}

function without(obj: { [key: string]: any }, excludeKeys: string[]) {
  return Object.keys(obj).reduce(
    function(acc, currentKey) {
      if (excludeKeys.indexOf(currentKey) === -1) {
        acc[currentKey] = obj[currentKey]
      }
      return acc
    },
    {} as { [key: string]: any }
  )
}
