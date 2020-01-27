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

    var daysArray = function(low, end) {
      var list = [];
      for (var i = low; i <= end; i++) 
          list.push(i);

      return list;
    }

    var getDaysInMonth = function(month, year) {
      console.log(new Date(year, month, 0).getDate());
      return new Date(year, month, 0).getDate();
    };
    
    var date = new Date();
    date = new Date(2020, 3, 5);

    var monthNumber = date.getMonth() + 1
    var month = monthConversion[date.getMonth()];
    var year = date.getFullYear();


    this.state = {
        monthNumber: monthNumber,
        
        month: month,
        year: year,
        days: daysArray(1, getDaysInMonth(monthNumber, year)),

        hoverDate: '',
        startDate: '',
        endDate: ''
    };

    this.buttonCLick = this.buttonCLick.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
  }

  buttonCLick(dateTime) {
    if(!this.state.startDate) {
      var date = 'startDate';
    } else {
      var date = 'endDate';
    } 

    if(this.state.startDate && this.state.endDate){
      console.log('both has been updated');
    }
    //console.log('inside App', dateTime);
    this.setState({
      [date]: dateTime 
    })
  }

  mouseEnter(dateTime) {
    //console.log('inside App mouseEnter', dateTime);
    let firstDay = Number(this.state.startDate.slice(-2));
    let hoverDay  =  Number(dateTime.slice(-2));

    if(this.state.startDate && this.state.endDate){
      return;
    }

    // console.log('h , f', hoverDay,  firstDay)
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

      //console.log('here are first and last');
      //console.log(firstDay, endDay);
      //console.log(this.listBetweenTwoNumbers(firstDay+1, endDay));
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