import React, { Component } from 'react'
import { Link } from 'react-router'
import InfiniteCalendar, { Calendar, withRange } from 'react-infinite-calendar'
// import 'react-infinite-calendar/umd/react-infinite-calendar.js'
import moment from 'moment'

class CalendarForm extends Component {
  constructor(props) {
    super()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.start === nextProps.start && this.props.end === nextProps.end) return false;
    return true;
  }

  render() {
    console.log(this.props,'props in CalendarForm')
    let minDate = this.props.minDate || new Date();
    console.log('mindate in calendarform', minDate)
    return (
      <InfiniteCalendar
        Component={withRange(Calendar)}
        locale={{
          headerFormat: 'MMM Do',
        }}
        width={400}
        height={500}
        selected={{
          start: this.props.start,
          end: this.props.end
        }}
        onSelect={this.props.handleDateChange}
        minDate={minDate}

        // disabledDays={[0,6]}
      />
    )
  }
}

export default CalendarForm
