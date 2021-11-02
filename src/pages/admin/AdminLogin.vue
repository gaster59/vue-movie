<template>
  <main class="d-flex w-100">
    <loading :active.sync="isLoading"
        :can-cancel="false"
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
    <div class="container d-flex flex-column">
      <div class="row vh-100">
        <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
          <div class="d-table-cell align-middle">
            <div class="text-center mt-4">
              <h1 class="h2">Welcome back, Charles</h1>
              <p class="lead">Sign in to your account to continue</p>
            </div>

            <div class="card">
              <div class="card-body">
                <div class="m-sm-4">
                  <div class="text-center">
                    <img
                      src="img/avatars/avatar.jpg"
                      alt="Charles Hall"
                      class="img-fluid rounded-circle"
                      width="132"
                      height="132"
                    />
                  </div>
                  <form>
                    <div class="mb-3">
                      <label class="form-label">Email</label>
                      <input
                        class="form-control form-control-lg"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        v-model="email"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Password</label>
                      <input
                        class="form-control form-control-lg"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        v-model="password"
                      />
                      <!-- <small>
                        <a href='index.html'>Forgot password?</a>
                      </small> -->
                    </div>
                    <div>
                      <label class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value="remember-me"
                          name="remember-me"
                          checked=""
                        />
                        <span class="form-check-label">
                          Remember me next time
                        </span>
                      </label>
                    </div>
                    <div class="text-center mt-3">
                      <a
                        href="javascript:void(0)"
                        class="btn btn-lg btn-primary"
                        @click="onSignin"
                        >Sign in</a
                      >
                      <!-- <button type='submit' class='btn btn-lg btn-primary'>Sign in</button> -->
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(Loading)

export default {
  name: 'AdminLogin',
  data: function () {
    return {
      isLoading: false,
      fullPage: true,
      email: '',
      password: '',
      urlLogin: 'http://blog-management.test:90/api/admin/login'
    }
  },
  created () {
    const token = localStorage.getItem('token')
    if (token) {
      this.$router.push({ name: 'admin-movie' })
    }
  },
  methods: {
    onSignin () {
      this.isLoading = true
      let data = {
        email: this.email,
        password: this.password
      }
      fetch(this.urlLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 1) {
            this.isLoading = false
            localStorage.setItem('token', data.result.token)
            localStorage.setItem('username', data.result.name)
            this.$router.push({ name: 'admin-movie' })
          } else {
            alert(data.msg)
          }
        })
    }
  }
}
</script>
