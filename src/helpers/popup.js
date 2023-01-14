import React from "react";
import "../assets/popup.css";
import Logo from '../assets/logo.png'
import Close from '../assets/close-button.png'

function popup(props) {
  return props.trigger ? (
    <div className="pop-up">
      <div className="pop-up-inner">
        <img className="logo" src={Logo}/>
        <p className="close-btn" onClick={() => props.setTrigger(false)}><img className="close-btn" src={Close}/></p>
        {props.children}
      </div>
    </div>
  ) : ("");
}
export default popup;
