import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';

import ManageBookPitch from '../containers/System/Manage/ManageBookPitch'

import Header from '../containers/Header/Header';
import ManagePatient from '../containers/System/Manage/ManagePatient';
import ManageBookPitch_1 from '../containers/System/Manage/ManageBookPitch_1'

class Manage extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/manage/manage-book-pitch" component={ManageBookPitch} />
                        <Route path="/manage/manage-booking" component={ManagePatient} />
                        <Route path="/manage/manage-book-pitch-1" component={ManageBookPitch_1} />
                        
                    </Switch>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
