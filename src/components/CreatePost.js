import React, { useState } from "react";
import './CreatePost.css'

function CreatePost() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const imageURL = URL.createObjectURL(selectedFile);
            setSelectedImage(imageURL);
        }
    };

    return (
        <div className="createPost">
            {/* header */}
            <div className="post-header">
                <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
                <button id="post-btn" >Share</button>
            </div>
            {/* image preview */}
            <div className="main-div">
                <img
                    id="output"
                    src={selectedImage ? selectedImage : "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
            {/* details */}
            <div className="details">
                <div className="card-header">
                    <div className="card-pic">
                        <img
                            src="https://images.pexels.com/photos/17840025/pexels-photo-17840025/free-photo-of-an-orange-with-leaves-on-a-white-plate.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt=""
                        />
                    </div>
                    <h5>MoonChild</h5>
                </div>
                <textarea type="text" placeholder="Write a caption...."></textarea>
            </div>
        </div>
    )
}

export default CreatePost;
