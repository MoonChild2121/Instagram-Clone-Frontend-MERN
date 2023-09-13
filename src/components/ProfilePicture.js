import React, {useState, useEffect, useRef} from "react";

export default function ProfilePicture({changeprofile}) {

    const hiddenFileInput = useRef(null)
    const [image, setimage] = useState([]);
    const [url, setUrl] = useState("");
    
    const postDetails = () => {
        if (image) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "instaclone");
        data.append("cloud_name", "moonchild21");
    
        fetch("https://api.cloudinary.com/v1_1/moonchild21/image/upload", {
            method: "post",
            body: data,
        })
        .then((res) => res.json())
        .then((data) => {
            setUrl(data.url);
            console.log(data.url);
        })
        .catch((err) => {
            console.error(err);
            console.log(err.response);
        });
    }
    };
    

    const postPic = ()=> {
        fetch("http://localhost:5000/uploadpfp", {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
            pic: url,
        }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            changeprofile()
            window.location.href = window.location.href;
        })
        .catch((err) => console.log(err));
    };

    const handleclick = () => {
        hiddenFileInput.current.click()
    } 
    
    useEffect(() => {
        if (image) {
            postDetails();
        }
    }, [image]);
    

    useEffect(()=> {
        if(url){
            postPic()
        }
        
    },[url])

    return (
        <div className="uploadprofile darkBg">
            <div className="changepic">
                <div>
                    <h2>Change Profile Photo</h2>
                </div>
                <div style={{borderTop:"1px solid #00000030"}}>
                    <button className="upload-btn" style={{color: "#1EA1F7"}}
                    onClick={()=> {handleclick()}}
                    >Upload Photo</button>
                    <input type="file" ref={hiddenFileInput} accept="image/*" style={{display: "none"}} onChange={(e)=> {setimage(e.target.files[0])}}/>
                </div>
                <div style={{borderTop:"1px solid #00000030"}}>
                    <button className="upload-btn" style={{color: "#ED4956"}} onClick={()=>{
                        setUrl(null)
                        postPic()
                    }}>Remove Current Photo</button>
                </div>
                <div style={{borderTop:"1px solid #00000030"}}>
                    <button 
                    style={{
                            background: "none",
                            border: "none",
                            fontSize: "15px",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}
                    onClick={() => {setTimeout(() => {
                        window.location.reload();
                      }, 1000);}}
                    >Close</button>
                </div>
            </div>
        </div>
    )
}