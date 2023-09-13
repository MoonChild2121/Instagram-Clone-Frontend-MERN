import {React, useEffect, useState} from "react";
import './Home.css'
import { Link, useNavigate } from "react-router-dom";

function Home() {

    var defaultpfp = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"

    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [comment, setComment] = useState("")
    const [show, setShow]= useState(false)
    const [item, setItem] = useState([])

    useEffect(()=> {
        const token = localStorage.getItem("jwt")
        if(!token){
            navigate('/signup')
        }

        fetch("http://localhost:5000/posts", {
            method: "get",
                headers: {
                    "content-Type": "application/json",
                    "Authorization": "bearer " + localStorage.getItem("jwt")
                }
        }).then(res=> res.json())
        .then(result => setData(result))
        .catch(err=> console.log(err))
    },[])

    const likepost = (postId) => {
        fetch("http://localhost:5000/like", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: postId
            })
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
            const newdata = data.map((posts)=>{
                if(posts._id === result._id){
                    return result
                }
                else{
                    return posts
                }
            })
            setData(newdata)
        })
        .catch(error => {
            console.error("Error liking post:", error);
        });
    }

    const dislikepost = (postId) => {
        fetch("http://localhost:5000/dislike", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: postId
            })
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
            const newdata = data.map((posts)=>{
                if(posts._id === result._id){
                    return result
                }
                else{
                    return posts
                }
            })
            setData(newdata)
        })
        .catch(error => {
            console.error("Error disliking post:", error);
        });
    }
    
    const makecomment = (text, id) => {
        console.log(comment)
        fetch("http://localhost:5000/comment", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                text: text,
                postId: id
            })
        })
        .then(res => res.json())
        .then(result => {
            setComment("")
            console.log(result);
            const newdata = data.map((posts)=>{
                if(posts._id === result._id){
                    return result
                }
                else{
                    return posts
                }
            })
            setData(newdata)
        })
        .catch(error => {
            console.error("Error commenting on post:", error);
        });
    }
    // show and hide comments
    const toggleComment = (posts) => {
        if(show){
            setShow(false)
        }
        else{
            setShow(true)
            setItem(posts)
        }
    }


    return(
        <div className="home">
            {data.map((posts)=>{
                return (
                    <>
                    <div key={posts._id} className="card">
                        <div className="card-header">
                            <div className="cardpic">
                                <img src={posts.postedBy.Photo? posts.postedBy.Photo: defaultpfp} alt=""/>
                            </div>
                        <h5><Link to={`./profile/${posts.postedBy._id}`}>{posts.postedBy.name}</Link></h5> 
                        </div>
                        <div className="cardimage">
                            <img src={posts.photo} alt=""/>
                        </div>
                        <div className="cardcontent">
                        <span
                            className={
                                posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id)
                                    ? "material-symbols-outlined material-symbols-outlined-red"
                                    : "material-symbols-outlined"
                            }
                            onClick={() => {
                                posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id)
                                    ? dislikepost(posts._id)
                                    : likepost(posts._id);
                            }}
                        >
                            favorite
                        </span>

                        <p><b>{posts.likes.length} Likes</b></p>
                        <p>{posts.body}</p>
                        <p style={{fontWeight: "bold", cursor: "pointer", color: "grey"}} onClick={()=>{toggleComment(posts)}}>
                            View all comments</p>
                        </div>
                        <div className="addcomment">
                        <span className="material-symbols-outlined">sentiment_very_satisfied</span>
                        <input type="text" placeholder="add a comment" value={comment} 
                        onChange={(e)=>{setComment(e.target.value)}}/>
                        <button className="commentbtn" onClick={() => makecomment(comment, posts._id)}>Post</button>
                        </div>
                    </div>
                    </>
                )
            })}
            {/* comments */}
            { show && (
                <div className="showcomment">
                <div className="container">
                    <div className="postpic">
                        <img src={item.photo} alt=""/>
                    </div>
                    <div className="commentdetails">
                        <div className="card-header" style={{borderBottom: "1px solid grey"}}>
                            <div className="cardpic">
                                <img src="https://images.pexels.com/photos/17895979/pexels-photo-17895979/free-photo-of-butterfly-on-flower.jpeg?auto=compress&cs=tinysrgb&w=600" alt=""/>
                            </div>
                        <h5>{item.postedBy.name}</h5>
                        </div>
                        {/* comment section */}
                        <div className="commentssection" style={{borderBottom: "1px solid grey"}}>
                            {item.comments.map((comment)=>{
                                return (<p className="comm">
                                <b><span className="commenter">{comment.postedBy.name} </span></b>
                                <span className="commentText">{comment.comment}</span>
                            </p>)
                            })}
                            
                        </div>
                        <div className="cardcontent">
                        <p><b>{item.likes.length} Likes</b></p>
                        <p>{item.body}</p>
                        </div>
                        <div className="addcomment">
                        <span className="material-symbols-outlined">sentiment_very_satisfied</span>
                        <input type="text" placeholder="add a comment" value={comment} 
                        onChange={(e)=>{setComment(e.target.value)}}/>
                        <button className="commentbtn" 
                        onClick={()=>{
                            makecomment(comment, item._id)
                            toggleComment()
                        }} >Post</button>
                        </div>
                    </div>
                </div>
                <div className="closecomment" onClick={()=> {toggleComment()}}>
                <span className="material-symbols-outlined material-symbols-outlined-comment">close</span>
                </div>
            </div>)
            }
            
        </div>
    )
}

export default Home;