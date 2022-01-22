import React from "react";
import { Link } from "react-router-dom";
import "../styles/share.css";

function Share({ share, uploading }) {
  return (
    <div className="share">
      <ul>
        <li>
          <Link
            to="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-facebook" title="facebook"></i>
          </Link>
        </li>
        <li>
          <Link
            to="https://twitter.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJsYW5nIjoiZW4ifQ%3D%3D%22%7D"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-twitter" title="twitter"></i>
          </Link>
        </li>
        <li onClick={share}>
          {!uploading ? (
            <i className="bi bi-instagram" title="instagram"></i>
          ) : (
            <div className="loader"></div>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Share;
