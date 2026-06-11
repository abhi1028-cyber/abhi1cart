import { Link } from "react-router-dom";

function Header() {
  return (
    <div
      style={{
        background: "#333",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: "white", margin: 0 }}>
        My MERN App
      </h2>

      <div>
        <Link
          to="/"
          style={{
            color: "white",
            marginRight: "20px",
            textDecoration: "none",
          }}
        >
          Home
        </Link>

        <Link
          to="/blog"
          style={{
            color: "white",
            marginRight: "20px",
            textDecoration: "none",
          }}
        >
          Blog
        </Link>

        <Link
          to="/contact"
          style={{
            color: "white",
            marginRight: "20px",
            textDecoration: "none",
          }}
        >
          Contact
        </Link>

        <Link
          to="/email"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Email
        </Link>
      </div>
    </div>
  );
}

export default Header;