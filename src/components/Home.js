import {React, useEffect, useState} from "react";
import './Home.css'
import { json, useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate()
    const [data, setData] = useState([])

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

    return(
        <div className="home">
            {data.map((posts)=>{
                return (
                    <>
                    <div className="card">
                        <div className="card-header">
                            <div className="cardpic">
                                <img src="https://images.pexels.com/photos/17895979/pexels-photo-17895979/free-photo-of-butterfly-on-flower.jpeg?auto=compress&cs=tinysrgb&w=600" alt=""/>
                            </div>
                        <h5>{posts.postedBy.name}</h5>
                        </div>
                        <div className="cardimage">
                            <img src={posts.photo} alt=""/>
                        </div>
                        <div className="cardcontent">
                            {
                                posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id)?
                                (<span className="material-symbols-outlined material-symbols-outlined-red" onClick={() => dislikepost(posts._id)}>favorite</span>)
                                :
                                (<span className="material-symbols-outlined" onClick={() => likepost(posts._id)}>favorite</span>)
                            }
                        <p><b>{posts.likes.length} Likes</b></p>
                        <p>{posts.body}</p>
                        </div>
                        <div className="addcomment">
                        <span class="material-symbols-outlined">sentiment_very_satisfied</span>
                        <input type="text" placeholder="add a comment"/>
                        <button className="commentbtn">Post</button>
                        </div>
                    </div>
                    </>
                )
            })}
        </div>
    )
}

export default Home;