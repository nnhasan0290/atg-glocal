import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Facebook from "../assets/Icons/facebook.svg";
//import Insta from "../assets/Icons/instagram.svg";
import LinkdIn from "../assets/Icons/linkedin.svg";
//import Twitter from "../assets/Icons/twitter.svg";

const Footer = () => {
  return (
    <footer className='bg-dark text-center text-white footer' id='footer'>
      <div className='container p-4 pb-0'>
        <section className='mb-4'>
          <a
            className='btn m-1'
            rel='noreferrer'
            href='https://www.facebook.com/Glocal-Bodh-111320554665937'
            role='button'
            target='_blank'
          >
            <img src={Facebook} alt='Facebook logo' width='25' />
          </a>

          {/* <a className='btn  m-1' href='#!' role='button'>
            <img src={Insta} alt='Insta logo' width='25' />
          </a> */}

          <a
            className='btn  m-1'
            href='https://www.linkedin.com/company/glocal-bodh/about/'
            role='button'
            rel='noreferrer'
            target='_blank'
          >
            <img src={LinkdIn} alt='LinkdIn logo' width='25' />
          </a>

          {/* <a className='btn  m-1' href='#!' role='button'>
            <img src={Twitter} alt='Twitter logo' width='25' />
          </a> */}
        </section>
      </div>
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }} className='p-1'>
        <Link to='/privacyPolicy' style={{ textDecoration: "none" }}>
          Privacy Policy
        </Link>
        <Link to='/terms' className='ms-3' style={{ textDecoration: "none" }}>
          Terms and Condition
        </Link>
      </div>
      <div
        className='text-center p-3'
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2021 Copyright Glocal Bodh
      </div>
    </footer>
  );
};
export default Footer;
