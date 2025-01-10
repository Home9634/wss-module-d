import { useEffect, useState } from "react";
import { useParams } from "react-router";

function UserProfilePage() {
    let search = useParams();
    let id = search.id

    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    

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

                if (user.username == id) {
                    setUser(user)
                }
            })
            console.log(userData);
            setPosts(tempPosts);
            setUsers(userData)
        }
        fetchData()
    }, [id])
    
    return (
        <div>
        </div>
    )
}

export default UserProfilePage; 