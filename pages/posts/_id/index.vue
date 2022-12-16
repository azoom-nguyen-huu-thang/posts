<template>
  <div>
    <div>ID: {{ post.id }}</div>
    <div>
      title:
      {{ post.title }}
    </div>
    <div>
      body:
      {{ post.body }}
    </div>
  </div>
</template>

<script>
import { api } from '../../../request'

export default {
  data() {
    return {
      post: { title: '' },
    }
  },
  async created() {
    const id = this.$route.params.id
    const post = await this.fetchPostById(id)
    console.log(post)
    this.post = post[0]
  },
  methods: {
    fetchPostById(id) {
      return api
        .get('posts', {
          searchParams: {
            id,
          },
        })
        .json()
    },
  },
}
</script>
