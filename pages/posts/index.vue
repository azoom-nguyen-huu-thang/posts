<template>
  <ul class="flex flex-col">
    <li v-for="post in posts" :key="post.id" class="post-preview">
      <nuxt-link :to="`/posts/${post.id}`">
        <span class="title">{{ post.title }}</span>
        <div class="post-time">
          <span class="date">DEC 16</span>
          <span class="reading-time">5 mins</span>
        </div>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
import { call, get } from 'vuex-pathify'
export default {
  computed: {
    ...get('*'),
  },
  async created() {
    // const posts = await this.fetchPosts()
    // commit('SET_POSTS', posts)
  },
  methods: {
    ...call('*'),
  },
}
</script>

<style scoped>
.post-preview {
  margin-bottom: 1rem;
}

.post-preview > .title {
  color: #999;
}

.post-time > .date {
  color: #666;
}

.post-time > .reading-time {
  color: #555;
}
</style>
