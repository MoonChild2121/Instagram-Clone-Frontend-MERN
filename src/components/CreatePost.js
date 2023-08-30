import React, { useState, useEffect } from "react";
import './CreatePost.css';
import { BiInfoCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function CreatePost() {
    const [body, setBody] = useState("");
    const [image, setimage] = useState("");
    const [imageURL, setURL] = useState("");
    const [error, setError] = useState("");
    const [posting, setPosting] = useState(false); // New state
    const navigate = useNavigate();

    useEffect(() => {
        if (posting && imageURL) {
            // Reset the state after successful posting
            setPosting(false);
            // Navigate to the desired location
            navigate("/");
        }
    }, [posting, imageURL, navigate]);

    const postDetails = () => {
        if (!body || !image) {
            setError("Please add all the fields.");
            return;
        }

        setError(""); // Clear any previous error message

        setPosting(true); // Start the posting process

        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "instaclone");
        data.append("cloud_name", "moonchild21");

        fetch("https://api.cloudinary.com/v1_1/moonchild21/image/upload", {
            method: "post",
            body: data,
        })
        .then(res => res.json())
        .then(responseData => {
            setURL(responseData.url);
            fetch("http://localhost:5000/createPost", {
                method: "post",
                headers: {
                    "content-Type": "application/json",
                    "Authorization": "bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    body,
                    pic: responseData.url
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error); // Set the error message
                } else {
                    setError(""); // Clear error message
                }
                console.log(data);
            })
            .finally(() => {
                setPosting(false); // Reset the posting state regardless of success or failure
            });
        });
    };

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
                <h4 style={{ margin: "auto" }}>New Post</h4>
                <button id="post-btn" onClick={postDetails} disabled={posting}>
                    {posting ? "Posting..." : "Share"}
                </button>
                {error && (
                <p className="error-message-popover">
                    <BiInfoCircle className="info-icon" />
                    {error}
                </p>
            )}
            </div>
            {/* image preview */}
            <div className="main-div">
                <img
                    id="output"
                    src={selectedImage ? selectedImage : "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"}
                    alt=""
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        handleImageChange(event)
                        setimage(event.target.files[0])
                    }}
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
                <textarea type="text" placeholder="Write a caption...." value={body} onChange={(e)=> {setBody(e.target.value)}}></textarea>
            </div>
        </div>
    )
}

export default CreatePost;
