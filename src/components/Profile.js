import React from "react";
import './Profile.css'

function Profile() {
    return(
        <div className="profile">
            <div className="profileframe">
             <div className="profilepic">
                <img src="https://images.pexels.com/photos/17840025/pexels-photo-17840025/free-photo-of-an-orange-with-leaves-on-a-white-plate.jpeg?auto=compress&cs=tinysrgb&w=600" alt="img"/>
            </div>
            <div className="profileinfo">
                <h1>MoonChild</h1>
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
            <img src="https://images.pexels.com/photos/17840025/pexels-photo-17840025/free-photo-of-an-orange-with-leaves-on-a-white-plate.jpeg?auto=compress&cs=tinysrgb&w=600" alt="img"/>
            <img src="https://images.pexels.com/photos/17840025/pexels-photo-17840025/free-photo-of-an-orange-with-leaves-on-a-white-plate.jpeg?auto=compress&cs=tinysrgb&w=600" alt="img"/>
            <img src="https://images.pexels.com/photos/17840025/pexels-photo-17840025/free-photo-of-an-orange-with-leaves-on-a-white-plate.jpeg?auto=compress&cs=tinysrgb&w=600" alt="img"/>
            <img src="https://images.pexels.com/photos/17840025/pexels-photo-17840025/free-photo-of-an-orange-with-leaves-on-a-white-plate.jpeg?auto=compress&cs=tinysrgb&w=600" alt="img"/>
            <img src="https://images.pexels.com/photos/17840025/pexels-photo-17840025/free-photo-of-an-orange-with-leaves-on-a-white-plate.jpeg?auto=compress&cs=tinysrgb&w=600" alt="img"/>
            <img src="https://images.pexels.com/photos/17840025/pexels-photo-17840025/free-photo-of-an-orange-with-leaves-on-a-white-plate.jpeg?auto=compress&cs=tinysrgb&w=600" alt="img"/>
            </div>
        </div>
    )
}

export default Profile;