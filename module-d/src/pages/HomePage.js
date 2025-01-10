import { useEffect, useState } from "react";
import { Card } from "bootstrap"
import Post from "../components/Post";
 
function HomePage() {

    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const postResponse = await fetch("https://mocki.io/v1/56029e01-f435-4b2c-896d-b5cbaaab4356")
            const postData = await postResponse.json()

            let tempPosts = postData.posts.sort((a, b) => {
                if (a.timestamp > b.timestamp) {
                    return -1
                } else if (a.timestamp < b.timestamp) {
                    return 1
                } else {
                    return 0
                }
            })
            
            console.log(postData)
             
            const userResponse = await fetch("https://mocki.io/v1/2abffcb8-eac4-4021-8a7c-af9aea5e3783") 
            const userData = await userResponse.json()
            
            Object.keys(userData.users).forEach(key => {
                const user = userData.users[key]
                let likes = 0
                let posts = 0
                let comments = 0  
                
                tempPosts.forEach(post => {
                    if (post.username == user.username) {
                        posts++
                        likes += post.likes.length
                    }
                    post.comments.forEach(comment => {
                        if (comment.username == user.username) {
                            comments++
                        }
                    })
                    userData.users[key].likes = likes
                    userData.users[key].posts = posts
                    userData.users[key].comments = comments 
                })
            })
            console.log(userData);
            setPosts(tempPosts);
            setUsers(userData) 
        }
        fetchData()
    }, [])

    return (
        <div>
            { posts.map((post, index) => {
                return <Post {...post} {...users} ></Post>
            } ) }
            Home Page
        </div>
    )
}

export default HomePage; 