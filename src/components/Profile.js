import React, {useEffect, useState} from "react";
import './Profile.css'

function Profile() {

    const [postpic, setpostpic] = useState([])
    useEffect(()=> {
        fetch("http://localhost:5000/myposts", {
            headers:{
                "Authorization": "bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then((result)=> {
            setpostpic(result)
            console.log(postpic)
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    },[])
    

    return(
        <div className="profile">
            <div className="profileframe">
             <div className="profilepic">
                <img src="https://images.pexels.com/photos/17840025/pexels-photo-17840025/free-photo-of-an-orange-with-leaves-on-a-white-plate.jpeg?auto=compress&cs=tinysrgb&w=600" alt="img"/>
            </div>
            <div className="profileinfo">
                <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
                <div className="profilestats">
                    <p>40 posts</p>
                    <p>40 followers</p>
                    <p>40 following</p>
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
                    return <img key= {pics._id} src={pics.photo} alt=""/>
                })}
            </div>
        </div>
    )
}

export default Profile;