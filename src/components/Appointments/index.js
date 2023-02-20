// Write your code here
import {Component} from 'react'

import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointment extends Component {
  state = {
    addAppointmentList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  isToggleIsStarred = id => {
    this.setState(prevState => ({
      addAppointmentList: prevState.addAppointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {
            ...eachAppointment,
            isStarred: !eachAppointment.isStarred,
          }
        }
        return eachAppointment
      }),
    }))
  }

  onAddButton = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const formattedDate = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      addAppointmentList: [...prevState.addAppointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  getFilteredAppointmentsList = () => {
    const {addAppointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return addAppointmentList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return addAppointmentList
  }

  render() {
    const {isFilterActive, titleInput, dateInput} = this.state

    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'

    const filteredAppointmentsList = this.getFilteredAppointmentsList()
    console.log(filteredAppointmentsList)

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointments-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddButton}>
                <h1 className="form-description">Add Appointment</h1>
                <label htmlFor="title" className="label">
                  Title
                </label>
                <input
                  id="title"
                  type="input"
                  placeholder="Title"
                  className="title-input"
                  value={titleInput}
                  onChange={this.onChangeTitleInput}
                />
                <label className="label" htmlFor="date">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  className="title-input"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                />
                <button type="submit" className="add-btn">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
            <hr className="line" />
            <div className="header-with-filter-container">
              <h1 className="heading">Appointments</h1>
              <button
                type="button"
                className={`stared-btn ${filterClassName}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  isToggleIsStarred={this.isToggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointment
