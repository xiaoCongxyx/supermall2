import {
  Add_COUNT,
  ADD_TO_CART
} from './mutation-types'

export default {

    addCart (context, payload) {

      return new Promise((resolve,reject) => {
        // 判断添加的商品是否存在
        const oldPayload = context.state.cartList.find(item => item.iid === payload.iid)

        if (oldPayload) {
          context.commit(Add_COUNT, oldPayload)
          resolve('商品累加1')
        } else {
          payload.count = 1
          context.commit(ADD_TO_CART, payload)
          resolve('商品添加成功')
        }
      })

    }

}
