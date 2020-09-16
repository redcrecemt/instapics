import React from 'react'
import { Button } from "@material-ui/core";


const Header= ({user,auth,setModalopen, setLoginModalOpen})=> {
    return (
      <div className="app__header">
        <img className="app__headerImage"
          src="http://www.edigitalagency.com.au/wp-content/uploads/instagram-logo-text-black-png.png"
          
          alt="instafood"
        ></img>

        <div>
          {user ? (
            <Button
              onClick={(e) => {
                auth.signOut();
              }}
            >
              Signout
            </Button>
          ) : (
            <div className="app__signInContainer">
              <Button
                onClick={(e) => {
                  setModalopen(true);
                }}
              >
                Signup
              </Button>

              <Button
                onClick={(e) => {
                  setLoginModalOpen(true);
                }}
              >
                Signin
              </Button>
            </div>
          )}
        </div>
      </div>
    )
}

export default Header
