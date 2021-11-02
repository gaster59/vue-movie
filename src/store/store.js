import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

export default new vuex.Store({
  state: {
    count: 10,
    text: 'a'
  },
  getters: {

  },
  mutations: {
    increase (state) {
      state.count++
    },
    decrease (state) {
      state.count--
      state.text = '2323'
    }
  },
  actions: {
    increase ({commit}) {
      commit('increase')
    },
    decreaseInt ({commit}) {
      commit('decrease')
    }
  }
})
