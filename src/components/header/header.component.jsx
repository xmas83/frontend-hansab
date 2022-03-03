import { Link } from "react-router-dom";

const Header = () => {
  return <><nav className="navbar navbar-expand navbar-light bg-info">
    <div className="container">
      <Link className="navbar-brand text-white" to="/">Logo</Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link text-white active" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/users">Users</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/cars">Cars</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  </>
}
export default Header;