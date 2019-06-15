import { h } from 'preact'
import generate from '../../generate'
import { NyanCSSReactCreateElement } from '../../types'

const reactWrapper = generate.bind(null, h as NyanCSSReactCreateElement<
  unknown
>)
export default reactWrapper
