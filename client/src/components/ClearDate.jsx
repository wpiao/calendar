import React from 'react';

class ClearDate extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        
        return this.props.hide ? <p id="clear-date" >Clear dates</p> : null ;
        //return(<p id="clear-date">Clear dates</p>)
    }
}

export default ClearDate;