import axios from 'axios'
const url = 'http://localhost:5000/api/posts'

class PostService {
    
    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try{
                let res = await axios.get(url)
                resolve(res.data)
            } catch(err) {
                reject(err)
            }
        })
    }

    static insertPosts(data) {
        return axios.post(url, data)
    }

    static deletePost(postid) {
        return axios.delete(url + '/' + postid)
    }

}

export default PostService