import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import {FormattedMessage} from 'react-intl';
import {LANGUAGES} from '../../../utils';
import Slider from "react-slick";
import {withRouter} from 'react-router';



class OutStangdingDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
           arrClinics:[]
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.topClinicsRedux !== this.props.topClinicsRedux){
            this.setState({
                arrClinics: this.props.topClinicsRedux
            })
        }
    }
    componentDidMount() {
        this.props.loadTopClinics();
    }

    handleViewDetailClinic = (clinic) => {
        if(this.props.history){
            this.props.history.push(`/detail-pitch/${clinic.id}`);

        }
    }


    render() {
        let arrClinics = this.state.arrClinics;
        let {language} = this.props;
        // arrClinics = arrClinics.concat(arrClinics).concat(arrClinics)
        
       
        return (
            <div className="section-share section-outstading-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section"><FormattedMessage id="homepage.outstangding-doctor"/></span>
                        <button className="btn-section"><FormattedMessage id="homepage.more-info"/></button>
                    </div>
                
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {arrClinics && arrClinics.length > 0 && arrClinics.map((item, index) =>{
                                let imageBase64 = '';
                                if(item.image){
                                    imageBase64 = Buffer.from (item.image, 'base64').toString('binary');
                                }
                                let nameVi = `${item.name}`;
                                let nameEn = `${item.name}`;
                                return(
                                    <div className="section-customize" key={index} onClick={() => this.handleViewDetailClinic(item)}>
                                <div className="bg-image section-outstading-doctor" style={{backgroundImage:`url(${imageBase64})`}}></div>
                                <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                 </div>
                                )
                            })}


                            
                            
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
        topClinicsRedux: state.admin.topClinics
    };
};

const mapDispatchToProps = dispatch => {
    return {
       loadTopClinics: ()=> dispatch(actions.fetchTopClinic())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStangdingDoctor));
