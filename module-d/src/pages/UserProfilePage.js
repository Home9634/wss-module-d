import { useEffect, useState } from "react";
import { useParams } from "react-router";

function UserProfilePage() {
    let search = useParams();
    let id = search.id

    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    const [degrees, setDegrees] = useState([]);

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

            const friendMapping = {}

            Object.keys(userData.users).forEach(key => {
                const user = userData.users[key]
                friendMapping[user.username] = []

                let likes = 0
                let posts = 0
                let comments = 0
                let friends = []

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

                Object.keys(user.friendRequests).forEach(key => {
                    if (user.friendRequests[key].accepted) {
                        friends.push(user.friendRequests[key].user)
                        friendMapping[user.username].push(user.friendRequests[key].user)
                    }
                })

                Object.keys(userData.users).forEach(key => {
                    let tempUser = userData.users[key]

                    Object.keys(tempUser.friendRequests).forEach(key => {
                        let request = tempUser.friendRequests[key]
                        if (request.accepted && request.user == user.username) {
                            friendMapping[user.username].push(tempUser.username)
                        }
                    })
                })

                userData.users[key].friends = friends

                if (user.username == id) {
                    setUser(user)
                }
            })


            // Get friend circle
            let queue = [[id, 0]]
            let degrees = {}
            let degreesArr = []
            let times = 0

            // console.log(userData);
            setPosts(tempPosts);
            setUsers(userData)
         
            while (queue.length > 0) {
                console.log(times)
                times++
                let current = queue.shift()
                console.log(current)
                if (degrees.hasOwnProperty(current[0])) {
                    console.log(queue)
                    console.log(degrees)
                    continue
                } else {
                    let friends = friendMapping[current[0]]
                    friends.forEach(friend => {
                        if (degrees.hasOwnProperty(friend)) {
                            return
                        }
                        queue.push([friend, current[1] + 1])
                    })
                    if (id != current[0]) {
                        degrees[current[0]] = current[1]
                        degreesArr.push({ user: current[0], degree: `${current[1]} degree` }) 
                    }
                }
            }

            degreesArr = degreesArr.sort((a, b) => {
                if (a.degree > b.degree) {
                    return 1
                } else if (a.degree < b.degree) {
                    return -1
                } else {
                    if (a.user > b.user) {
                        return 1
                    } else if (a.user < b.user) {
                        return -1
                    } else {
                        return 0
                    } 
                }
            })

            Object.keys(userData.users).forEach(key => {
                const user = userData.users[key]
                console.log(user.username)

                if (!degreesArr.some(d => d.user === user.username) && user.username != id) {
                    degreesArr.push({ user: user.username, degree: "Not connected!"}) 
                }
            })

            console.log(degreesArr)
            
            setDegrees(degreesArr)

        }
        fetchData()
    }, [id])

    console.log(degrees)

    return (
        <div>
            <div className="container mt-5 border border-2 rounded-2 p-3">
                <h3>{user.username}</h3>
                <div>Email: {user.email}</div>
                <div>Date Joined: {user.date_joined}</div>

                <div>Posts made: {user.posts}</div>
                <div>Comments made: {user.comments}</div>
                <br />
                <h5>Friend Circle</h5>
                <ul className="list-group mt-4">
                    {
                        degrees.map((degree) => {
                            return <li className="list-group-item">{degree.user} ({degree.degree})</li>
 
                        })
                    }                 
                </ul>
                <br />
            </div>

        </div>



    )
}

export default UserProfilePage; 