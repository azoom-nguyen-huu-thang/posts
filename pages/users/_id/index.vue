<template>
  <div>
    <h1>header</h1>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
    <ul>
      <li v-for="pet in pets" :key="pet.id">{{ pet.name }}</li>
    </ul>
    <button @click="addNewPet">Add new pet</button>
    <button @click="addRandomPet">Add random Pet</button>
  </div>
</template>

<script>
import { call, get, sync } from 'vuex-pathify'
export default {
  computed: {
    ...get('*'),
    ...sync('pet/*'),
  },
  methods: {
    ...call('pet/*'),
    addRandomPet() {
      this.pets = [
        ...this.pets,
        {
          id: new Date().toISOString(),
          name: `Pet ${new Date().getSeconds()}`,
        },
      ]
    },
  },
}
</script>
