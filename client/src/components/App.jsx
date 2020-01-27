import React, { Component } from 'react';
import MonthIndicator from './MonthIndicator.jsx';
import DayOfWeek from './DayOfWeek.jsx';
import DateGridList from './DateGridList.jsx';
import ClearDate  from './ClearDate.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    let monthConversion = 
      [
      'January', 'February', 'March', 'April', 'May',
      'June', 'July', 'August', 'September',
      'October', 'November', 'December'
      ];
    
    var date = new Date();
    date = new Date(2020, 3, 5);

    var monthNumber = date.getMonth() + 1
    var month = monthConversion[date.getMonth()];
    var year = date.getFullYear();

    this.state = {
        monthNumber: monthNumber,
        
        month: month,
        year: year,
        days: this.daysArray(1, this.getDaysInMonth(monthNumber, year)),

        hoverDate: '',
        startDate: '',
        endDate: ''
    };

    this.buttonCLick = this.buttonCLick.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
  }

  daysArray(low, end) {
    var list = [];
    for (var i = low; i <= end; i++) 
        list.push(i);

    return list;
  }

  getDaysInMonth(month, year) {
    console.log(new Date(year, month, 0).getDate());
    return new Date(year, month, 0).getDate();
  };


  buttonCLick(dateTime) {
    if(!this.state.startDate) {
      var date = 'startDate';
    } else {
      var date = 'endDate';
    } 
    this.setState({
      [date]: dateTime 
    })
  }

  mouseEnter(dateTime) {
    let firstDay = Number(this.state.startDate.slice(-2));
    let hoverDay  =  Number(dateTime.slice(-2));

    if(this.state.startDate && this.state.endDate){
      return;
    }

    if(this.state.startDate && (hoverDay > firstDay)){
      this.setState({
        hoverDate: dateTime 
      })
    }
  }

  listBetweenTwoNumbers(low, end) {
    var list = [];
    for (var i = low; i <= end; i++) 
        list.push(i);

    return list;
  }

  colorDates() {
    if(this.state.startDate) {
      let firstDay = Number(this.state.startDate.slice(-2));

      let endDay;
      if(this.state.endDate){
        endDay = Number(this.state.endDate.slice(-2));
      } else {
        endDay = Number(this.state.hoverDate.slice(-2));
      }
      return this.listBetweenTwoNumbers(firstDay+1, endDay);
    }
    return [];
  }


  render() {
    let monthYear = {month: this.state.monthNumber, year: this.state.year};
    let listOfColorDates = this.colorDates();
    let lastFillDate = Boolean(this.state.endDate) === true;
    let hide = Boolean(this.state.startDate);
    console.log('app', this.state.endDate);
    console.log('last', lastFillDate);

    //console.log('rendering', this.state)
    return (
    <main>
      <div className="calendar">
        <MonthIndicator month={this.state.month} year={this.state.year}/>
        <DayOfWeek />
        <DateGridList 
          monthYear={monthYear}
          days={this.state.days}
          updateStartEndDate={this.buttonCLick}
          mouseEnter={this.mouseEnter}
          listOfColorDates={listOfColorDates}
          lastFillDate={lastFillDate}/>
        <ClearDate hide={hide}/>
      </div>
    </main>
    );
  }
}

export default App;