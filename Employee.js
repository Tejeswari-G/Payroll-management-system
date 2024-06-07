import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Employee.css';

const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        company_name: 'XYZ Pvt Ltd',
        name: '',
        employee_id: '',
        location: '',
        designation: '',
        shift_timing: '',
        salary: '',
        date_of_joining: '',
        email: '',
        address: '',
        phone_number: '',
        extra_working_hours: 0,
        extra_hourly_fees: 0,
        pf: 0,
        income_tax: 0,
    });
    const [totalNetSalaries, setTotalNetSalaries] = useState(0);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/employees/');
            setEmployees(response.data);
        } catch (error) {
            console.error("There was an error fetching the employees!", error);
        }
    };

    // useEffect(() => {
    //     fetchEmployees();
    // }, []);

    useEffect(() => {
        const total = employees.reduce((acc, employee) => acc + employee.net_salary, 0);
        setTotalNetSalaries(total);
    }, [employees]);

    const calculatePF = (salary) => {
        return salary * 0.12;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedFormData = { ...formData, [name]: value };

        if (name === 'salary') {
            const pf = calculatePF(parseFloat(value));
            updatedFormData = { ...updatedFormData, pf: pf.toFixed(2) };
        }

        setFormData(updatedFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { id, ...data } = formData;
            if (id) {
                await axios.put(`http://127.0.0.1:8000/api/employees/${id}/`, data);
            } else {
                await axios.post('http://127.0.0.1:8000/api/employees/', data);
            }
            setFormData({
                company_name: 'XYZ Pvt Ltd',
                name: '',
                employee_id: '',
                location: '',
                designation: '',
                shift_timing: '',
                salary: '',
                date_of_joining: '',
                email: '',
                address: '',
                phone_number: '',
                extra_working_hours: 0,
                extra_hourly_fees: 0,
                pf: 0,
                income_tax: 0,
            });
            fetchEmployees();
        } catch (error) {
            console.error("There was an error submitting the form!", error);
        }
    };

    const handleEdit = (employee) => {
        setFormData(employee);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/employees/${id}/`);
            fetchEmployees();
        } catch (error) {
            console.error("There was an error deleting the employee!", error);
        }
    };

    return (
        <div>
            <h1>Payroll Management System</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="company_name">Company Name</label>
                    <input type="text" id="company_name" name="company_name" value={formData.company_name} onChange={handleChange} disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="name" className="small-label">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="employee_id">Employee ID</label>
                    <input type="text" id="employee_id" name="employee_id" value={formData.employee_id} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="location" className="small-label">Location</label>
                    <select id="location" name="location" value={formData.location} onChange={handleChange} required>
                        <option value="">--Select Location--</option>
                        <option value="Banglore(Whitefield)">Banglore(Whitefield)</option>
                        <option value="Banglore(Electronic City)">Banglore(Electronic City)</option>
                        <option value="Banglore(BTM)">Banglore(BTM)</option>
                        <option value="Mysore">Mysore</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="shift_timing" className="small-label">Shift Timings</label>
                    <select id="shift_timing" name="shift_timing" value={formData.shift_timing} onChange={handleChange} required>
                        <option value="">--Select Shift Timing--</option>
                        <option value="9AM-6PM">9AM-6PM</option>
                        <option value="10AM-7PM">10AM-7PM</option>
                        <option value="3PM-12AM">3PM-12AM</option>
                        <option value="5PM-2AM">5PM-2AM</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="designation" className="small-label">Designation</label>
                    <select id="designation" name="designation" value={formData.designation} onChange={handleChange} required>
                        <option value="">--Select Designation--</option>
                        <option value="Manager">Manager</option>
                        <option value="Developer">Developer</option>
                        <option value="Tester">Tester</option>
                        <option value="Software Engineer">Software Engineer</option>
                        <option value="Deputy Manager">Deputy Manager</option>
                        <option value="Human Resource">Human Resource</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="salary" className="small-label">Basic Pay</label>
                    <input type="number" id="salary" name="salary" value={formData.salary} onChange={handleChange} placeholder="Enter Salary" required />
                </div>
                <div className="form-group">
                    <label htmlFor="date_of_joining" className="small-label">Date of Joining</label>
                    <input type="date" id="date_of_joining" name="date_of_joining" value={formData.date_of_joining} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="small-label">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="address" className="small-label">Address</label>
                    <textarea id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Enter Address" required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone_number" className="small-label">Phone Number</label>
                    <input type="text" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Enter Phone Number" required />
                </div>
                <div className="form-group">
                    <label htmlFor="extra_working_hours" className="small-label">Over Time</label>
                    <input type="number" id="extra_working_hours" name="extra_working_hours" value={formData.extra_working_hours} onChange={handleChange} placeholder="Enter Extra Working Hours" />
                </div>
                <div className="form-group">
                    <label htmlFor="extra_hourly_fees" className="small-label">Shift Allowance Payout</label>
                    <input type="number" id="extra_hourly_fees" name="extra_hourly_fees" value={formData.extra_hourly_fees} onChange={handleChange} placeholder="Enter Extra Hourly Fees" />
                </div>
                <div className="form-group">
                    <label htmlFor="pf">Company Contribution to Provident Fund</label>
                    <input type="number" id="pf" name="pf" value={formData.pf} onChange={handleChange} disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="income_tax">Tax</label>
                    <input type="number" id="income_tax" name="income_tax" value={formData.income_tax} onChange={handleChange} />
                </div>
                <button type="submit">Submit</button>
            </form>

            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                         <th>Employe ID</th>
                         <th>Location</th>
                         <th>Designation</th>
                         <th>Salary</th>
                         <th>Date of Joining</th>
                         <th>Email</th>
                         <th>Phone Number</th>
                         <th>Address</th>
                         <th>Net Salary</th>
                         <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                             <td>{employee.name}</td>
                             <td>{employee.employee_id}</td>
                             <td>{employee.location}</td>
                             <td>{employee.designation}</td>
                             <td>{employee.salary}</td>
                             <td>{employee.date_of_joining}</td>
                             <td>{employee.email}</td>
                             <td>{employee.phone_number}</td>
                             <td>{employee.address}</td>
                            <td>{employee.net_salary}</td>
                            <td>
                                <button onClick={() => handleEdit(employee)}>Edit</button>
                                <button onClick={() => handleDelete(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <h2>Total Net Salaries: ${totalNetSalaries}</h2>
            </div>
        </div>
    );
};

export default Employee;
