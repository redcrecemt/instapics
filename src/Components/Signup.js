import React from 'react'
import Modal from '@material-ui/core/Modal';
import { Button, Input } from "@material-ui/core";

const Signup= ({modalopen,setModalopen,modalStyle,classes,username,setUserName,email,setEmail,password,setPassword,handleSignup})  =>{
    return (
        <Modal open={modalopen} onClose={() => setModalopen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <img
              src="http://www.edigitalagency.com.au/wp-content/uploads/instagram-logo-text-black-png.png"
              className="app__headerImage"
              alt="instafood"
            ></img>

            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />

            <Input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button onClick={(e) => handleSignup(e)}>Signup</Button>
          </form>
        </div>
      </Modal>

    )
}

export default Signup
