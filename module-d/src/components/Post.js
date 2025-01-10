import { Collapse } from "bootstrap";
import { useEffect, useState } from "react";

function pad(string) {
    string = String(string)
    if (string.length == 2) {
        return string
    } else if (string.length == 1) {
        return `0${string}`
    }
}

function Post({ ...props }) {
    console.log(props)

    const [firstPost, setFirstPost] = useState({})
    const [time, setTime] = useState(null) 
    const [mostPopular, setMostPopular] = useState(0) 
    const [mostPopularNumber, setMostPopularNumber] = useState(0) 
  
    useEffect(() => {
        let UTCTime = new Date(props.timestamp)
        console.log()
        setTime(`${UTCTime.getUTCFullYear()}/${pad(String(UTCTime.getUTCMonth() + 1))}/${pad(String(UTCTime.getUTCDate()))} ${UTCTime.getUTCHours() % 12}.${pad(UTCTime.getUTCMinutes())} ${UTCTime.getUTCHours() > 12 ? "PM" : "AM"}`)
        console.log(time)

        if (props.likes.length > 1) {
            props.likes.forEach((username, index ) => {
                const user = props.users.find((u) => u.username == username)

                console.log(user)
                
                if (user.likes > mostPopular) {
                    setMostPopular(index)
                    setMostPopularNumber(user.likes)

                }
            })        
        }  
     
        setFirstPost(props.comments?.shift())
    }, []) 
    
    return (
        <div className="card" style={{ width: "18rem" }}>
            {/* <img src="..." className="card-img-top" alt="..." /> */}
            <div className="card-body">
                <h5 className="card-title">{props.username}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{time}</h6>
                <p className="card-text">{props.content}</p>
                <ul className="list-group list-group-flush">
                {props.comments.length > 0 ? <li className="list-group-item" type="button" data-bs-toggle="collapse" data-bs-target={`#collapsePosts-${props.post_id}`}>{`${firstPost?.username} - ${firstPost?.content}`}</li> : ""}
                  
                    <div className="collapse" id={`collapsePosts-${props.post_id}`}>
                        { props.comments.map((comment) => <li className="list-group-item">{comment.username} - {comment.content}</li>) }
                    </div>
                </ul>
            </div>

        </div>
    )
}

export default Post; 