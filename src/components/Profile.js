import React, {useEffect, useState} from "react";
import './Profile.css'
import PostDetails from "./PostDetail";
import ProfilePicture from "./ProfilePicture";

function Profile() {

    var defaultpfp = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"

    const [postpic, setpostpic] = useState([])
    const [show, setShow] = useState(false)
    const [posts, setPosts] = useState([])
    const [changepic, setChangePic] = useState(false)
    const [user, setUser] = useState('')

    useEffect(()=> {
        fetch(`http://localhost:5000/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
            headers:{
                "Authorization": "bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then((result)=> {
            console.log(result)
            setpostpic(result.post)
            setUser(result.user)
            console.log(postpic)
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    },[])

    const togglePost = (posts) => {
        if(show){
            setShow(false)
        }
        else{
            setShow(true)
            setPosts(posts)
        }
    }

    const changeprofile =() => {
        if(changepic){
            setChangePic(false)
        }
        else{
            setChangePic(true)
        }
    }

    return(
        <div className="profile">
            <div className="profileframe">
             <div className="profilepic">
                <img style={{"cursor": "pointer"}}
                onClick={changeprofile}
                src={user.Photo? user.Photo: defaultpfp} alt="img"/>
            </div>
            <div className="profileinfo">
                <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
                <div className="profilestats">
                    <p>{postpic? postpic.length: "0"} posts</p>
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
                {postpic.map((pics)=> {
                    return <img key= {pics._id} src={pics.photo} alt=""
                    onClick={()=> {
                        togglePost(pics)
                    }}/>
                })}
            </div>
            {show && <PostDetails item = {posts} togglePost={togglePost}/>}
            {changepic && <ProfilePicture changeprofile={changeprofile}/>}
        </div>
    )
}

export default Profile;