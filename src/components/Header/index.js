import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ul className="header-bg">
      <li>
        <Link to="/" className="link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-img"
          />
        </Link>
      </li>
      <li className="header-div">
        <Link to="/" className="link">
          <p className="header-para">Home</p>
        </Link>
        <Link to="/jobs" className="link">
          <p className="header-para">Jobs</p>
        </Link>
      </li>
      <li>
        <button onClick={onLogout} type="button" className="header-button">
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Header)
