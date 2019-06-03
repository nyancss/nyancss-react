import { NyanCSSComponent, NyanCSSMap } from 'nyancss'
import {
  NyanCSSReactComponent,
  NyanCSSReactCreateElement,
  NyanCSSReactExports,
  NyanCSSReactProps
} from '../types'

export default function generate<Element>(
  h: NyanCSSReactCreateElement<Element>,
  map: NyanCSSMap
) {
  return Object.keys(map).reduce(
    (acc, componentName) => {
      acc[componentName] = createComponent(h, componentName, map[componentName])
      return acc
    },
    {} as NyanCSSReactExports<Element>
  )
}

function createComponent<Element>(
  h: NyanCSSReactCreateElement<Element>,
  componentName: string,
  component: NyanCSSComponent
): NyanCSSReactComponent<Element> {
  const Component = (props: NyanCSSReactProps) => {
    var tag = props.tag || 'div'
    var className = getClassName(
      component.className,
      component.modifiers,
      props,
      props.className
    )
    var tagProps = without(
      props,
      ['tag', 'children', 'className', 'innerRef'].concat(
        Object.keys(component.modifiers)
      )
    )
    var compoundProps = Object.assign({ className: className }, tagProps)
    if (props.innerRef) {
      compoundProps.ref = props.innerRef
    }
    var helperArgs = [tag, compoundProps].concat(
      props && props.children !== undefined ? props.children : []
    )
    return h.apply(null, helperArgs)
  }
  Component.displayName = componentName
  return Component
}

function getComponents(style) {
  var classes = Object.keys(style)
  return classes.reduce(function(acc, className) {
    var isModifier = /-/.test(className)
    if (isModifier) {
      var classNameCaptures = className.match(/([^-]+)-(.+)/)
      var componentClass = classNameCaptures[1]
      var modifierPart = classNameCaptures[2]
      var isEnum = /-/.test(modifierPart)

      ensureComponentMap(componentClass)
      var modifiers = acc[componentClass].modifiers

      if (isEnum) {
        var modifierCaptures = modifierPart.match(/^(.+)-(.+)$/)

        if (!modifierCaptures) {
          return acc
        }

        var propName = modifierCaptures[1]
        var element = modifierCaptures[2]
        var modifier = (modifiers[propName] = modifiers[propName] || {
          type: 'enum',
          elements: {}
        })

        modifier.elements[element] = style[className]
      } else {
        // is bool
        var propName = modifierPart
        modifiers[propName] = {
          type: 'bool',
          class: style[className]
        }
      }
    } else {
      ensureComponentMap(className)
    }

    function ensureComponentMap(className) {
      acc[className] = acc[className] || {
        class: style[className],
        modifiers: {}
      }
    }

    return acc
  }, {})
}

function getClassName(className: string, modifiers, props, originalClassName) {
  var modifierNames = Object.keys(modifiers)
  var modifierClasses = modifierNames.reduce(function(acc, modifierName) {
    var modifier = modifiers[modifierName]
    var propValue = props[modifierName]
    return acc.concat(findModifierClassName(modifier, propValue) || [])
  }, [])
  return classesToString([originalClassName, className].concat(modifierClasses))
}

function findModifierClassName(modifier, propValue) {
  if (modifier) {
    switch (modifier.type) {
      case 'bool':
        if (propValue) {
          return modifier.class
        }
        break
      case 'enum':
        return modifier.elements[propValue]
    }
  }
}

function classesToString(classes) {
  return classes
    .filter(function(c) {
      return c
    })
    .sort()
    .join(' ')
}

function without(obj, excludeKeys) {
  return Object.keys(obj).reduce(function(acc, currentKey) {
    if (excludeKeys.indexOf(currentKey) === -1) {
      acc[currentKey] = obj[currentKey]
    }
    return acc
  }, {})
}
