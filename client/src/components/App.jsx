import React, { Component } from 'react';
import MonthIndicator from './MonthIndicator.jsx';
import DayOfWeek from './DayOfWeek.jsx';
import DateGridList from './DateGridList.jsx';

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
    date = new Date(2020, 11, 16);

    var monthNumber = date.getMonth() + 1
    var month = monthConversion[date.getMonth()];
    var year = date.getFullYear();


    this.state = {
        monthNumber: monthNumber,
        
        month: month,
        year: year,
        days: daysArray(1, getDaysInMonth(monthNumber, year))
    };
}

  render() {
    let monthYear = {month: this.state.monthNumber, year: this.state.year};

    return (
    <main>
      <div className="calendar">
        <MonthIndicator month={this.state.month} year={this.state.year}/>
        <DayOfWeek />
        <DateGridList 
          monthYear={monthYear}
          days={this.state.days}/>
      </div>
    </main>
    );
  }
}

export default App;