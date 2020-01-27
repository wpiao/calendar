import React from 'react';

class ClearDate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            underline: false
        }
        this.underlineClearDate = this.underlineClearDate.bind(this);
    }

    underlineClearDate() {
        this.setState({
            underline: !this.state.underline
        });
    }

    render() {
        
        let style  = {};
        if(this.state.underline){
            style['textDecoration'] = 'underline';
        } else {
            style['textDecoration'] = 'none';
        }
        return this.props.hide ? 

                <div>
                    <p id="clear-date-empty"></p>   
                    <p 
                        style={style}
                        onMouseEnter={this.underlineClearDate} 
                        onMouseLeave={this.underlineClearDate}
                        id="clear-date" >Clear dates
                    </p> 
                </div>
                : null ;
        //return(<p id="clear-date">Clear dates</p>)
    }
}

export default ClearDate;