import React,{useState,useEffect} from "react";
import {db,auth} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import "./App.css";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Header from "./Components/Header";
import Postings from "./Components/Postings";

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
}));


function App() {
  const [posts, setPost] = useState([]);
  const [modalopen, setModalopen] = useState(false);
  const [loginmodalopen, setLoginModalOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user,setUser]=useState(null);
  const classes = useStyles();
  

  useEffect(() => {
    //effect

    const unsubscribe=  auth.onAuthStateChanged(userAuth=>{

      if(userAuth){

        setUser(userAuth)
        console.log(userAuth);
      }
      else {
        setUser(null)
      }

    })

    return () => {
      //cleanup
      unsubscribe();
    }
  }, [user,username])
  
  
  
  useEffect(() => {
    db.collection("post").onSnapshot((snapshot) => {
   //   console.log(snapshot);

      setPost(snapshot.docs.map((d) => ({ id: d.id, post: d.data() })));
    });
  }, []);





  const handleSignup= (e) =>{
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email,password).then(authUser=>{
      setModalopen(false);

      return authUser.user.updateProfile({
        displayName: username,
      });
    })
    .catch(err=> alert(err.message))

  };


  const handleLogin =(e)=>{
    e.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    // eslint-disable-next-line
    .then(authUser=>{ setLoginModalOpen(false); setUserName(authUser.user.displayName); }).
    catch(err=>alert(err.message));
  } 

  return (
    <div className="app">
      {/* 
    What I have to do?
    Upload image(s)
    set caption
    post button */}

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
    </div>
  );
}

export default App;