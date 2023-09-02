import React, {useState, useEffect, useRef} from "react";

export default function ProfilePicture({changeprofile}) {

    const hiddenFileInput = useRef(null)

    const handleclick = () => {
        hiddenFileInput.current.click()
    }

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
                    <input type="file" ref={hiddenFileInput} accept="image/*" style={{display: "none"}}/>
                </div>
                <div style={{borderTop:"1px solid #00000030"}}>
                    <button className="upload-btn" style={{color: "#ED4956"}}>Remove Current Photo</button>
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
                    onClick={changeprofile}
                    >Cancel</button>
                </div>
            </div>
        </div>
    )
}