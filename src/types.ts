export type NyanCSSReactProps = { [key: string]: any } & {
  tag?: string
  className?: string
  children?: any
}

export type NyanCSSReactComponent<Element> = (
  props: NyanCSSReactProps
) => Element

export type NyanCSSReactExports<Element> = {
  [componentName: string]: NyanCSSReactComponent<Element>
}

export type NyanCSSReactCreateElement<Element> = (
  tag: string,
  props: NyanCSSReactProps,
  ...children: any[]
) => Element
