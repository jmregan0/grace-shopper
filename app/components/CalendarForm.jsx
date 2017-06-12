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
    if((this.props.start === nextProps.start && this.props.end === nextProps.end)
       && (this.props.minDate === nextProps.minDate)) return false;
    return true;
  }

  render() {
    console.log('props in calendarform', this.props)
    let minDate = this.props.minDate || new Date();
    let maxDate = this.props.maxDate || null;
    let disabledDates = this.props.disabledDates || null;
    return (
      <InfiniteCalendar
        Component={withRange(Calendar)}
        locale={{
          headerFormat: 'MMM Do',
        }}
        width={400}
        onSelect={this.props.handleDateChange}
        minDate={minDate}
        height={500}
        // selected={{
        //   start: this.props.start,
        //   end: this.props.end
        // }}
        selected={false}

        {...(maxDate && { maxDate: maxDate})}
        {...(disabledDates && { disabledDates: disabledDates})}
      />
    )
  }
}

export default CalendarForm
