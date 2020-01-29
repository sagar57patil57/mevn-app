<template>
  <div>
    <div>
        <input type="text" v-model="text" placeholder="add post">
        <button @click="createPost">Add</button>
    </div>
    <div v-for="(post, index) in posts" v-bind:key="post._id">
        <br>
        <div class="post">
            <button style="float: right" @click="deletePost(post._id, index)">Delete</button>
            <p style="float: right">{{ post.createdAt }}</p>
            <p class="text">{{ post.text }}</p>
        </div>
    </div>
    

    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import PostService from './Services/posts'
export default {
  data () {
    return {
        posts: [],
        error: '',
        text: ''
    }
  },

    methods: {
        async createPost() {
            const post = {
                text :  this.text,
                createdAt : new Date()
            }
            try{
                await PostService.insertPosts(post)
            } catch(err) {
                this.error = err.message
            }
            this.posts.push(post)
        },

        async deletePost(id, index) {
            try{
                await PostService.deletePost(id)
            } catch(err) {
                this.error = err.message
            }
            this.posts.splice(index, 1)
            console.log(this.posts, index)
        }
    },

  async created() {
      try{
          this.posts = await PostService.getPosts()
      } catch(err) {
          this.error = err.message
      }
  }
}
</script>

<style scoped>

    .post{
        background-color:rgb(165, 235, 85);
        border: 1px solid gray;
    }

    .text{
        margin-left: 10px;
    }

</style>
