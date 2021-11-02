<template>
  <div class="wrapper">
    <Sidebar />
    <div class="main">
      <Nav />

      <main class="content">
        <div class="container-fluid p-0">
          <h1 class="h3 mb-3">Movie Page</h1>

          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h5 class="card-title mb-0">Search movie</h5>
                </div>
                <div class="card-body">
                  <div class="mb-3">
                    <label for="title" class="form-label">Email address</label>
                    <input
                      type="email"
                      class="form-control"
                      id="title"
                      v-model="title"
                    />
                    <p class="text-danger" v-show="!!this.error.title">
                      A simple danger alert—check it out!
                    </p>
                  </div>
                  <div class="mb-3">
                    <button @click="searchFilm" class="btn btn-primary">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row" v-if="this.film">
            <div class="col-12 col-md-12">
              <div class="card detail-movie">
                <img
                  class="card-img-top"
                  v-bind:src="this.film.Poster"
                  v-bind:alt="this.film.Title"
                />
                <div class="card-header">
                  <h5 class="card-title mb-0">{{ this.film.Title }}</h5>
                </div>
                <div class="card-body">
                  <p class="card-text">{{ this.film.Plot }}</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
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

export default {
  name: 'AdminMovie',
  components: {
    Sidebar,
    Nav,
    Footer
  },
  data () {
    return {
      title: '',
      error: {
        title: ''
      },
      film: ''
    }
  },
  methods: {
    async searchFilm () {
      this.film = ''
      if (!this.title) {
        this.error.title = 'Please enter title film'
        return
      }
      this.error.title = ''
      const response = await fetch(
        'http://www.omdbapi.com/?apikey=a68b1450&t=' + this.title + '&page=10'
      )
      const data = await response.json()
      console.log(data)
      if (data.Response === 'False') {
        alert(data.Error)
        return
      }
      this.film = data
    }
  }
}
</script>

<style scoped>
.detail-movie {
  padding: 20px;
}
.card-img-top {
  width: 100px;
  height: 100px;
}
</style>
