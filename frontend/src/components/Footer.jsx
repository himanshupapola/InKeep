import React from "react";
import {
  FaFacebookF,
  FaPinterestP,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import "../styles/footer.css";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft-icons">
        <div className="ft-icon">
          <FaFacebookF />
        </div>
        <div className="ft-icon">
          <FaPinterestP />
        </div>
        <div className="ft-icon">
          <FaInstagram />
        </div>
        <div className="ft-icon">
          <FaTwitter />
        </div>
      </div>

      <div className="ft-sub">
        <span>|</span>
        <NavLink to="/">Home</NavLink>
        <span>|</span>
        <NavLink to="/about">About Us</NavLink>
        <span>|</span>
        <NavLink to="/privacy-policy">Privacy Policy</NavLink>
        <span>|</span>
      </div>

      <div className="ft-bottom">
        <div className="zigzag-svg">
          <svg width="100%" height="15" preserveAspectRatio="none">
            <polygon
              points="0,15 17.5,0 35,15 52.5,0 70,15 87.5,0 105,15 122.5,0 140,15 157.5,0 175,15 192.5,0 210,15 227.5,0 245,15 262.5,0 280,15 297.5,0 315,15 332.5,0 350,15 367.5,0 385,15 402.5,0 420,15 437.5,0 455,15 472.5,0 490,15 507.5,0 525,15 542.5,0 560,15 577.5,0 595,15 612.5,0 630,15 647.5,0 665,15 682.5,0 700,15 717.5,0 735,15 752.5,0 770,15 787.5,0 805,15 822.5,0 840,15 857.5,0 875,15 892.5,0 910,15 927.5,0 945,15 962.5,0 980,15 997.5,0 1015,15 1032.5,0 1050,15 1067.5,0 1085,15 1102.5,0 1120,15 1137.5,0 1155,15 1172.5,0 1190,15 1207.5,0 1225,15 1242.5,0 1260,15 1277.5,0 1295,15 1312.5,0 1330,15 1347.5,0 1365,15 1382.5,0 1400,15 1417.5,0 1435,15 1452.5,0 1470,15 1487.5,0 1505,15 1522.5,0 1540,15 1557.5,0 1575,15 1592.5,0 1610,15 1627.5,0 1645,15 1662.5,0 1680,15 1697.5,0 1715,15 1732.5,0 1750,15"
              fill="black"
            ></polygon>
          </svg>
        </div>
        <p style={{ marginBottom: "6px" }}>
          <strong>
            THOUGHTFULLY DESIGNED JOURNALING, CRAFTED WITH ❤ BY INKEEP
          </strong>
        </p>
        <p style={{ marginBottom: "0px" }}>©INKEEP | ALL RIGHTS RESERVED</p>
      </div>
    </footer>
  );
}
