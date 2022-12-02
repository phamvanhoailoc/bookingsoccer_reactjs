import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from '../../../utils';
import * as actions from "../../../store/actions"
import Lightbox from 'react-image-lightbox';
import './UserRedux.scss';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
import Select from 'react-select';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr:[],
            roleArr:[],
            previewImgURL:'',
            isOpen:false,
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',
            phonenumber:'',
            gender: '',
            role: '',
            listpitch:[],
            avatar:'',
            selectedOption:'',
            action:'',
            userEditId:'',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getRoleStart();
        this.props.fetchClinicRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.genderRedux !== this.props.genderRedux){
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr:arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap:''
            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux){
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr:arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap:''
            })
        }

        if(prevProps.listUsers !== this.props.listUsers) {
            let arrRoles = this.props.roleRedux;
            let arrGenders = this.props.genderRedux;
            this.setState({
                email:'',
                password:'',
                firstName:'',
                lastName:'',
                address:'',
                phonenumber:'',
                selectedOption:'',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap:'',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap:'',
                avatar:'',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: ''
            })
        }

        if(prevProps.listClinics !== this.props.listClinics){
            let dataselect = this.buildDataInputSelect(this.props.listClinics)
            this.setState({
                listpitch: dataselect
            })
        }

    }


    buildDataInputSelect = (inputData) => {
        let result = [];
        if(inputData && inputData.length > 0){
            inputData.map((item,index) =>{
                let object = {};
                let labelVi = `${item.name}`;
                object.label = labelVi;
                object.data = item.id;
                result.push(object);
            })
        }

        return result;
    }


    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar:file
            })
        }
    }

    openPreviewImage = () => {
        if(!this.state.previewImgURL) return;
        this.setState({
            isOpen:true
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid === false) return;

        let {action} = this.state;

        if(action === CRUD_ACTIONS.CREATE){
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName:this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                positionId: this.state.selectedOption.data,
                gender: this.state.gender,
                roleId: this.state.role,
                phonenumber: this.state.phonenumber,
                avatar: this.state.avatar
            })
            console.log('check state', this.props.createNewUser)
        }
        if(action === CRUD_ACTIONS.EDIT){
            this.props.editUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName:this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                positionId: this.state.selectedOption.data,
                gender: this.state.gender,
                roleId: this.state.role,
                phonenumber: this.state.phonenumber,
                avatar: this.state.avatar
            })
        }

        
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber'];
        for(let i = 0; i < arrInput.length; i++) {
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter: '+ arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    OnChageInput = (event, id)=>{
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    }

    handleEditUserFromParent = (user) => {

        let imageBase64 = '';
        if(user.image){
            imageBase64 = Buffer.from(user.image, 'base64').toString('binary');
        }
        
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName:user.firstName,
            lastName: user.lastName,
            address: user.address,
            gender: user.gender,
            role: user.roleId,
            phonenumber: user.phonenumber,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({selectedOption},() => {
            // console.log('change',this.state.selectedOption)
        });
    }

    render() {
        let genders = this.state.genderArr;
        let language = this.props.language
        let roles = this.state.roleArr;
        let isGetGenders = this.props.isLoadingGender;
       
        let { email, password, firstName, lastName, address, phonenumber, gender, role,avatar, selectedOption, listpitch} = this.state;
        return (
            <div className="user-redux-container" >
                <div className="title">
                <FormattedMessage id="manage-user.add"/>
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">{isGetGenders === true ? 'Loading gender': ''}</div>
                            <div className="col-3 mt-3">
                                <label> <FormattedMessage id="manage-user.email"/></label>
                                <input className="form-control" type="email" placeholder="abc@..." 
                                value={email}
                                onChange={(event) => {this.OnChageInput(event, "email")}}
                                disabled={this.state.action === CRUD_ACTIONS.EDIT ? true: false}
                                ></input>
                            </div>
                            <div className="col-3 mt-3">
                                <label> <FormattedMessage id="manage-user.password"/></label>
                                <input className="form-control" type="password" 
                                value={password}
                                onChange={(event) => {this.OnChageInput(event, "password")}}
                                disabled={this.state.action === CRUD_ACTIONS.EDIT ? true: false}
                                ></input>
                            </div>
                            <div className="col-3 mt-3">
                                <label> <FormattedMessage id="manage-user.firstname"/></label>
                                <input className="form-control" type="text" 
                                value={firstName}
                                onChange={(event) => {this.OnChageInput(event, "firstName")}}
                                ></input>
                            </div>
                            <div className="col-3 mt-3">
                                <label> <FormattedMessage id="manage-user.lastname"/></label>
                                <input className="form-control" type="text" 
                                value={lastName}
                                onChange={(event) => {this.OnChageInput(event, "lastName")}}
                                ></input>
                            </div>
                            <div className="col-3 mt-3" >
                                <label> <FormattedMessage id="manage-user.numberphone"/></label>
                                <input className="form-control" type="text" 
                                 value={phonenumber}
                                 onChange={(event) => {this.OnChageInput(event, "phonenumber")}}
                                ></input>
                            </div>
                            <div className="col-6 mt-3">
                                <label> <FormattedMessage id="manage-user.address"/></label>
                                <input className="form-control" type="text" 
                                placeholder="156/11 Huỳnh tấn phát"
                                value={address}
                                 onChange={(event) => {this.OnChageInput(event, "address")}}
                                ></input>
                            </div>
                            <div className="col-3 mt-3">
                                <label> <FormattedMessage id="manage-user.pitch"/></label>
                                <Select
                                    value={selectedOption}
                                    onChange={this.handleChangeSelect}
                                    options={listpitch}
                                />
                            </div>
                            <div className="col-3 mt-3">
                                <label> <FormattedMessage id="manage-user.gender"/></label>
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
                            <div className="col-3 mt-3">
                                <label> <FormattedMessage id="manage-user.position"/></label>
                                <select className="form-control">
                                    <option selected>choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="col-3 mt-3">
                                <label> <FormattedMessage id="manage-user.role"/></label>
                                <select className="form-control"
                                 onChange={(event) => {this.OnChageInput(event, "role")}}
                                 value={role}
                                >
                                {roles && roles.length > 0 && roles.map((item,index)=>{
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueVi: item.valueEn}
                                                </option>
                                        )
                                    })
                                    }
                                </select>
                            </div>
                            <div className="col-3 mt-3">
                                <label> <FormattedMessage id="manage-user.image"/></label>
                                <div className="preview-img-container">
                                    <input type="file" id="previewImg" hiden onChange={(event) => this.handleOnchangeImage(event)}/>
                                    <label className="label-upload mt-3" htmlFor='previewImg'>Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className="preview-image" style={{backgroundImage:`url(${this.state.previewImgURL})`}}
                                    onClick={()=> this.openPreviewImage()}>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                    onClick={()=> this.handleSaveUser()}
                                > 
                                {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.edit"/> : <FormattedMessage id="manage-user.save"/>}
                                </button>
                            </div>
                            <div className="col-12 mb-5 mt-5">
                                <TableManageUser
                                    handleEditUserFromParentKey = {this.handleEditUserFromParent}
                                />
                            </div>

                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={()=> this.setState({isOpen: false})}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users,
        listClinics: state.admin.clinics
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewuser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editUserRedux: (data) => dispatch(actions.editUserRedux(data)),
        fetchClinicRedux: () => dispatch(actions.fetchAllClinicsStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
