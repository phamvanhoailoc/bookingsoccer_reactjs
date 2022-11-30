import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RemedyModal.scss';
import {LANGUAGES} from '../../../utils';
import {Modal, Button, ModalBody, ModalFooter} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import {toast} from 'react-toastify';
import moment from 'moment';
import {CommonUtils} from '../../../utils';





class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
           email:'',
           imgBase64:''
           
        }
    }

    async componentDidMount() {
       if(this.props.dataModal){
        this.setState({
            email: this.props.dataModal.email
        })
       }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
       if(prevProps.dataModal !== this.props.dataModal){
        this.setState({
            email: this.props.dataModal.email
        })
       }
    }
    handleOnchangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleOnchangeImage = async (event) =>{
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64
            })
        }
    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }



    render() {

        let {isOpenModal, closeRemedyModal, dataModal, sendRemedy} = this.props;
       
        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size="md"
                centered
            >
                <div className="modal-header">
                    <h5 className="modal-title">Gửi hóa đơn thành công</h5>
                    <button type="button" className="close" aria-label="Close" onClick={closeRemedyModal}>
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
               <ModalBody>
                <div className="row">
                    <div className="col-6 form-group">
                        <label>Email khách hàng</label>
                        <input className="form-control" type="email" value={this.state.email} onChange={(event) => this.handleOnchangeEmail(event)}></input>
                    </div>
                    <div className="col-6 form-group">
                        <label>Chọn file hóa đơn</label>
                        <input className="form-control-file" type="file" 
                         onChange={(event) => this.handleOnchangeImage(event)}></input>
                    </div>
                </div>
               </ModalBody>
               <ModalFooter>
                <Button color="primary" onClick={() => this.handleSendRemedy()}>Send</Button>
                <Button color="secondary" onClick={closeRemedyModal}>Cancel</Button>
               </ModalFooter>
            </Modal>
        );
    }

}

const mapStateToProps = state => {
    return {
      
    };
};

const mapDispatchToProps = dispatch => {
    return {
       
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);