import React from 'react';
import up from "../../dist/svg/up.svg";
import down from "../../dist/svg/down.svg";
import SVG from "react-inlinesvg";

var Guest = () => (

    


    <div>
        <div className="guest-heading">Guest</div>
        <div id="guest" tabIndex="0" role="button" aria-pressed="false">
            <div id="guest-1">1 guest</div>
            <SVG className="svg-up-down" src={down}/>
            <div className="border-bottom"></div>
            <div className="border-bottom"></div>
        </div>

    </div>
);

export default Guest;