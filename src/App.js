import React,{useState,useEffect} from "react";
import {db,auth} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import "./App.css";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Header from "./Components/Header";
import Postings from "./Components/Postings";
import Imageupload from "./Components/Imageupload";

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
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  exampleWrapper: {
    position: "sticky",
    bottom:0,
    marginTop: theme.spacing(3),
    height: 380
  },


  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2)
    }
  }
}));


function App() {
  const [posts, setPost] = useState([]);
  const [modalopen, setModalopen] = useState(false);
  const [loginmodalopen, setLoginModalOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
 

  const classes = useStyles();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setUser(userAuth);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("post")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPost(snapshot.docs.map((d) => ({ id: d.id, post: d.data() })));
      });
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        setModalopen(false);

        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((err) => alert(err.message));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        setLoginModalOpen(false);
        setUserName(authUser.user.displayName);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="app">
    
        <Header
          user={user}
          auth={auth}
          setModalopen={setModalopen}
          setLoginModalOpen={setLoginModalOpen}
        />

        <Signin
          email={email}
          password={password}
          setPassword={setPassword}
          setEmail={setEmail}
          handleLogin={handleLogin}
          setLoginModalOpen={setLoginModalOpen}
          loginmodalopen={loginmodalopen}
          modalStyle={modalStyle}
          classes={classes}
        />

        <Signup
          modalopen={modalopen}
          setModalopen={setModalopen}
          modalStyle={modalStyle}
          classes={classes}
          username={username}
          setUserName={setUserName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSignup={handleSignup}
        />
      
      <Postings posts={posts} />

      {user?.displayName && <Imageupload username={user.displayName} />}

    </div>
  );
}

export default App;