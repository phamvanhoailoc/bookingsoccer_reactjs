import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import Select from 'react-select';
import './ManageDetailClinic.scss';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getAllDetailClinics } from '../../../services/userService';


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
// function handleEditorChange({ html, text }) {
//   console.log('handleEditorChange', html, text);
// }
   

class ManageDetailClinic extends Component {


    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown:'',
            contentHTML:'',
            selectedOption:'',
            description:'',
            listpitch:[],
            hasOldData: false,
        }
    }

    componentDidMount() {
        this.props.fetchClinicRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
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


    OnChageInput = (event, id)=>{
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        }
        )
    }

    
 
    handleSaveContentMarkdown = () => {
        let {hasOldData} = this.state;
        this.props.createNewDetailclinic({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            ClinicId: this.state.selectedOption.data,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
        })
        // console.log('check',this.state)
        
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({selectedOption},() => {
            // console.log('change',this.state.selectedOption)
        });

        let res = await getAllDetailClinics(selectedOption.data);
        if(res && res.errCode === 0 && res.data && res.data.Markdown){
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        }else{
            this.setState({
                contentHTML:'',
                contentMarkdown:'',
                description:'',
                hasOldData: false
            })
        }
    };


    handleEditorChage = ({html, text}) => {
       this.setState({
        contentMarkdown: text,
        contentHTML: html,
       })
        
    }

    handleOnchangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
   
    render() {
        let {hasOldData} = this.state;
        let {listpitch,description,selectedOption} = this.state;
        return (
            <div className="manage-clinic-content" >
               <div className="manage-clinic-title"><FormattedMessage id="manage-detail-clinic.title"/></div>
               <div className="more-info">
                <div className="content-left form-group">
                    <label><FormattedMessage id="manage-detail-clinic.Choose-a-Court"/></label>
                    <Select
                        value={selectedOption}
                        onChange={this.handleChangeSelect}
                        options={listpitch}
                    />
                </div>
                <div className="content-right form-group">
                    <label><FormattedMessage id="manage-detail-clinic.Introduction-information"/> :</label>
                    <textarea className="form-control" rows="4"
                    onChange={(event) => {this.OnChageInput(event, "description")}}
                     value={description}   
                    >  
                    </textarea>
                </div>
               </div>

               <div className="manage-clinic-editor">
               <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChage} 
                value={this.state.contentMarkdown}
               />
               </div>
               <button
                onClick={()=> this.handleSaveContentMarkdown()}
                className={hasOldData === true ? "save-content-clinic" : "create-content-clinic"}
               >
                {hasOldData === true ? 
                <span><FormattedMessage id="manage-detail-clinic.button-save-information"/></span>:<span><FormattedMessage id="manage-detail-clinic.button-create-information"/></span>
                }
               </button>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        listClinics: state.admin.clinics
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchClinicRedux: () => dispatch(actions.fetchAllClinicsStart()),
        createNewDetailclinic: (data) => dispatch(actions.createNewDetailclinic(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDetailClinic);
