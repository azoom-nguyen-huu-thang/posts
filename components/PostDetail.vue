<template>
  <div class="post-detail">
    <h1 class="title">{{ post.title }}</h1>
    <div class="post-time">
      <span class="date">Dec 16 <span> &#x2022;</span></span>
      <span class="reading-time">5 mins</span>
    </div>
    <p class="content">
      {{ post.body }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => {
        return { title: '', body: '' }
      },
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.post-detail {
  & > .title {
    color: #999;
    font-size: 3rem;
    font-weight: 600;
  }

  & > .content {
    color: #ededed;
    font-size: 1.1rem;
    line-height: 2rem;
  }
}

.post-time {
  margin: 2rem 0;

  & > .date,
  .reading-time {
    color: #666;
    font-size: 1.4rem;
    transition: 0.3s ease-in-out;
  }
}
</style>
