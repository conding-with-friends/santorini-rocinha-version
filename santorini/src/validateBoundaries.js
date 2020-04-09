import { boundariesError } from './errors'
import { X_MAX, Y_MAX } from './config'

export default function validateBoundaries ({ x, y }) {
  if (x > X_MAX || y > Y_MAX || x < 0 || y < 0) {
    throw boundariesError
  }
}
