import React, {useEffect, useState} from "react";
import './Profile.css'
import { useParams } from "react-router-dom";

function UserProfile() {

    var defaultpfp = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"

    const {id} = useParams() 
    const [user, setUser] = useState("")
    const [posts, setPosts] = useState([])
    const [isfollowing, setIsfollowing] = useState(false)

    const followuser = (userId) => {
        fetch("http://localhost:5000/follow", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + localStorage.getItem("jwt"),
              },
            body: JSON.stringify({
                followId: userId
            })
        })
        .then((res) => res.json())
          .then((result) => {
            console.log(result);
            setIsfollowing(true)
          });
    }

    const unfollowuser = (userId) => {
        fetch("http://localhost:5000/unfollow", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + localStorage.getItem("jwt"),
              },
            body: JSON.stringify({
                followId: userId
            })
        })
        .then((res) => res.json())
          .then((result) => {
            console.log(result);
            setIsfollowing(false)
          });
    }

    useEffect(() => {
        fetch(`http://localhost:5000/user/${id}`, {
          headers: {
            Authorization: "bearer " + localStorage.getItem("jwt"),
          },
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            setUser(result.user);
            setPosts(result.post);
            if(result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id)){
                setIsfollowing(true)
            }
          });
      }, [isfollowing]);
    
    return(
        <div className="profile">
            <div className="profileframe">
             <div className="profilepic">
                <img src={user.Photo? user.Photo: defaultpfp} alt=""/>
            </div>
            <div className="profileinfo" >
                <div style={{display:'flex', alignItems:"center"}}>
                    <h1>{user.name}</h1>
                <button className="followbtn" onClick={()=> {
                    if(isfollowing){
                        unfollowuser(user._id)
                    }
                    else{
                        followuser(user._id)
                    }
                }}>
                    {isfollowing ? "Unfollow": "Follow"}
                </button>
                </div>
                <div className="profilestats">
                    <p>{posts.length} posts</p>
                    <p>{user.followers? user.followers.length: "0"} followers</p>
                    <p>{user.following? user.following.length: "0"} following</p>
                </div>
            </div>   
            </div>
            <hr
                style={{
                width: "90%",
                opacity: "0.8",
                margin: "25px auto",
                }}
            />
            <div className="gallery">
                {posts.map((pics) => {
                return (
                    <img
                    key={pics._id}
                    src={pics.photo}
                    // onClick={() => {
                    //     toggleDetails(pics)
                    // }}
                    className="item"
                    alt=""
                    ></img>
                );
                })}
            </div>
            {/* {show && <PostDetails item = {posts} togglePost={togglePost}/>} */}
        </div>
    )
}

export default UserProfile;