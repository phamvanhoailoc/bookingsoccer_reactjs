import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProfileDoctor.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import {LANGUAGES} from '../../../utils';
import {getAllDetailClinics} from '../../../services/userService';
import DoctorSchedule from './DoctorSchedule';
import _ from 'lodash';
import moment from 'moment'




class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailClinic:{},

           
        }
    }

    async componentDidMount() {
       

            let data = await this.getInforDoctor(this.props.doctorId);
           
                this.setState({
                    detailclinic: data
                })
            
        
    }

    getInforDoctor= async (id) =>{
        let result = {};
        if(id){
            let res = await getAllDetailClinics(id);
            if(res && res.errCode === 0){
                result = res.data;
            }
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    rederTimeBooking = (dataTime) => {
        let {language} = this.props;
        if(dataTime && !_.isEmpty(dataTime)){
            let time = language === LANGUAGES.VI ?
            dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            let date = language === LANGUAGES.VI ? 
            moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
            :
            moment.unix(+dataTime.date / 1000).locale('en').format('dddd - DD/MM/YYYY')
            return (
                <>
                    <div>{time} - {date}</div>
                    <div>Miễn phí đặt lịch</div>
                </>
            )
        }
        return <></>
    }
   

    render() {


        let {language, isShowDescriptionDoctor, dataTime} = this.props;
        let {detailclinic} = this.state;
        let nameVi='';
        let nameEn='';
        if(detailclinic && detailclinic.areaData){
            nameVi = `${detailclinic.areaData.valueVi}, ${detailclinic.name}`;
            nameEn = `${detailclinic.areaData.valueEn}, ${detailclinic.name}`;
        }
       
        return (
            <>
           
            <div className="profile-detail-container">
                <div className="intro-clinic">
                    <div
                        className="content-left"
                        style={{backgroundImage:`url(${detailclinic && detailclinic.image ? detailclinic.image: ''})`}}
                    ></div>
                    <div className="content-right">
                        <div className="up">
                            {language === LANGUAGES.VI ? nameVi: nameEn}
                        </div>
                        <div className="down">
                            {isShowDescriptionDoctor === true ? 
                            <>
                            {detailclinic && detailclinic.Markdown && detailclinic.Markdown.description && 
                                <span>
                                    {detailclinic.Markdown.description}
                                </span>
                            }
                            </>    
                            :
                            <>
                            {this.rederTimeBooking(dataTime)}
                            </>
                        }
                            

                        </div>
                    </div>
                </div>

            </div>

            </>
        );
    }

}

const mapStateToProps = state => {
    return {
      language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
