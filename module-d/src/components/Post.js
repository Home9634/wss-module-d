import { Collapse } from "bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router";

function pad(string) {
    string = String(string)
    if (string.length == 2) {
        return string
    } else if (string.length == 1) {
        return `0${string}`
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function Post({ ...props }) {
    console.log(props)

    const [firstPost, setFirstPost] = useState({})
    const [time, setTime] = useState(null)
    const [mostPopular, setMostPopular] = useState(0)
    const [mostPopularNumber, setMostPopularNumber] = useState(0)
    const [mostPopularList, setMostPopularList] = useState([])

    useEffect(() => {
        let UTCTime = new Date(props.timestamp)
        setTime(`${UTCTime.getUTCFullYear()}/${pad(String(UTCTime.getUTCMonth() + 1))}/${pad(String(UTCTime.getUTCDate()))} ${UTCTime.getUTCHours() % 12}.${pad(UTCTime.getUTCMinutes())} ${UTCTime.getUTCHours() > 12 ? "PM" : "AM"}`)

        if (props.likes.length > 1) {
            props.likes.forEach((username, index) => {
                const user = props.users.find((u) => u.username == username)

                if (user.likes > mostPopularNumber) {
                    setMostPopular(index)
                    setMostPopularNumber(user.likes)
                    setMostPopularList([index])
                } else if (user.likes == mostPopularNumber) {
                    setMostPopularList(mostPopularList.concat(index))
                }
            })

            if (mostPopularList.length > 1) {
                
                let mostLikesList = [...mostPopularList]
                setMostPopularList([]) 
                mostLikesList.forEach((username, index) => {
                    const user = props.users.find((u) => u.username == username)
    
                    if (user.posts > mostPopularNumber) {
                        setMostPopular(index)
                        setMostPopularNumber(user.posts)
                        setMostPopularList([index])
                    } else if (user.posts == mostPopularNumber) {
                        setMostPopularList(mostPopularList.concat(index))
                    }
                })
            }

            if (mostPopularList.length > 1) {
                setMostPopular(mostPopularList[getRandomInt(0, mostPopularList.length - 1)])
            }
        }

        setFirstPost(props.comments[0])
    }, [])

    return (
        <div>
            <div className="card mx-auto" style={{ width: "18rem", marginTop: "75px", marginBottom: "75px"  }}>
                {/* <img src="..." className="card-img-top" alt="..." /> */}
                <div className="card-body">
                    <h5><Link className="card-title" to={`/profile/${props.username}`}>{props.username}</Link></h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{time}</h6>
                    <p className="card-text">{props.content}</p>
                    <ul className="list-group list-group-flush">
                        <p>
                            {props.likes.length > 0 ? props.likes.length > 1 ? `${props.likes[mostPopular]} and ${props.likes.length - 1} other(s) have liked this post` : `${props.likes[0]}` : ''}
                        </p>
                        {/* <p type="button" data-bs-toggle="modal" data-bs-target={`#likesModal-${props.post_id}`}>
                        Launch demo modal
                    </p> */}
                        {firstPost ? <li className="list-group-item" type="button" data-bs-toggle="collapse" data-bs-target={`#collapsePosts-${props.post_id}`}>{`${firstPost?.username} - ${firstPost?.content}`}</li> : ""}

                        <div className="collapse" id={`collapsePosts-${props.post_id}`}>
                            {props.comments.map((comment, index) => {
                                if (index == 0) {
                                    return ''
                                }
                                return <li className="list-group-item">{comment.username} - {comment.content}</li>
                            })}
                        </div>
                    </ul>
                </div>
            </div>
            {/* <div className="modal fade" id={`#likesModal-${props.post_id}`} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>

    )
}

export default Post; 