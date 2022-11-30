import React, { Component } from 'react';
import { connect } from 'react-redux';
import {LANGUAGES} from '../../../../utils';
import {FormattedMessage} from 'react-intl';



class LikeAndShare extends Component {

    constructor(props) {
        super(props);
        this.state = {
          
           
        }
    }


    initFacebookSDK(){
        if(window.FB){
            window.FB.XFBML.parse();
        }
        let {language} = this.props;
        let locale = language === LANGUAGES.VI ? 'vi_VN':'en_US';
        window.fbAsyncInit = function(){
            window.FB.init({
                appId: process.env.REACT_APP_FACEBOOK_APP_ID,
                cookie: true,
                xfbml: true,
                version: 'v2.5'
    
            });
            
        };

        (function (d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if(d.getElementById(id)) return;
            js= d.createElement(s); js.id = id;
            js.src = `//connect.facebook.net/${locale}/sdk.js`;
            fjs.parentNode.insertBefore(js, fjs);
        }(document,'script','facebook-jssdk')
        );
    }

    async componentDidMount() {
        this.initFacebookSDK();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        

    }

   

   

    render() {

        
       let {dataHref} = this.props;

        return (

            <>
            <div class="fb-like" 
            data-href={dataHref}
            data-width="" data-layout="standard" data-action="like" 
            data-size="small" data-share="true">               
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

export default connect(mapStateToProps, mapDispatchToProps)(LikeAndShare);
