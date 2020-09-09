import React from 'react'
import Modal from '@material-ui/core/Modal';
import { Button, Input } from "@material-ui/core";


const  Signin=({email,password,setPassword,setEmail,handleLogin,loginmodalopen,setLoginModalOpen,modalStyle,classes}) =>{
  

    return (
        <Modal open={loginmodalopen} onClose={() => setLoginModalOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <img
              src="http://www.edigitalagency.com.au/wp-content/uploads/instagram-logo-text-black-png.png"
              className="app__headerImage"
              alt="instafood"
            ></img>

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

            <Button onClick={handleLogin}>Login</Button>
          </form>
        </div>
      </Modal>
    )
}

export default Signin
