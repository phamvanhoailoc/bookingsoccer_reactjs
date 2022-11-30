import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BookingModal.scss';
import {LANGUAGES} from '../../../utils';
import {Modal} from 'reactstrap';
import ProfileDoctor from './ProfileDoctor';
import _ from 'lodash';
import * as actions from '../../../store/actions';
import {FormattedMessage} from 'react-intl';
import {postPatientBookAppointment} from '../../../services/userService';
import {toast} from 'react-toastify';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';






class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName:'',
            phoneNumber:'',
            email:'',
            address:'',
            reason:'',
            genderArr:[],
            doctorId:'',
            gender:'',
            date:'',
            timeType:'',
            date:'',
            isShowLoading: false
           
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.genderRedux !== this.props.genderRedux){
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr:arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap:''
            })
        }

        if(this.props.dataTime !== prevProps.dataTime){
            if(this.props.dataTime && !_.isEmpty(this.props.dataTime)){
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }

    }

    OnChageInput = (event, id)=>{
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    }

    handleConfirmBooking = async () => {


        this.setState({
            isShowLoading: true
        })
        let timeString = this.builedTimeBooking(this.props.dataTime);
        let dortorName = this.buileDoctorName(this.props.dataTime);
        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            gender: this.state.gender,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            address: this.state.address,
            date: this.props.dataTime.date,
            language: this.props.language,
            timeString: timeString,
            doctorName: dortorName,
        })
        this.setState({
            isShowLoading: false
        })
        if(res && res.errCode === 0){
            toast.success('Booking new success');
            this.props.closeBookingClose();
        }else{
            toast.error('Booking new error!!!');

        }
    }

    builedTimeBooking = (dataTime) => {
        let {language} = this.props;
        if(dataTime && !_.isEmpty(dataTime)){
            let time = language === LANGUAGES.VI ?
            dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            let date = language === LANGUAGES.VI ? 
            moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
            :
            moment.unix(+dataTime.date / 1000).locale('en').format('dddd - DD/MM/YYYY')
            return `${time} - ${date}`
        }
        return ''
    }

    buileDoctorName = (dataTime) => {
        let {language} = this.props;
        if(dataTime && !_.isEmpty(dataTime)){
            let name = language === LANGUAGES.VI ?
           `${dataTime.doctorData.name}`
           :
           `${dataTime.doctorData.name}`
            return name;
        }
        return ''
    }

   

    render() {

        
        console.log('check ',this.state)
       let {isOpenModal, closeBookingClose, dataTime,} = this.props;
       let doctorId ='';
       let date='';
       if(dataTime && !_.isEmpty(dataTime)){
        doctorId = dataTime.doctorId
       }
    //    if(dataTime && !_.isEmpty(dataTime)){
    //     date = dataTime.date
    //    }
       let genders = this.state.genderArr;
       let language = this.props.language;
       let {  gender, fullName, phoneNumber, email, address } = this.state;

        return (

            <LoadingOverlay
                active={this.state.isShowLoading}
                spinner
                text='Loading...'
            >
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size="lg"
                centered
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left">Thông tin đặt sân</span>
                        <span className="right"
                        onClick={closeBookingClose}>
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="booking-modal-body">
                        <div className="doctor-infor">
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                            />
                        </div>
                       
                        <div className="row">
                            <div className="col-6 from-group">
                                <label>Họ tên</label>
                                <input className="form-control"
                                 value={fullName}
                                 onChange={(event) => {this.OnChageInput(event, "fullName")}}
                                />
                            </div>
                            <div className="col-6 from-group">
                                <label>Số điện thoại</label>
                                <input className="form-control"
                                 value={phoneNumber}
                                 onChange={(event) => {this.OnChageInput(event, "phoneNumber")}}
                                />
                            </div>
                            <div className="col-6 from-group">
                                <label>Địa chỉ email</label>
                                <input className="form-control"
                                     value={email}
                                     onChange={(event) => {this.OnChageInput(event, "email")}}
                                />
                            </div>
                            <div className="col-6 from-group">
                                <label>Địa chỉ liên hệ</label>
                                <input className="form-control"
                                 value={address}
                                 onChange={(event) => {this.OnChageInput(event, "address")}}
                                />
                            </div>
                            <div className="col-6 from-group">
                                <label>Giới tính</label>
                                <select className="form-control"
                                    
                                    onChange={(event) => {this.OnChageInput(event, "gender")}}
                                    value={gender}
                                >
                                    {genders && genders.length > 0 && genders.map((item,index)=>{
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueVi: item.valueEn}
                                                </option>
                                        )
                                    })
                                    }
                                    
                                </select>
                            </div>
                            
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button
                            className="btn-booking-confirm"
                            onClick={()=> this.handleConfirmBooking()}
                        >
                            Xác nhận
                        </button>
                        <button
                            className="btn-booking-cancel"
                            onClick={closeBookingClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
             </LoadingOverlay>
        );
    }

}

const mapStateToProps = state => {
    return {
      language: state.app.language,
      genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
