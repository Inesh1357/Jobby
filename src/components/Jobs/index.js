import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiSearch} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import FilterGroup from '../FiltersGroup'
import JobCard from '../JobCard'
import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileDetails: '',
    jobDataDetails: '',
    apiStatus: apiStatusConstant.initial,
    apiStatusData: apiStatusConstant.initial,
    activeEmployeeId: '',
    activeSalaryId: '',
    searchInput: '',
    inputValue: '',
  }

  componentDidMount() {
    this.getProfile()
    this.getData()
  }

  changeemploymentType = activeEmployeeIdIns => {
    const {activeEmployeeId} = this.state
    if (activeEmployeeId.length < 1) {
      this.setState({activeEmployeeId: activeEmployeeIdIns}, this.getData)
    } else {
      this.setState(
        preVstate => ({
          activeEmployeeId: `${preVstate.activeEmployeeId},${activeEmployeeIdIns}`,
        }),
        this.getData,
      )
    }
  }

  changeSalaryRange = activeSalaryId => {
    this.setState({activeSalaryId}, this.getData)
  }

  getData = async () => {
    // console.log('ins')
    this.setState({apiStatusData: apiStatusConstant.inProgress})
    const {activeEmployeeId, activeSalaryId, searchInput} = this.state
    console.log(searchInput)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmployeeId}&minimum_package=${activeSalaryId}&search=${searchInput}`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, option)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      const updateData = data.jobs.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        rating: eachItem.rating,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
      }))
      this.setState({
        jobDataDetails: updateData,
        apiStatusData: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatusData: apiStatusConstant.failure})
    }
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, option)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      const updateProfile = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updateProfile,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  profileSuccess = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails

    return (
      <div className="profile">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-para">{shortBio}</p>
      </div>
    )
  }

  isLoading = () => (
    <div data-testid="loader" className="profile-bg">
      <Loader
        type="ThreeDots"
        color="#ffffff"
        height={80}
        width={80}
        className="in"
      />
    </div>
  )

  profileFailure = () => (
    <div className="profile-bg">
      <button className="retry" type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  retry = () => {
    this.getProfile()
  }

  renderProfileStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.profileSuccess()
      case apiStatusConstant.failure:
        return this.profileFailure()
      case apiStatusConstant.inProgress:
        return this.isLoading()
      default:
        return null
    }
  }

  jobsCardListSuccess = () => {
    const {jobDataDetails} = this.state
    const condition = jobDataDetails.length > 0
    return (
      <>
        {condition ? (
          <ul>
            {jobDataDetails.map(eachItem => (
              <JobCard jobItem={eachItem} key={eachItem.id} />
            ))}
          </ul>
        ) : (
          <>{this.onJobsFound()}</>
        )}
      </>
    )
  }

  onJobsFound = () => (
    <div className="data-failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="job-failure"
      />
      <h1 className="data-failure-heading">No Jobs Found</h1>
      <p className="data-failure-para">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  jobsCardListFailure = () => (
    <div className="data-failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-failure"
      />
      <h1 className="data-failure-heading">Oops! Something Went Wrong</h1>
      <p className="data-failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button className="retry" type="button" onClick={this.retryData}>
        Retry
      </button>
    </div>
  )

  retryData = () => {
    this.getData()
  }

  renderJobStatus = () => {
    const {apiStatusData} = this.state
    switch (apiStatusData) {
      case apiStatusConstant.success:
        return this.jobsCardListSuccess()
      case apiStatusConstant.failure:
        return this.jobsCardListFailure()
      case apiStatusConstant.inProgress:
        return this.isLoading()
      default:
        return null
    }
  }

  onChange = event => {
    this.setState({inputValue: event.target.value})
  }

  searchOne = () => {
    const {inputValue} = this.state
    this.setState({searchInput: inputValue}, this.getData)
  }

  render() {
    const {inputValue} = this.state
    return (
      <div className="pp">
        <Header />
        <div className="job-bg">
          <div className="job-card">
            {this.renderProfileStatus()}
            <FilterGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeemploymentType={this.changeemploymentType}
              changeSalaryRange={this.changeSalaryRange}
            />
          </div>
          <div>
            <div className="input-bg">
              <input
                type="search"
                className="input"
                placeholder="Search"
                value={inputValue}
                onChange={this.onChange}
              />
              <button
                className="icon-bg"
                onClick={this.searchOne}
                data-testid="searchButton"
                type="button"
              >
                <BiSearch className="icon-search" />
              </button>
            </div>
            {this.renderJobStatus()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
