import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="top-nav">
      <div className="nav-text-large">My App</div>
      <ul className="nav-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/images">Images</Link>
        </li>
      </ul>
    </nav>
  );
}
