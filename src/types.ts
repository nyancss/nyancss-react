export type NyanCSSReactProps = { [key: string]: any }

export type NyanCSSReactComponent<Element> = (
  props?: NyanCSSReactProps
) => Element

export type NyanCSSReactExports<Element> = {
  [componentName: string]: NyanCSSReactComponent<Element>
}

export type NyanCSSReactCreateElement<Element> = (
  component: string | Function,
  props: NyanCSSReactProps | null,
  children: any
) => Element
