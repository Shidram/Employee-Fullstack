import React, { Component } from 'react';
import axios from 'axios';
import CustomModal from './Modal';

class Employees extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             employeesList:[],
             modal: false,
             search:"",
             isSearch:false,
             activeEmployee:{
                firstname:"",
                lastname:"",
                Date_of_joining:"",
                department:"",
                address:"",
                city:"",
             }
        }
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList = () =>{
        const isSearchString = this.state.isSearch
        const searchPattern = this.state.search

        if(isSearchString){
            axios
            .post(`/employee/search/${searchPattern}`)
            .then( (res) => 
                this.setState({employeesList:res.data.data})
            )
            .catch((err) => console.log(err));

        } else {
            axios
            .get('/employee/')
            .then(
                (res) => 
                this.setState({employeesList:res.data.data})
            )
            .catch((err) => console.log(err))
        }
    }

    toggle = () => {
        this.setState({modal:!this.state.modal})
    }

    handleSubmit = (employee) =>{
        this.toggle();

        if(employee.id){
            axios
            .post(`/employee/update/${employee.id}`, employee)
            .then((res)=>this.refreshList())
            return;
        }
        axios
        .post('/employee/', employee)
        .then((res) => this.refreshList())
    }

    createEmployee = () => {
        const employee = {firstname:"",lastname:"",Date_of_joining:"",department:"",address:"",city:""}
        this.setState({activeEmployee:employee , modal:!this.state.modal})
    }

    editEmployee = (employee) => {
        this.setState({ activeEmployee: employee, modal: !this.state.modal })
    }

    handleSearchChange(e){        
        this.setState({
            search:e.target.value,
            isSearch:true
        })
    }

    handleSearch = (searchTerm) => {
            this.refreshList()
            this.setState({isSearch:false, search:''})
    }

    handleDelete = (employee) => {
        axios
        .post(`/employee/delete/${employee.id}`)
        .then((res) => this.refreshList())
    }

    renderItems = () => {
        const employees = this.state.employeesList.filter(
            (employee)=> employee
        );

        return employees.map(
            (employee) => (
                <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.firstname}</td>
                    <td>{employee.lastname}</td>
                    <td>{employee.Date_of_joining}</td>
                    <td>{employee.department}</td>
                    <td>
                        <button className="btn btn-secondary mr-2" 
                            onClick={()=>this.editEmployee(employee)}>Edit</button>

                        <button className="btn btn-danger"
                            onClick={()=>this.handleDelete(employee)}
                        >Delete</button>
                    </td>
                </tr>
            )
        )
    }

    render() {
        return (
            <>
            <div className="container">
                <h2><b>Manage Employees</b></h2>
                <hr/>
                <div className="row">
                    <div className="col-8">                          
                        <div className="row">                            
                            <div className="col- col-md-10">
                                <input type="text" 
                                    className="form-control" 
                                    name="tag" 
                                    id="tag"  
                                    placeholder="Search like fieldname: partial_or_full_text (example search -> firstname: abc)"
                                    value={this.state.search}
                                    onChange={(e) => this.handleSearchChange(e)}
                                    />
                            </div>
                            <div className="col- col-md-2" align="left">
                                <input 
                                    type="submit" 
                                    value='Search'
                                    className="form-control btn btn-primary " 
                                    onClick={()=>this.handleSearch()}
                                    /> 
                            </div>  
                        </div>
                    </div>
                    <div className="col-4">
                        <button type="button" className="btn btn-dark float-right" 
                            onClick={this.createEmployee}><b>Add New Employees</b>
                        </button>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <table id="example" className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>firstname</th>
                                <th>lastname</th>
                                <th>date_of_joining</th>
                                <th>department</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderItems()}
                        </tbody>
                        </table>
                    </div>
                </div>
                {this.state.modal ? (
                    <CustomModal activeEmployee={this.state.activeEmployee}
                    toggle={this.toggle}
                    onSave={this.handleSubmit}
                />
                ):null}
            </div>
          </>
        )
    }
}

export default Employees
