import React from "react";
import { useNavigate } from "react-router-dom";
import { CustomDeleteIcon } from "./CustomDeleteIcon";


export default function PostDetails({item, togglePost}){
    const navigate = useNavigate()
    const removePost = (postId) => {
        if (window.confirm("Do you really want to delete this post ?")) {
            fetch(`http://localhost:5000/deletePost/${postId}`, {
                method: "delete",
                headers: {
                    Authorization: "bearer " + localStorage.getItem("jwt"),
                },
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((result) => {
                if (result.message === "Successfully deleted") {
                    console.log(result.message);
                    togglePost();
                    navigate("/");
                } else {
                    console.error("Failed to delete post:", result.message);
                }
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
        }
    };
    
    

    return (
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
                        <CustomDeleteIcon onClick={() => removePost(item._id)} />
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
                        <input type="text" placeholder="add a comment"/>
                        <button className="commentbtn">Post</button>
                        </div>
                    </div>
                </div>
                <div className="closecomment" 
                onClick={()=> {togglePost()}}
                >
                <span className="material-symbols-outlined material-symbols-outlined-comment">close</span>
                </div>
            </div>)
}