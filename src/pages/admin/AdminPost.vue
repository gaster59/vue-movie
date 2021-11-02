<template>
  <div class="wrapper">
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <Sidebar />
    <div class="main">
      <Nav :username="username" />

      <main class="content">
        <div class="container-fluid p-0">
          <div class="row">
            <div class="col-12">
              <div class="card flex-fill">
                <div class="card-header">
                  <div class="row">
                    <div class="col-6">
                      <span class="card-title mb-0">List Post</span>
                    </div>
                    <div class="col-6 d-flex flex-row-reverse bd-highlight">
                      <router-link to="/admin/post/add" class="btn btn-success">
                        Add post
                      </router-link>
                    </div>
                  </div>
                </div>
                <table class="table table-hover my-0">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Author</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-bind:key="item.id" v-for="item in posts">
                      <td>{{ item.id }}</td>
                      <td>{{ item.title }}</td>
                      <td>{{ item.user.name }}</td>
                      <td>
                        <router-link
                          :to="`/admin/post/edit/${item.id}`"
                          class="btn btn-success"
                        >
                          Edit
                        </router-link>
                        <a class="btn btn-success" @click="deletePost(item.id)">
                          Delete
                        </a>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot v-if="totalPage > 1">
                    <tr>
                      <td colspan="4">
                          <paginate
                            :page-count="totalPage"
                            :page-range="3"
                            :margin-pages="2"
                            :click-handler="pageHanlder"
                            :prev-text="'Prev'"
                            :next-text="'Next'"
                            :container-class="'pagination'"
                            :hide-prev-next="true"
                            :page-class="'page-item'"
                            :prev-link-class="'page-link'"
                            :next-link-class="'page-link'"
                            :page-link-class="'page-link'"
                          >
                          </paginate>
                      </td>
                    </tr>
                  </tfoot>
                </table>

                <!-- <div class="d-flex justify-content-center pt-3">
                  <nav aria-label="Page navigation example">
                    <paginate
                      :page-count="totalPage"
                      :page-range="3"
                      :margin-pages="2"
                      :click-handler="pageHanlder"
                      :prev-text="'Prev'"
                      :next-text="'Next'"
                      :container-class="'pagination'"
                      :hide-prev-next="true"
                      :page-class="'page-item'"
                      :prev-link-class="'page-link'"
                      :next-link-class="'page-link'"
                      :page-link-class="'page-link'"
                    >
                    </paginate>
                  </nav>
                </div> -->
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

import 'bootstrap/dist/css/bootstrap.min.css'
import shared from '../../services/shared'

import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate)

Vue.use(Loading)

export default {
  name: 'AdminPost',
  components: {
    Sidebar,
    Nav,
    Footer,
    Loading
  },
  data: function () {
    return {
      posts: [],
      username: localStorage.getItem('username'),
      totalPage: 0,
      isLoading: false,
      fullPage: true
    }
  },
  async created () {
    this.isLoading = true
    const result = await shared.getPosts(1)
    this.posts = result.data
    this.totalPage = result.totalPage
    this.isLoading = false
  },
  methods: {
    async pageHanlder (currentPage) {
      console.log(currentPage)
      this.isLoading = true
      const result = await shared.getPosts(currentPage)
      this.posts = result.data
      this.totalPage = result.totalPage
      this.isLoading = false
    },
    async deletePost (postId) {
      this.isLoading = true
      const deletePost = await shared.deletePost(postId)
      if (deletePost.status === 1) {
        const result = await shared.getPosts(1)
        this.posts = result.data
        this.totalPage = result.totalPage
      }
      this.isLoading = false
    },
    onCancel () {
      console.log('Cancel loading')
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
}
</style>
