import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import {FormattedMessage} from 'react-intl';
import {LANGUAGES} from '../../utils';
import {changeLanguageApp} from '../../store/actions';
import {withRouter} from 'react-router';
class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    returnToHome = () => {
        if(this.props.history){
            this.props.history.push(`/home`);
        }
    }

    render() {
       let language = this.props.language;
        return (
            <React.Fragment>
           <div className="home-header-container">
            <div className="home-header-content">
                <div className="left-content">
                    <i className="fas fa-bars"></i>
                    <div className="header-logo" onClick={() => this.returnToHome()}></div>
                </div>
                <div className="center-content">
                    <div className="child-content">
                        <div><b><FormattedMessage id="home-header.pitch-type"/></b></div>
                        <div className="sub-title"><FormattedMessage id="home-header.search-pitch-type"/></div>
                    </div>
                    <div className="child-content">
                        <div><b><FormattedMessage id="home-header.location"/></b></div>
                        <div className="sub-title"><FormattedMessage id="home-header.choose-location"/></div>
                    </div>
                    
                    <div className="child-content">
                        <div><b><FormattedMessage id="home-header.tournaments"/></b></div>
                        <div className="sub-title"><FormattedMessage id="home-header.create-tournaments"/></div>
                    </div>
                </div>
                <div className="right-content">
                    <div className="support"><i className="fas fa-question-circle"></i><FormattedMessage id="home-header.support"/></div>
                    <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                    <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                </div>
            </div>
           </div>
           {this.props.isShowBanner === true && 
           <div className="home-header-banner">
            <div className="content-up">
                <div className="title1"><FormattedMessage id="home-header-banner.title1"/></div>
                <div className="title2"><FormattedMessage id="home-header-banner.title2"/></div>
                {/* <div className="search">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="Tìm sân đá banh"></input>
                </div> */}
            </div>
            <div className="content-down">
                {/* <div className="options">
                    <div className="option-child">
                        <div className="icon-child"><i className="fas fa-hospital"></i></div>
                        <div className="text-child"><FormattedMessage id="home-header-banner.text-child-1"/></div>
                    </div>
                    <div className="option-child">
                        <div className="icon-child"><i className="fas fa-hospital"></i></div>
                        <div className="text-child"><FormattedMessage id="home-header-banner.text-child-2"/></div>
                    </div>
                    <div className="option-child">
                        <div className="icon-child"><i className="fas fa-hospital"></i></div>
                        <div className="text-child"><FormattedMessage id="home-header-banner.text-child-3"/></div>
                    </div>
                    <div className="option-child">
                        <div className="icon-child"><i className="fas fa-hospital"></i></div>
                        <div className="text-child"><FormattedMessage id="home-header-banner.text-child-4"/></div>
                    </div>
                </div> */}
                
            </div>
           </div>
    }
           </React.Fragment>
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
