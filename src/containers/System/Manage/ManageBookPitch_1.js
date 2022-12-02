import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import {LANGUAGES, CRUD_ACTIONS, dateFormat} from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import Select from 'react-select';
import './ManageBookPitch_1.scss';
import {toast} from "react-toastify";
import _ from 'lodash';
import {saveBulkScheduleDoctor} from '../../../services/userService';




class ManageBookPitch_1 extends Component {


    constructor(props) {
        super(props);
        this.state = {
            listClinics:[],
            selectedClinic:{},
            currentDate:'',
            rangeTime:[],
            selectedOption:''
        }
    }

    componentDidMount() {
        this.props.fetchAllClinicsStart();
        this.props.fetchAllTime();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if(prevProps.allClinics !== this.props.allClinics){
        //     let dataSelect = this.buildDataInputSelect(this.props.allClinics);
        //     this.setState({
        //         listClinics: dataSelect
        //     })
        // }
        if(prevProps.allTime !== this.props.allTime){
            let data = this.props.allTime;
            if(data && data.length > 0){
                data = data.map(item => ({...item, isSelected:false}))
            }
            this.setState({
               rangeTime: data
            })
        }
    }

    // buildDataInputSelect = (inputData) => {
    //     let result = [];
    //     if(inputData && inputData.length > 0){
    //         inputData.map((item,index) =>{
    //             let object = {};
    //             let labelVi = `${item.name}`;
    //             object.label = labelVi;
    //             object.data = item.id;
    //             result.push(object);
    //         })
    //     }

    //     return result;
    // }


    // handleChangeSelect = async (selectedOption) => {
    //     this.setState({selectedOption},() => {
    //         // console.log('change',this.state.selectedOption)
    //     });
    // }

    handleOnChangeDatePicker = (date) => {
        this.setState({currentDate: date[0]});
    };

    handleClickBtnTime = (time) => {
        let {rangeTime} = this.state;
        if(rangeTime &&  rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if(item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveBooking = async () => {
        let {rangeTime, selectedOption, currentDate} = this.state;
        let result = [];
        let { user } = this.props;
        if(!currentDate){
            toast.error("Invalid date!");
            return;
        }
        // if(selectedOption && _.isEmpty(selectedOption)){
        //     toast.error("Invalid selected Pitch!!!");
        //     return;
        // }

        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        let formatedDate = new Date(currentDate).getTime();

        if(rangeTime && rangeTime.length > 0){
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if(selectedTime && selectedTime.length > 0){
                selectedTime.map((clinic, index)=>{
                    let object = {};
                    object.doctorId = user.positionId;
                    object.date = formatedDate;
                    object.timeType = clinic.keyMap;
                    result.push(object);
                })
            }else{
                toast.error("Invalid selected time !");
                return;
            }
        }

        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: user.positionId,
            formatedDate: formatedDate
        })
        if(res && res.errCode === 0){
            toast.success("Save Infor succeed!");
        }else{
            toast.error("error saveBulkScheduleDoctor ");

        }
    }


   
    render() {
        // console.log('check', this.state)
        let {rangeTime,selectedOption, listClinics} = this.state;
        let {language} = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <div className="manage-booking-container">
               <div className="m-s-title">
                    <FormattedMessage id="manage-booking.title"/>
               </div>
               <div className="container">
                    <div className="row">
                        {/* <div className="col-6 form-group">
                            <label><FormattedMessage id="manage-booking.choose-clinic"/></label>
                            <Select
                                value={selectedOption}
                                onChange={this.handleChangeSelect}
                                options={listClinics}
                            />
                        </div> */}
                        <div className="col-6 form-group">
                            <label><FormattedMessage id="manage-booking.choose-date"/></label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>

                        <div className="col-13 pick-hour-container">
                           {rangeTime && rangeTime.length > 0 && rangeTime.map((item,index)=>{
                            return (
                                <button className={item.isSelected === true ? "btn btn-clinic active" : "btn btn-clinic"} key={index}
                                onClick={() => this.handleClickBtnTime(item)}
                                >
                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                </button>
                            )
                           })}
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary btn-save-clinic"
                                onClick={() => this.handleSaveBooking()}
                            >
                                <FormattedMessage id="manage-booking.save"/>
                            </button>
                        </div>
                    </div>
               </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allTime: state.admin.times,
        allClinics: state.admin.clinics,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllClinicsStart: () => dispatch(actions.fetchAllClinicsStart()),
        fetchAllTime: () => dispatch(actions.fetchTimeStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBookPitch_1);
