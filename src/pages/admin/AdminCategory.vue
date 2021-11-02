<template>
  <div class="wrapper">

    <loading :active.sync="isLoading"
        :can-cancel="false"
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>

    <Sidebar />
    <div class="main">
      <Nav username='aaaa' />

      <main class="content">
        <div class="container-fluid p-0">
          <div class="row">
            <div class="col-12">
              <div class="card flex-fill">
                <div class="card-header">
                  <div class="row">
                    <div class="col-6">
                      <span class="card-title mb-0">List Categories</span>
                    </div>
                    <div class="col-6 d-flex flex-row-reverse bd-highlight">
                      <router-link
                        to="/admin/category/add"
                        class="btn btn-success"
                      >
                        Add category
                      </router-link>
                    </div>
                  </div>
                </div>
                <table class="table table-hover my-0">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Content</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-bind:key="item.id" v-for="item in categories">
                      <td>{{ item.title }}</td>
                      <td v-html="item.content"></td>
                      <td>
                        <router-link
                          :to="`/admin/category/edit/${item.id}`"
                          class="btn btn-success"
                        >
                          Edit
                        </router-link>
                        <a class="btn btn-success" @click="deleteCategory(item.id)">
                          Delete
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  </div>
</template>

<script>
import Sidebar from '../../components/Sidebar'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

import shared from '../../services/shared'

import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(Loading)

export default {
  name: 'AdminCategory',
  components: {
    Sidebar,
    Nav,
    Footer,
    Loading
  },
  data: function () {
    return {
      url: 'http://blog-management.test:90/api/category',
      categories: [],
      isLoading: false,
      fullPage: true
    }
  },
  async created () {
    this.isLoading = true
    let categories = await shared.getCategories()
    this.categories = categories
    this.isLoading = false
  },
  methods: {
    async deleteCategory (categoryId) {
      this.isLoading = true
      await shared.deleteCategory(categoryId)
      let categories = await shared.getCategories()
      this.categories = categories
      this.isLoading = false
    },
    onCancel () {
      console.log('Cancel loading')
    }
  }
}
</script>
