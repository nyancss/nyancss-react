import { createElement } from 'react'
import generate from '../../generate'

const reactWrapper = generate.bind(null, createElement)
export default reactWrapper
