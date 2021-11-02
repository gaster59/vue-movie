<template>
  <div class="wrapper">
    <Sidebar />
    <div class="main">
      <Nav :username="username" />
      <main class="content">
        <div class="container-fluid p-0">
          <div class="mb-3">
            <h1 class="h3 d-inline align-middle">Add Post</h1>
            <router-link class="badge bg-dark text-white ms-2" to="/admin/post">
              Return to list
            </router-link>
          </div>

          <div class="row">
            <div class="col-12 col-lg-12">
              <form @submit="onSubmit" method="post">
                <div class="card">
                  <div class="m-3 row">
                    <label for="name" class="col-sm-2 col-form-label"
                      >Title</label
                    >
                    <div class="col-sm-10">
                      <input
                        type="text"
                        class="form-control"
                        id="title"
                        name="title"
                        v-model="title"
                      />
                      <div
                        class="alert text-danger"
                        v-if="this.error.title !== ''"
                      >
                        {{ this.error.title }}
                      </div>
                    </div>
                  </div>

                  <div class="m-3 row">
                    <label for="name" class="col-sm-2 col-form-label"
                      >Category</label
                    >
                    <div class="col-sm-10">
                      <select
                        name="parent_id"
                        title="parent_id"
                        v-model="category"
                      >
                        <option
                          v-bind:key="item.id"
                          v-for="item in categories"
                          v-bind:value="item.id"
                        >
                          {{ item.title }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="m-3 row">
                    <label for="content" class="col-sm-2 col-form-label"
                      >Summary</label
                    >
                    <div class="col-sm-10">
                      <vue-ckeditor v-model="summary" />
                      <div
                        class="alert text-danger"
                        v-if="this.error.summary !== ''"
                      >
                        {{ this.error.summary }}
                      </div>
                    </div>
                  </div>

                  <div class="m-3 row">
                    <label for="content" class="col-sm-2 col-form-label"
                      >Content</label
                    >
                    <div class="col-sm-10">
                      <vue-ckeditor v-model="content" />
                      <div
                        class="alert text-danger"
                        v-if="this.error.content !== ''"
                      >
                        {{ this.error.content }}
                      </div>
                    </div>
                  </div>

                  <div class="m-3 row">
                    <label for="content" class="col-sm-2 col-form-label"
                      >Avatar</label
                    >
                    <div class="col-sm-10">
                      <input
                        type="file"
                        accept="image/*"
                        name="avatar"
                        @change="changeAvatar"
                      />
                      <img v-bind:src="avatar" alt="text" class="imgPreview" />
                    </div>
                  </div>

                  <div class="m-3 row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-10">
                      <button type="submit" class="btn btn-success">Add</button>
                      <button type="reset" class="btn btn-success">
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from '../../components/Sidebar'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

import shared from '../../services/shared'

import VueCkeditor from 'vue-ckeditor2'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(Loading)

export default {
  name: 'AdminPostAdd',
  components: {
    Sidebar,
    Nav,
    Footer,
    VueCkeditor,
    shared
  },
  data: function () {
    return {
      isLoading: false,
      fullPage: true,
      username: localStorage.getItem('username'),
      title: '',
      category: '',
      categories: [],
      summary: '',
      content: '',
      avatar: '',
      error: {
        title: '',
        category: '',
        summary: '',
        content: '',
        avatar: ''
      }
    }
  },
  async created () {
    this.isLoading = true
    let categories = await shared.getCategories()
    this.categories = categories
    this.category = categories[0].id
    this.isLoading = false
  },
  methods: {
    changeAvatar (evt) {
      let target = evt.target.files[0]
      var reader = new FileReader()
      reader.onloadend = async (e) => {
        this.avatar = await e.target.result
      }
      reader.readAsDataURL(target) // convert to base64 string
    },
    async onSubmit (evt) {
      evt.preventDefault()
      this.isLoading = true
      const post = {
        title: this.title,
        category_id: this.category,
        summary: this.summary,
        content: this.content,
        avatar: this.avatar
      }
      let result = await shared.addPost(post)
      console.log(result)
      this.isLoading = false
    }
  }
}
</script>

<style>
.imgPreview {
  width: 100px;
  height: 100px;
}
</style>
