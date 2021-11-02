export default {
  async getCategories () {
    let urlApiCategory = 'http://blog-management.test:90/api/category'
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    const requestOptions = {
      method: 'GET',
      headers: headers
    }
    let response = await fetch(urlApiCategory, requestOptions)
    let data = await response.json()
    let listCategory = data.data
    let categories = []
    for (let index in listCategory) {
      let item = listCategory[index]
      categories.push({
        id: item.id,
        title: item.title,
        content: item.content
      })
      if (item.child_category.length > 0) {
        for (let child in item.child_category) {
          let itemChild = item.child_category[child]
          categories.push({
            id: itemChild.id,
            title: '\xA0 -- ' + itemChild.title,
            content: itemChild.content
          })
        }
      }
    }
    return categories
  },

  async getParentCategories () {
    let urlApiCategory = 'http://blog-management.test:90/api/category'
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    const requestOptions = {
      // method: 'GET',
      headers: headers
    }
    const response = await fetch(urlApiCategory, requestOptions)
    const data = await response.json()
    let listCategory = data.data
    console.log(data)
    return listCategory
  },

  async addCategory (category) {
    let urlApiCategory = 'http://blog-management.test:90/api/category/add'
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(category)
    }
    const response = await fetch(urlApiCategory, requestOptions)
    const result = await response.json()
    return result
  },

  async getDetailCategory (id) {
    let urlApiCategory = 'http://blog-management.test:90/api/category/edit/' + id
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    const requestOptions = {
      headers: headers
    }
    const response = await fetch(urlApiCategory, requestOptions)
    const data = await response.json()
    let category = data.data
    return category
  },

  async editCategory (category) {
    let urlApiCategory = 'http://blog-management.test:90/api/category/edit/' + category.id
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(category)
    }
    const response = await fetch(urlApiCategory, requestOptions)
    const result = await response.json()
    return result
  },

  async deleteCategory (categoryId) {
    let urlApiCategory = 'http://blog-management.test:90/api/category/delete/' + categoryId
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    const requestOptions = {
      method: 'DELETE',
      headers: headers
    }
    const response = await fetch(urlApiCategory, requestOptions)
    const result = await response.json()
    return result
  },

  async getPosts (page) {
    let urlApiPost = 'http://blog-management.test:90/api/post?page=' + page
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    const requestOptions = {
      headers: headers
    }
    const response = await fetch(urlApiPost, requestOptions)
    const result = await response.json()
    return result
  },

  async addPost (post) {
    const urlApiPost = 'http://blog-management.test:90/api/post/add'
    let headers = {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(post)
    }
    const response = await fetch(urlApiPost, requestOptions)
    const result = await response.json()
    return result
  },

  async getDetailPost (postId) {
    let urlApiPost = 'http://blog-management.test:90/api/post/edit/' + postId
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    const requestOptions = {
      headers: headers
    }
    const response = await fetch(urlApiPost, requestOptions)
    const result = await response.json()
    return result
  },

  async editPost (post) {
    const urlApiPost = 'http://blog-management.test:90/api/post/edit/' + post.id
    let headers = {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(post)
    }
    const response = await fetch(urlApiPost, requestOptions)
    const result = await response.json()
    return result
  },

  async deletePost (postId) {
    const urlApiPost = 'http://blog-management.test:90/api/post/delete/' + postId
    let headers = {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    const requestOptions = {
      method: 'DELETE',
      headers: headers
    }
    const response = await fetch(urlApiPost, requestOptions)
    const result = await response.json()
    return result
  }
}
