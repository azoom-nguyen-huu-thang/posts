<template>
  <div class="posts">
    <div class="page-header">
      <h1 class="title">Blog</h1>
      <div class="create-button" @click="toggleCreateForm">
        <span class="title">Create new post</span
        ><svg class="icon" viewBox="0 0 24 24">
          <path
            fill="#fff"
            d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z"
          />
        </svg>
      </div>
    </div>
    <ul class="post-list">
      <transition-group name="slide-in">
        <post-preview
          v-for="post in showingPosts"
          :key="post.id"
          :post="post"
        />
      </transition-group>
    </ul>
    <transition>
      <create-post v-if="showCreateForm" @closeForm="closeForm" />
    </transition>
    <img v-if="loading" class="loading-icon" src="/icons/loading.gif" alt="" />
  </div>
</template>

<script>
import { call, get, commit } from 'vuex-pathify'
import CreatePost from '../../components/CreatePost.vue'
export default {
  components: {
    CreatePost,
  },
  data() {
    return {
      showCreateForm: false,
      loading: false,
      page: 1,
      itemsPerPage: 20,
      totalPage: 1,
    }
  },

  computed: {
    posts: get('posts'),
    showingPosts() {
      return [...this.posts].slice(0, this.page * this.itemsPerPage)
    },
  },
  created() {
    this.getPosts()
  },
  mounted() {
    window.onscroll = (ev) => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.loadMore()
      }
    }
  },
  methods: {
    ...call('*'),
    toggleCreateForm() {
      return (this.showCreateForm = !this.showCreateForm)
    },
    closeForm() {
      this.showCreateForm = false
    },
    loadMore() {
      if (this.page === this.totalPage) return
      this.loading = true
      setTimeout((e) => {
        this.page++
        this.loading = false
      }, 300)
    },
    async getPosts() {
      const posts = await this.fetchPosts()
      this.totalPage = Math.ceil(posts.length / this.itemsPerPage)
      commit('SET_POSTS', posts.reverse())
    },
  },
}
</script>

<style lang="scss" scoped>
.post-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 2.5rem;
  // height: 100vh;
  // overflow-y: scroll;
}

.page-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 3rem 12rem;

  & > .title {
    color: #999;
    font-size: 4rem;
    font-weight: 600;
    margin: 0;
  }
}

.create-button {
  color: #999;
  font-size: 2rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  & > .icon {
    width: 3rem;
    height: 3rem;
  }

  & > .title {
    display: none;
    opacity: 0;
  }

  &:hover {
    color: #fff;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.slide-in {
  &-move {
    transition: opacity 0.5s linear, transform 0.5s ease-in-out;
  }

  &-leave-active {
    transition: opacity 0.4s linear,
      transform 0.4s cubic-bezier(0.5, 0, 0.7, 0.4); //cubic-bezier(.7,0,.7,1);
    transition-delay: calc(0.1s * (var(--total) - var(--i)));
  }

  &-enter-active {
    transition: opacity 0.5s linear,
      transform 0.5s cubic-bezier(0.2, 0.5, 0.1, 1);
    transition-delay: calc(0.1s * var(--i));
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &-enter {
    transform: translateX(-1em);
  }
  &-leave-to {
    transform: translateX(1em);
  }
}

@media only screen and (min-width: 768px) {
  .post-list {
    padding: 0 8rem;
  }

  .create-button {
    & > .icon {
      width: 1.4rem;
      height: 1.4rem;
      margin-left: 0.5rem;
    }
  }

  .create-button {
    & > .title {
      display: inline-block;
      opacity: 1;
    }
  }
}

.loading-icon {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
}

@media only screen and (min-width: 1024px) {
  .post-list {
    padding: 0 10rem;
  }
}

@media only screen and (min-width: 1440px) {
  .post-list {
    padding: 0 20rem;
  }
}

@media only screen and (min-width: 1920px) {
  .post-list {
    padding: 0 30rem;
  }
}
</style>
