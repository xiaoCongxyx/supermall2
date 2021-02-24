import {
  Add_COUNT,
  ADD_TO_CART
} from './mutation-types'

export default {
    [Add_COUNT](state,oldPayload) {
      oldPayload.count += 1
    },
    [ADD_TO_CART] (state, payload) {
      payload.checked = true
      state.cartList.push(payload)
    }
}
