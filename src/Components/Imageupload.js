import React, { useState } from "react";
import { Button, Modal } from "@material-ui/core/";
import "./Imageupload.css";
import { storage, db, firebase } from "../firebase";
import { SpeedDial, SpeedDialIcon } from "@material-ui/lab/";
import { makeStyles } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  exampleWrapper: {
    position: "sticky",
    bottom: 0,
    marginTop: theme.spacing(3),
    height: 380,
  },

  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));

const ImageUpload = ({ username }) => {
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const [image, setimage] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const classes = new useStyles();

  const handleUpload = (e) => {
    //   setProgress(0);
    //   setdisplayProgress(true);

    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progresss
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        console.log(progress);
        setProgress(progress);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        //complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("post").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageurl: url,
              username: username,
            });
          });
      }
    );

    setProgress(0);
    setOpen(false);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) setimage(e.target.files[0]);
  };

  return (
    <span>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <input
            placeholder="Enter your caption"
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></input>
          <input type="file" onChange={handleChange}></input>

          <Button onClick={handleUpload}>Upload</Button>

          <progress
            value={progress}
            max="100"
            className="imageupload__progress"
          ></progress>
        </div>
      </Modal>

      <div className={classes.exampleWrapper}>
        <SpeedDial
          ariaLabel="Upload"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          open={open}
          onClick={(e) => setOpen(true)}
        ></SpeedDial>
      </div>
    </span>
  );
};

export default ImageUpload;
