<template>
  <form class="create-form">
    <h1 class="header">Create a new post</h1>
    <input
      v-model="postTitle"
      class="title-input"
      type="text"
      name="postTitle"
      placeholder="Title"
    />
    <textarea
      v-model="postBody"
      class="body-input"
      type="text"
      name="postBody"
      placeholder="Content"
    />
    <button
      class="submit-button"
      type="submit"
      @click.prevent="
        createNewPost({
          title: postTitle,
          body: postBody,
        })
      "
    >
      Create
    </button>
    <span class="close-button" @click="closeForm()">&times;</span>
  </form>
</template>

<script>
import { call } from 'vuex-pathify'
export default {
  data() {
    return {
      postTitle: '',
      postBody: '',
    }
  },
  methods: {
    createNewPost: call('createNewPost'),
    closeForm() {
      return this.$emit('closeForm')
    },
  },
}
</script>

<style lang="scss" scoped>
.create-form {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 300px;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 5px;

  & > .header {
    text-align: center;
    margin-bottom: 2rem;
  }

  & > .submit-button {
    border-radius: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
    border: none;
    background: #000;
    color: #fff;
    font-weight: 600;
    padding: 1rem 2rem;
    margin-top: 2rem;
    cursor: pointer;
    border: 1px solid #fff;
    transition: 0.2s ease-in-out;

    &:hover {
      color: #000;
      background: #fff;
      border: 1px solid #000;
    }
  }

  & > .close-button {
    font-size: 30px;
    font-weight: bold;
    color: #000;
    cursor: pointer;
    position: absolute;
    top: 5%;
    right: 5%;
  }

  & > .title-input,
  .body-input {
    padding: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 5px;
  }

  & > .body-input {
    min-height: 150px;
  }
}
</style>
