import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ClinicRedux.scss';
import TableManageClinic from './TableManageClinic';
import * as actions from "../../../store/actions"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from '../../../utils';


class ClinicRedux extends Component {


    constructor(props) {
        super(props);
        this.state = {
            areaArr:[],
            previewImgURL:'',
            isOpen:false,
            name:'',
            address:'',
            description:'',       
            area:'',
            avatar:'',

            action:'',
            clinicEditId:'',
        }
    }

    componentDidMount() {
        this.props.getAreaStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.areaRedux !== this.props.areaRedux){
            let arrAreas = this.props.areaRedux;
            this.setState({
                areaArr:arrAreas,
                area: arrAreas && arrAreas.length > 0 ? arrAreas[0].keyMap:''
            })
        }

        if(prevProps.listClinics !== this.props.listClinics) {
            let arrAreas = this.props.areaRedux;
            this.setState({
                name:'',
                address:'',
                description:'',         
                area: arrAreas && arrAreas.length > 0 ? arrAreas[0].keyMap:'',
                avatar:'',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: ''
            })
        }

    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['name', 'address'];
        for(let i = 0; i < arrInput.length; i++) {
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter: '+ arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveClinic = () => {
        let isValid = this.checkValidateInput();
        if(isValid === false) return;

        let {action} = this.state;


        if(action === CRUD_ACTIONS.CREATE){
            this.props.createNewClinic({
                name: this.state.name,
                address: this.state.address,
                description: this.state.description,
                area: this.state.area,
                image: this.state.avatar,
            })
        }
        if(action === CRUD_ACTIONS.EDIT){
            this.props.editClinicRedux({
                id: this.state.clinicEditId,
                name: this.state.name,
                address: this.state.address,
                description: this.state.description,
                area: this.state.area,
                image: this.state.avatar
            })
        }

        
    }

    openPreviewImage = () => {
        if(!this.state.previewImgURL) return;
        this.setState({
            isOpen:true
        })
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

    OnChageInput = (event, id)=>{
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        }
        )
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

    handleEditClinicFromParent = (clinic) => {

        let imageBase64 = '';
        if(clinic.image){
            imageBase64 = Buffer.from (clinic.image, 'base64').toString('binary');
        }
        
        this.setState({
            name: clinic.name,
            address: clinic.address,
            description: clinic.description,
            area: clinic.area,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            clinicEditId: clinic.id
        })
    }


    render() {
        let language = this.props.language
        let areas = this.state.areaArr;
        let isGetGenders = this.props.isLoadingGender;
        let { name, address,description, area,avatar} = this.state;
        return (
            <div className="user-redux-container" >
                <div className="title">
                <FormattedMessage id="manage-clinic.add"/>
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            {/* <div className="col-12">{isGetGenders === true ? 'Loading gender': ''}</div> */}
                            <div className="col-6 mt-3">
                                <label> <FormattedMessage id="manage-clinic.name"/></label>
                                <input className="form-control" type="text" placeholder="abc..." 
                                value={name}
                                onChange={(event) => {this.OnChageInput(event, "name")}}
                                ></input>
                            </div>

                            <div className="col-6 mt-3">
                                <label> <FormattedMessage id="manage-clinic.address"/></label>
                                <input className="form-control" type="text" 
                                value={address}
                                onChange={(event) => {this.OnChageInput(event, "address")}}
                                ></input>
                            </div>
                            <div className="col-12 mt-3">
                                <label> <FormattedMessage id="manage-clinic.description"/></label>
                                <input className="form-control" type="text" 
                                value={description}
                                onChange={(event) => {this.OnChageInput(event, "description")}}
                                ></input>
                            </div>
                           
                            
                            <div className="col-3 mt-3">
                                <label> <FormattedMessage id="manage-clinic.area"/></label>
                                <select className="form-control"
                                 onChange={(event) => {this.OnChageInput(event, "area")}}
                                 value={area}
                                >
                                {areas && areas.length > 0 && areas.map((item,index)=>{
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
                                <label> <FormattedMessage id="manage-clinic.image"/></label>
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
                                    onClick={()=> this.handleSaveClinic()}
                                > 
                                {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-clinic.edit"/> : <FormattedMessage id="manage-clinic.save"/>}
                                </button>
                            </div>
                            <div className="col-12 mb-5 mt-5">
                                <TableManageClinic
                                    handleEditClinicFromParentKey = {this.handleEditClinicFromParent}
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
        areaRedux: state.admin.areas,
        isLoadingGender: state.admin.isLoadingGender,
        listClinics: state.admin.clinics
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAreaStart: () => dispatch(actions.fetchAreaStart()),
        createNewClinic: (data) => dispatch(actions.createNewclinic(data)),
        fetchClinicRedux: () => dispatch(actions.fetchAllClinicsStart()),
        editClinicRedux: (data) => dispatch(actions.editClinicRedux(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicRedux);
