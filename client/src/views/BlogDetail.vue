<template>
    <div class="blog-detail-wrapper">
        
        <Blog :article="article"/>

        <div class="comments">
            
            <CommentInput @addComment="addComment($event)" :username="status.username"/>
            <Comment v-for="(comment, index) in article.comments" 
            :text="comment.text" :key="index"
            :username="comment.username" :date="comment.date"
            />
            
            
        </div>
        
    </div>

</template>

<script>
import CommentInput from '@/components/CommentInput.vue'
import Comment from '@/components/Comment.vue'
import Blog from '@/components/Blog.vue'
import {mapState} from 'vuex'


export default {
    components: {
        CommentInput,
        Comment,
        Blog
    },

    data(){
        return {
            article: {
                _id: '',
                title: '',
                text: '',
                writer: '',
                date: '',
                comments: []
            },

            
        }
    },
    
    computed: {
        ...mapState([
            'status'
        ])
    },

    methods: {
        fetchBlogPost () {
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization",
                    "Access-Control-Allow-Credentials": "true"
                },
                body: JSON.stringify({ 
                    "session": this.$cookie.get('token'),
                    "article": {
                        "id": this.$route.params.id
                    }
                    })
            }

            var response = fetch('http://localhost:1337/article/read', requestOptions)
            .then(res => {
                return res.json()
            })
                .then (json => {
                if(json.article) {
                    this.article = json.article
                }
                else {
                    console.log(json.error);
                }
            
            })
            .catch (error => console.error(error))
        },

        addComment (comment) {
            this.article.comments.unshift(comment)
            console.log(comment)
        }
    },

    beforeMount() {
        this.fetchBlogPost()
    }
}
</script>
