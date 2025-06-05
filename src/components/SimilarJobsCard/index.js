import './index.css'

const SimilarJobsCard = props => {
  const {jobCard} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobCard
  return (
    <li className="similar-bg">
      <div className="jsk-similar">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-img-similar"
        />
        <div>
          <h1 className="company-heading-similar">{title}</h1>
          <div className="jsk-similar">
            <p className="star-icon-similar">*</p>
            <p className="star-rate-similar">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="company-heading-1-similar">Description</h1>
      <p className="description-similar">{jobDescription}</p>
      <div className="jsk-similar">
        <div className="jsk-similar ss-similar">
          <p className="company-para-similar">Log</p>
          <p className="company-para-similar">{location}</p>
        </div>
        <div className="jsk-similar">
          <p className="company-para-similar">Bag</p>
          <p className="company-para-similar">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobsCard
