<template>
  <div class="post-comment">
    <div class="post-info">
      <img
        class="avatar"
        src="https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg"
        alt=""
      />
      <div class="email">{{ comment.email }}</div>
    </div>
    <p class="content">{{ comment.body }}</p>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      default: () => {
        return { email: '', body: '' }
      },
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.post-comment {
  color: #999;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid #333;

  & > .content {
    color: #fff;
  }
}

.post-info {
  display: flex;
  align-items: center;

  & > .avatar {
    border-radius: 100%;
    width: 30px;
    height: 30px;
    margin-right: 0.6rem;
  }
}

.comment-header {
  color: #f5f5f5;
  font-size: 1.5rem;
  margin-top: 5rem;
}
</style>
