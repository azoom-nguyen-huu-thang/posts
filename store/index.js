import { commit, make } from 'vuex-pathify'
import { api } from '../request'
import pathify from './pathify'

export const plugins = [pathify.plugin]

export const state = () => ({
  posts: [],
})

export const getters = {}

export const mutations = {
  ...make.mutations(state),
}

export const actions = {
  async fetchPosts({ state }, options) {
    const posts = await api.get('posts').json()
    return posts
  },
  async createNewPost({ state }, post) {
    const posts = state.posts
    await api
      .post('posts', {
        json: post,
      })
      .json()
    const newPost = {
      ...post,
      id:
        posts.find(
          (post) => post.id === Math.max(...posts.map((post) => post.id))
        ).id + 1,
    }
    commit('SET_POSTS', [newPost, ...state.posts])
    return newPost
  },
}
