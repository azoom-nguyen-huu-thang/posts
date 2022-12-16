<template>
  <div>
    <form
      ref="imgForm"
      accept="image/jpeg, image/png, image/webp"
      multiple
      enctype="multipart/form-data"
      @submit.prevent="postImage()"
    >
      <input ref="fileInput" type="file" />
      <button type="submit">Submit</button>
      <div class="preview">
        <img :src="previewImage" alt="" />
      </div>
    </form>
    <div v-if="imgUrl">
      <input ref="imgInputUrl" v-model="imgUrl" type="text" readonly />
      <button @click="copyToClipboard">Copy to clipboard</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPage',
  data() {
    return {
      previewImage: null,
      form: {
        image: null,
        name: null,
      },
      imgUrl: null,
    }
  },
  methods: {
    async postImage() {
      try {
        const image = this.$refs.fileInput.files[0]
        this.showPreviewImage(image)
        const formData = this.buildFormData(image)
        const { data } = await this.$axios.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        console.log(data)

        this.imgUrl = `${window.location.href}images/${data.file.name}`
      } catch (error) {
        console.error(error)
      }
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.imgUrl)
    },
    buildFormData(image) {
      const formData = new FormData()
      this.form.image = image
      this.form.name = image.name
      Object.keys(this.form).forEach((key) => {
        formData.append(key, this.form[key])
      })
      return formData
    },
    showPreviewImage(image) {
      try {
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = (e) => {
          this.previewImage = e.target.result
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
