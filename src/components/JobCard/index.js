// import {FaStar} from 'react-icons/fa'
// import {MdLocationOn} from 'react-icons/md'
// import { FaShoppingBag } from "react-icons/fa";
import {Link} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {jobItem} = props
  const {
    id,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    location,
    rating,
  } = jobItem
  return (
    <Link className="link" to={`/jobs/${id}`}>
      <li className="li-bg-card">
        <div className="jsk">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-img"
          />
          <div>
            <h1 className="company-heading">{title}</h1>
            <div className="jsk">
              <p className="star-icon">*</p>
              <p className="star-rate">{rating}</p>
            </div>
          </div>
        </div>
        <div className="mi">
          <div className="jsk">
            <div className="jsk ss">
              <p className="company-para">Log</p>
              <p className="company-para">{location}</p>
            </div>
            <div className="jsk">
              <p className="company-para">Bag</p>
              <p className="company-para">{employmentType}</p>
            </div>
          </div>
          <p className="amount">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="company-heading-1">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard

// <FaShoppingBag />
// <MdLocationOn />
// <FaStar />
