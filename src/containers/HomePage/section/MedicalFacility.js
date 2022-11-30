import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss';
import {FormattedMessage} from 'react-intl';

import Slider from "react-slick";



class MedicalFacility extends Component {

   Specialty

    render() {

       
        return (
            <div className="section-share section-medical-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Các quận</span>
                        <button className="btn-section">xem thêm</button>
                    </div>
                
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className="bg-image section-medical-specialty"></div>
                                <div>Quận 1</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-medical-specialty"></div>
                                <div>Quận 2</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-medical-specialty"></div>
                                <div>Quận 3</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-medical-specialty"></div>
                                <div>Quận 4</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-medical-specialty"></div>
                                <div>Quận 5</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-medical-specialty"></div>
                                <div>Quận 6</div>
                            </div>
                            
                        </Slider>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
