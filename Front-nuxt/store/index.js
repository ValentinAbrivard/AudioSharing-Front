export const state = () => ({
  online: false,
  id: '',
  email: '',
  token: '',
  room: '',
  actual: '',
  live: '',
})

export const mutations = {
  addUser(state, object) {
    state.online = true
    state.id = object.id
    state.email = object.email
    state.token = object.token
    state.room = object.room
    state.live = object.live
  },
  deleteUser(state) {
    state.online = false
    state.id = ''
    state.email = ''
    state.token = ''
    state.room = ''
    state.actual = ''
    state.live = false
  },
  changeToken(state, object) {
    state.token = object.token
    state.actual = object.id
  },
  changepayload(state, object) {
    state.online = true
    state.id = object.id
    state.email = object.email
    state.token = object.token
    state.room = object.room
    state.live = object.live
  },
}

export const getters = {
  getUser: (state) => {
    return state
  },
}
