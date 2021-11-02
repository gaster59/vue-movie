<template>
  <div class="wrapper">
    <Sidebar />
    <div class="main">
      <Nav />
      <main class="content">
        <div class="container-fluid p-0">
          <div class="mb-3">
            <h1 class="h3 d-inline align-middle">Edit Category</h1>
            <router-link
              class="badge bg-dark text-white ms-2"
              to="/admin/category"
            >
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
                    <div class="col-sm-2"></div>
                    <div class="col-sm-10">
                      <button type="submit" class="btn btn-success">Edit</button>
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

import VueCkeditor from 'vue-ckeditor2'
import shared from '../../services/shared'

export default {
  name: 'AdminCategoryEdit',
  components: {
    Sidebar,
    Nav,
    Footer,
    VueCkeditor,
    shared
  },
  async created () {
    const categories = await shared.getParentCategories()
    this.categories = categories
    const categoryId = this.$route.params.id
    const detailCategory = await shared.getDetailCategory(categoryId)
    console.log(detailCategory)
    this.title = detailCategory.title
    this.category = detailCategory.parent_id
    this.content = detailCategory.content
  },
  data () {
    return {
      url: 'http://blog-management.test:90/api/category',
      title: '',
      category: '',
      categories: [],
      content: '',
      error: {
        title: '',
        category: '',
        content: ''
      }
    }
  },
  methods: {
    async onSubmit (evt) {
      evt.preventDefault()
      let initError = {
        title: '',
        category: '',
        content: ''
      }
      this.error = initError
      if (this.title === '') {
        this.error.title = 'Please input title'
      }
      if (this.content === '') {
        this.error.content = 'Please input content'
      }
      const category = {
        id: this.$route.params.id,
        title: this.title,
        category: this.category,
        content: this.content
      }
      const result = await shared.editCategory(category)
      if (result.status === 1) {
        alert(result.msg)
        this.$router.push({ name: 'admin-category' })
      }
    }
  }
}
</script>
