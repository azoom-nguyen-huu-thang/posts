/* eslint-disable no-unused-vars */
const Vuex = require('vuex')
const { describe, beforeEach, beforeAll } = require('vue-jest')
const { createLocalVue } = require('@vue/test-utils')

describe('store/pet', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let NuxtStore
  let store
  beforeAll(async () => {
    const storePath = `${process.env.buildDir}/index.js`
    NuxtStore = await import(storePath)
  })
  beforeEach(async () => {
    store = await NuxtStore.createStore()
  })
  // ...
})
