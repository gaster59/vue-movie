<template>
  <div class='wrapper'>
    <Sidebar />
    <div class='main'>
      <Nav />

      <main class='content'>
        <div class='container-fluid p-0'>
          <h1 class='h3 mb-3'>Blank Page</h1>

          <div class='row'>
            <div class='col-12'>
              <div class='card'>
                <div class='card-header'>
                  <h5 class='card-title mb-0'>Empty card</h5>
                </div>
                <div class='card-body'></div>
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
  name: 'AdminBlank',
  components: {
    Sidebar,
    Nav,
    Footer
  }
}
</script>
