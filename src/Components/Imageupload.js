import React,{useState} from 'react'
import { Button, Modal } from "@material-ui/core/";
import "./Imageupload.css";
import {storage,db,firebase} from '../firebase'




const Imageupload = ({username,isOpen,setIsOpen}) => {

    const [progress,setProgress]=useState(0);
    const [caption,setCaption]=useState('');
    const [image,setimage]=useState(null);
    //const [,setOpen]=useState(isOpen);   


    const handleUpload = (e) => {
   //   setProgress(0);
   //   setdisplayProgress(true);

      const uploadTask=storage.ref(`images/${image.name}`).put(image);

      uploadTask.on
      (
          "state_changed",
          (snapshot)=>{
              //progresss
              const progress=Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);

              console.log(progress);
              setProgress(progress);
          },
          (error)=>{
              alert(error.message);
          },
          ()=>{
              //complete function
              storage.ref('images').child(image.name).getDownloadURL()
              .then(url=>{

                db.collection("post").add({
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  caption: caption,
                  imageurl: url,
                  username: username,
                });
              
            })
          }
           
      )

      setProgress(0);

    };


    const handleChange = (e) => {
      if (e.target.files[0]) setimage(e.target.files[0]);
    };


  return (

    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
    <div className="imageupload">
      <input
        placeholder="Enter your caption"
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      >

      </input>
      <input type="file" onChange={handleChange}></input>

      <Button onClick={handleUpload}>Upload</Button>

      <progress value={progress} max="100" className="imageupload__progress" ></progress>
    </div>
</Modal> 
 );
};

export default Imageupload
