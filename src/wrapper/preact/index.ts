import { createElement } from 'preact'
import generate from '../../generate'

const reactWrapper = generate.bind(null, createElement)
export default reactWrapper
