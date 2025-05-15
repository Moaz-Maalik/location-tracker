import React from "react";
import { locate } from "../utils/location";

const Footer = () => {
  const handleRequestAccess = () => {
    console.log("hello clicked");
    locate(
      () => {
        // window.location.href = REDIRECT_URL;
      },
      (err) => {
        document.getElementById("change").innerText = "Failed";
        console.error(err);
      }
    );
  };
  return (
    <>
      {/* info section */}
      <section className="info_section">
        <div className="container">
          <h4>Get In Touch</h4>
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="info_items">
                <div className="row">
                  <div className="col-md-4">
                    <a onClick={handleRequestAccess}>
                      <div className="item">
                        <div className="img-box">
                          <i className="fa fa-map-marker" aria-hidden="true" />
                        </div>
                        <p>A56, Gulshan e Iqbal, Lahore, Pakistan</p>
                      </div>
                    </a>
                  </div>
                  <div className="col-md-4">
                    <a onClick={handleRequestAccess}>
                      <div className="item">
                        <div className="img-box">
                          <i className="fa fa-phone" aria-hidden="true" />
                        </div>
                        <p>+92 3213478691</p>
                      </div>
                    </a>
                  </div>
                  <div className="col-md-4">
                    <a onClick={handleRequestAccess}>
                      <div className="item">
                        <div className="img-box">
                          <i className="fa fa-envelope" aria-hidden="true" />
                        </div>
                        <p>ajsolarinfo@gmail.com</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end info_section */}

      <footer className="footer_section">
        <div className="container"></div>
      </footer>
    </>
  );
};

export default Footer;
