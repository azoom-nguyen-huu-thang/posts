import { make } from 'vuex-pathify'
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
  async fetchPosts({ options }) {
    const posts = await api.get('posts').json()
    return posts
  },
}
