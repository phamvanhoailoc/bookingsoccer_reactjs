import React, { Component } from 'react';
import { connect } from 'react-redux';
import './detailclinic.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import {LANGUAGES} from '../../../utils';
import {getAllDetailClinics} from '../../../services/userService';
import DoctorSchedule from './DoctorSchedule';
import LikeAndShare from '../section/SocialPlugin/LikeAndShare';
import Comment from '../section/SocialPlugin/Comment';



class detailclinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailClinic:{},
            currentClinicId: -1,
           
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            this.setState({
                currentClinicId: id
            })

            let res = await getAllDetailClinics(id);
            if(res && res.errCode === 0){
                this.setState({
                    detailclinic: res.data
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
   

    render() {
        // console.log('check detaiclinic', this.state)
        let {language} = this.props;
        let {detailclinic} = this.state;
        let nameVi='';
        let nameEn='';
        if(detailclinic && detailclinic.areaData){
            nameVi = `${detailclinic.areaData.valueVi}, ${detailclinic.name}`;
            nameEn = `${detailclinic.areaData.valueEn}, ${detailclinic.name}`;
        }

        let currentURL = +process.env.REACT_APP_IS_LOCALHOST === 1 ? 
        "https://phamvanhoailoc.online/" : window.location.href;
       console.log("check href",window.location.href)
        return (
            <>
            <HomeHeader
                isShowBanner={false}
            />
            <div className="clinic-detail-container">
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
                            {detailclinic && detailclinic.Markdown && detailclinic.Markdown.description && 
                                <span>
                                    {detailclinic.Markdown.description}
                                </span>
                            }
                            <div className="like-share-plugin">
                                <LikeAndShare
                                    dataHref={currentURL}
                                />
                            </div>

                        </div>
                    </div>
                </div>
                <div className="schedule-doctor">
                    <div className="content-left">
                        <DoctorSchedule
                            doctorIdFromParent={this.state.currentClinicId}
                        />
                    </div>
                    <div className="content-right"></div>
                </div>
                <div className="detail-infor-clinic">
                    {detailclinic && detailclinic.Markdown && detailclinic.Markdown.contentHTML &&
                        <div dangerouslySetInnerHTML={{__html: detailclinic.Markdown.contentHTML}}></div>
                    }
                </div>

                <div className="comment-clinic">
                    <Comment
                        dataHref={currentURL}
                        width={"100%"}
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(detailclinic);
