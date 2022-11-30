import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageClinic.scss';
import * as actions from "../../../store/actions"
class TableManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clinicsRedux: [],
            
        }
    }

     componentDidMount() {
         this.props.fetchClinicRedux();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.listClinics !== this.props.listClinics){
            this.setState({
                clinicsRedux: this.props.listClinics,
            })
        }
        
    }

    handleDeleteClinic = (clinic) => {
        this.props.deleteClinicRedux(clinic.id);
    }

    handleEditClinic = (clinic) => {
        this.props.handleEditClinicFromParentKey(clinic);
    }
  

    render() {

        let arrClinics = this.state.clinicsRedux;
        return (
                <table id="TableManageUser">
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Area</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                        {arrClinics && arrClinics.length > 0 && arrClinics.map((item, index) =>{
                            return(
                                <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.address}</td>
                                <td>{item.area}</td>
                                <td>{item.description}</td>
                                <td>
                                    <button className="btn-edit" onClick={() => this.handleEditClinic(item)}><i className="fas fa-pencil-alt"></i></button>
                                    <button className="btn-delete" onClick={() => this.handleDeleteClinic(item)}><i className="fas fa-trash-alt"></i></button>
                                </td>
                                </tr>
                            )
                        })}
                        
                        </tbody>
                </table>
   
        );
    }

}

const mapStateToProps = state => {
    return {
        listClinics: state.admin.clinics,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchClinicRedux: () => dispatch(actions.fetchAllClinicsStart()),
        deleteClinicRedux: (id) => dispatch(actions.deleteClinicRedux(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinic);
