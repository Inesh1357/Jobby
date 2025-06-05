import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobsCard from '../SimilarJobsCard'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetailsCard: [],
    skillsDetails: [],
    lifeAtCompanyList: [],
    similarJobsList: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getDetailsJobs()
  }

  getDetailsJobs = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiDetailsUrl = `https://apis.ccbp.in/jobs/${id}`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiDetailsUrl, option)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updateJobDetails = {
        id: data.job_details.id,
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: data.job_details.life_at_company,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills,
        title: data.job_details.title,
        employmentType: data.job_details.employment_type,
      }
      const updateSkills = updateJobDetails.skills.map(eachItem => ({
        name: eachItem.name,
        imageUrl: eachItem.image_url,
      }))
      const updateLifeAtCompany = {
        description: updateJobDetails.lifeAtCompany.description,
        imageUrl: updateJobDetails.lifeAtCompany.image_url,
      }
      const updateSimilarDetails = data.similar_jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      // console.log(updateJobDetails)
      // console.log(updateLifeAtCompany)
      // console.log(updateSkills)
      // console.log(updateSimilarDetails)
      this.setState({
        jobDetailsCard: updateJobDetails,
        skillsDetails: updateSkills,
        lifeAtCompanyList: updateLifeAtCompany,
        similarJobsList: updateSimilarDetails,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderJobDetails = () => {
    const {jobDetailsCard, skillsDetails, lifeAtCompanyList} = this.state
    const {description, imageUrl} = lifeAtCompanyList
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      employmentType,
    } = jobDetailsCard
    return (
      <div className="job-details-card">
        <div className="jsk-details">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-img-details"
          />
          <div>
            <h1 className="company-heading-details">{title}</h1>
            <div className="jsk-details">
              <p className="star-icon-details">*</p>
              <p className="star-rate-details">{rating}</p>
            </div>
          </div>
        </div>
        <div className="mi-details">
          <div className="jsk-details">
            <div className="jsk ss-details">
              <p className="company-para-details">Log</p>
              <p className="company-para-details">{location}</p>
            </div>
            <div className="jsk-details">
              <p className="company-para-details">Bag</p>
              <p className="company-para-details">{employmentType}</p>
            </div>
          </div>
          <p className="amount-details">{packagePerAnnum}</p>
        </div>
        <hr />
        <div className="mi-details">
          <h1 className="company-heading-1-details">Description</h1>
          <a
            href={companyWebsiteUrl}
            target="_blank"
            className="angol-para"
            rel="noreferrer"
          >
            Visit X
          </a>
        </div>
        <p className="description-details">{jobDescription}</p>
        <h1 className="company-heading-1-details sk">Skills</h1>
        <ul className="ul">
          {skillsDetails.map(eachItem => (
            <li className="li-skills" key={eachItem.name}>
              <img
                src={eachItem.imageUrl}
                alt={eachItem.name}
                className="skills-img"
              />
              <p className="skills-para">{eachItem.name}</p>
            </li>
          ))}
        </ul>
        <h1 className="company-heading-1-details">Life at Company</h1>
        <div className="jsk-details">
          <p className="description-details">{description}</p>
          <img src={imageUrl} alt="life at company" className="at-img" />
        </div>
      </div>
    )
  }

  renderJobDetailsViewSuccess = () => {
    const {similarJobsList} = this.state
    return (
      <>
        {this.renderJobDetails()}
        <h1 className="similar-heading-details">Similar Jobs</h1>
        <ul className="ul">
          {similarJobsList.map(eachItem => (
            <SimilarJobsCard jobCard={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </>
    )
  }

  isLoading = () => (
    <div data-testid="loader" className="loader-bg">
      <Loader
        type="ThreeDots"
        color="#ffffff"
        height={80}
        width={80}
        className="in"
      />
    </div>
  )

  renderJobDetailsViewFailure = () => (
    <div className="data-details-failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-details-failure"
      />
      <h1 className="data-details-failure-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="data-details-failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="details-retry"
        type="button"
        onClick={this.retryDetails}
      >
        Retry
      </button>
    </div>
  )

  retryDetails = () => {
    this.getDetailsJobs()
  }

  render() {
    const {apiStatus} = this.state
    let value
    switch (apiStatus) {
      case apiStatusConstant.success:
        value = this.renderJobDetailsViewSuccess()
        break
      case apiStatusConstant.failure:
        value = this.renderJobDetailsViewFailure()
        break
      case apiStatusConstant.inProgress:
        value = this.isLoading()
        break
      default:
        value = null
        break
    }
    return (
      <div className="pp">
        <Header />
        <div className="job-details-bg">{value}</div>
      </div>
    )
  }
}

export default JobItemDetails
