import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
    } from 'reactstrap';

// import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import {DatePicker} from "reactstrap-date-picker";

class CustomModal extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             activeEmployee: this.props.activeEmployee,
             Date_of_joining:new Date(),
        }
    }

    handleChange = (e) => {
        let { name, value } = e.target;

        const activeEmployee = {...this.state.activeEmployee, [name]:value};
        this.setState({activeEmployee});
    }

    render() {

        const {toggle, onSave } = this.props

        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Employee</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="emp-firstname">First Name</Label>
                            <Input
                                 type="text"
                                 id="emp-firstname"
                                 name="firstname"
                                 value={this.state.activeEmployee.firstname}
                                 onChange={this.handleChange}
                                 placeholder="Enter First Name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="emp-lastname">Last Name</Label>
                            <Input
                                 type="text"
                                 id="emp-lastname"
                                 name="lastname"
                                 value={this.state.activeEmployee.lastname}
                                 onChange={this.handleChange}
                                 placeholder="Enter Last Name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="emp-department">Department</Label>
                            <Input
                                 type="text"
                                 id="emp-department"
                                 name="department"
                                 value={this.state.activeEmployee.department}
                                 onChange={this.handleChange}
                                 placeholder="Enter Department"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="emp-doj">Date_of_joining</Label>
                            
                            <Input
                                 type="text"
                                 id="emp-doj"
                                 name="Date_of_joining"
                                 value={this.state.activeEmployee.Date_of_joining}
                                 onChange={this.handleChange}
                                 placeholder="YYYY-MM-DD"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="emp-address">Address</Label>
                            <Input
                                 type="textarea"
                                 id="emp-address"
                                 name="address"
                                 value={this.state.activeEmployee.address}
                                 onChange={this.handleChange}
                                 placeholder="Enter Address"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="emp-city">City</Label>
                            <Input
                                 type="text"
                                 id="emp-city"
                                 name="city"
                                 value={this.state.activeEmployee.city}
                                 onChange={this.handleChange}
                                 placeholder="Enter city"
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="success"
                        onClick={() => onSave(this.state.activeEmployee)}
                    >
                        Create Employee
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default CustomModal
