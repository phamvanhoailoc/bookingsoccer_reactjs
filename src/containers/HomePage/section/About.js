import React, { Component } from 'react';
import { connect } from 'react-redux';

import {FormattedMessage} from 'react-intl';

import Slider from "react-slick";



class About extends Component {

   Specialty

    render() {

       
        return (
            <div className="section-share section-about">
               <div className="section-about-header">
                    Hướng dẫn cách book sân với wed BookingSoccer
               </div>
               <div className="section-about-content">
                    <div className="content-left">
                        <iframe width="60%" height="400px" 
                            src="https://www.youtube.com/embed/35AYvwl-hpw" 
                            title="Nét pro Lộc Ráng chiều" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>               
                        </iframe>
                    </div>
                    <div className="content-right"></div>
               </div>
         </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
