import React from "react";

function Footer() {
  return (
    <div>
      <div className="footer mt-50">
        <hr className="division-line"></hr>
        <div className="footer-group">
          <div className="socials">
                <i className="fa-brands fa-square-facebook"></i>
                <i className="fa-brands fa-square-instagram"></i>
                <i className="fa-brands fa-square-twitter"></i>
          </div>
          <div className="footer-logo">
                <div className="logo">
                <i className="fa-regular fa-square-check"></i>
                </div>
                <div className="logo-name">
                <div className="name">Taskify</div>
                <div className="slogan">Get Things Done, Stress-Free.</div>
                </div>
          </div>
            <div className="newsletter">
                <input className="email-newsletter" placeholder="Email Address" type="text" />
                <button className="footer-subscribe">Subscribe</button>
            </div>
        </div>
        <div className="contactus">
            <p>Created by <strong>AMAN YADAV</strong></p>
            <span>|</span>
            <p>ay.work07@gmail.com</p>
            <span>|</span>
            <p>8107595366</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
