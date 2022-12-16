import { make } from 'vuex-pathify'

const pets = [
  ...[...Array(10)].map((_, i) => {
    return {
      id: new Date().getTime() + i,
      name: `Pet ${i}`,
    }
  }),
]

export const state = () => ({
  pets,
})

export const getters = {
  // make all getters (optional)
  ...make.getters(state),

  // add new `filteredItems` getter
  // petsOverFour: (state, getters) => {
  //   return getters.pets.filter((pet) => pet.id > 4)
  // },
}

export const mutations = make.mutations(state)

export const actions = {
  ...make.actions('pets'),
  addNewPet({ dispatch }) {
    return dispatch('setPets', [
      {
        id: new Date().toISOString(),
        name: `Pet ${new Date().getSeconds()}`,
      },
    ])
  },
}
