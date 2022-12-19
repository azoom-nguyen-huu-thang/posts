<template>
  <div class="post">
    <post-detail :post="post" />
    <h3 class="comment-header">Comments</h3>
    <div class="post-comments">
      <post-comment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </div>
    <div class="back-button" @click="$router.go(-1)">Back</div>
  </div>
</template>

<script>
import { api } from '../../../request'

export default {
  data() {
    return {
      post: { title: '' },
      comments: [],
    }
  },
  async created() {
    const postId = this.$route.params.id
    const [post, comments] = await Promise.all([
      this.fetchPostById(postId),
      this.fetchComments(postId),
    ])
    this.post = post
    this.comments = comments
  },
  methods: {
    fetchPostById(postId) {
      return api.get(`posts/${postId}`).json()
    },
    fetchComments(postId) {
      return api.get(`posts/${postId}/comments`).json()
    },
  },
}
</script>

<style lang="scss" scoped>
.post {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
  width: 17rem;
  margin: 0 auto;
}

.back-button {
  color: #999;
  font-size: 1.5rem;
  position: absolute;
  top: 5%;
  left: 5%;
  cursor: pointer;
  display: none;
  opacity: 0;

  &:hover {
    color: #f5f5f5;
    transition: 0.3s ease-in-out;
  }
}

.post-comments {
  display: flex;
  flex-direction: column;
}

@media only screen and (min-width: 768px) {
  .post {
    width: 35rem;
  }
}

@media only screen and (min-width: 1024px) {
  .post {
    width: 40rem;
  }
}

@media only screen and (min-width: 1440px) {
  .post {
    width: 45rem;
  }
}

@media only screen and (min-width: 1024px) {
  .back-button {
    display: block;
    opacity: 1;
  }
}
</style>
