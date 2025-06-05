import './index.css'

const FiltersGroup = props => {
  const rendertypeEmployment = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(eachItem => {
      const {changeemploymentType} = props

      const onChangeEmploymentType = () =>
        changeemploymentType(eachItem.employmentTypeId)

      return (
        <li className="employee-item" key={eachItem.employmentTypeId}>
          <input
            type="checkbox"
            id={eachItem.employmentTypeId}
            onChange={onChangeEmploymentType}
            className="checkbox-input"
            name="exployee"
          />
          <label htmlFor={eachItem.employmentTypeId} className="checkbox-label">
            {eachItem.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRangeList = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(salary => {
      const {changeSalaryRange} = props
      const onChangeSalaryRange = () => changeSalaryRange(salary.salaryRangeId)

      return (
        <li className="employee-item" key={salary.salaryRangeId}>
          <input
            type="radio"
            id={salary.salaryRangeId}
            className="checkbox-input"
            name="salary"
            onChange={onChangeSalaryRange}
          />
          <label htmlFor={salary.salaryRangeId} className="checkbox-label">
            {salary.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentType = () => (
    <div className="cc">
      <h1 className="employee">Type of Employment</h1>
      <ul>{rendertypeEmployment()}</ul>
    </div>
  )

  const renderSalaryRange = () => (
    <div className="cc">
      <h1 className="employee">Salary Range</h1>
      <ul>{renderSalaryRangeList()}</ul>
    </div>
  )

  return (
    <div>
      <hr />
      {renderEmploymentType()}
      <hr />
      {renderSalaryRange()}
    </div>
  )
}

export default FiltersGroup
