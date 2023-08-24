import React from "react";
import './Home.css'

function Home() {
    return(
        <div className="home">
            <div className="card">
                <div className="card-header">
                    <div className="cardpic">
                        <img src="https://images.pexels.com/photos/17895979/pexels-photo-17895979/free-photo-of-butterfly-on-flower.jpeg?auto=compress&cs=tinysrgb&w=600" alt=""/>
                    </div>
                <h5>catto</h5>
                </div>
                <div className="cardimage">
                    <img src="https://images.unsplash.com/photo-1531748774806-58179918dba4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" alt=""/>
                </div>
                <div className="cardcontent">
                <span class="material-symbols-outlined">favorite</span>
                <p><b>1 Like</b></p>
                <p>cute catto</p>
                </div>
                <div className="addcomment">
                <span class="material-symbols-outlined">sentiment_very_satisfied</span>
                <input type="text" placeholder="add a comment"/>
                <button className="commentbtn">Post</button>
                </div>
            </div>
        </div>
    )
}

export default Home;