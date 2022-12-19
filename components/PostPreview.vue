<template>
  <li class="post-preview">
    <nuxt-link class="post-info" :to="`/posts/${post.id}`">
      <span class="title">{{ post.title }}</span>
      <div class="post-time">
        <span class="date">Dec 16 <span> &#x2022;</span></span>
        <span class="reading-time">{{ getRandomInt(9) }} mins</span>
      </div>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => {
        return { title: '', id: 0 }
      },
      required: true,
    },
  },
  methods: {
    getRandomInt(max) {
      return Math.floor(Math.random() * max) + 1
    },
  },
}
</script>

<style lang="scss" scoped>
.post-preview {
  margin-bottom: 3rem;
  cursor: pointer;

  &:hover {
    .post-info {
      > .title {
        color: #fff;
      }
    }

    .post-time {
      & > .date {
        color: #888;
      }

      & > .reading-time {
        color: #777;
      }
    }
  }
}

.post-info {
  & > .title {
    color: #999;
    font-size: 1.4rem;
    font-weight: 500;
    transition: 0.3s ease-in-out;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.post-time {
  margin-top: 0.3rem;

  & > .date {
    color: #666;
    transition: 0.3s ease-in-out;
  }

  & > .reading-time {
    color: #555;
    font-size: 0.9rem;
    transition: 0.3s ease-in-out;
  }
}
</style>
