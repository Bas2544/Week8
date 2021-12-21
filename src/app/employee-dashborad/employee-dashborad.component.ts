import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'
import { EmployeeModels } from './employee-dashboard.models';
import { ApiService } from '../shared/api.service'
import Swal from 'sweetalert2';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-employee-dashborad',
  templateUrl: './employee-dashborad.component.html',
  styleUrls: ['./employee-dashborad.component.css']
})
export class EmployeeDashboradComponent implements OnInit {
  formEmployee!: FormGroup;
  employeeModel: EmployeeModels = new EmployeeModels();
  employeeData: any
  showAdd!: boolean
  showUpdate!: boolean


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.formEmployee = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      telephone: new FormControl(),
      salary: new FormControl(),
    }) 
    this.getEmployee()
  }

  postemployee(){
    this.employeeModel.firstname = this.formEmployee.value.firstName
    this.employeeModel.lastName = this.formEmployee.value.lastName
    this.employeeModel.email = this.formEmployee.value.email
    this.employeeModel.telephone = this.formEmployee.value.telephone
    this.employeeModel.salary = this.formEmployee.value.salary
    // console.log(this.employeeModel)
    this.api.postEmployee(this.employeeModel)
    .subscribe(res=>{
      Swal.fire("Complete","Add Employee","success")
      this.getEmployee()
      let close = document.getElementById("close")
      close!.click()
    },
    err=>{
      Swal.fire("Error","Add Employee Error","error")
    })
  }

  getEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData =res;
    },)
  }

  deleteEmployee(id: number){
    this.api.deleteEmployee(id)
    .subscribe(res=>{
      Swal.fire("Complete","Delete Employee Complete","success")
      this.getEmployee()
    },
    err=>{
      Swal.fire("Error","Delete Employee Error","error")
    })
  }

  clickAdd(){
    this.formEmployee.reset()
    this.showAdd = true
    this.showUpdate = false
    this.employeeData.id = 0
  }

  clickEdit(data: any){
    this.showAdd = false
    this.showUpdate = true
    this.employeeData.id= data.id
    this.formEmployee.controls['firstName'].setValue(data.firstname)
    this.formEmployee.controls['lastName'].setValue(data.lastName)
    this.formEmployee.controls['email'].setValue(data.email)
    this.formEmployee.controls['telephone'].setValue(data.telephone)
    this.formEmployee.controls['salary'].setValue(data.salary)
    
  }

  updateEmployee(){
    this.employeeModel.firstname = this.formEmployee.value.firstName
    this.employeeModel.lastName = this.formEmployee.value.lastName
    this.employeeModel.email = this.formEmployee.value.email
    this.employeeModel.telephone = this.formEmployee.value.telephone
    this.employeeModel.salary = this.formEmployee.value.salary
    this.api.updateEmployee(this.employeeData.id,this.employeeModel)
    .subscribe(res=>{
      Swal.fire("Complete","update Employee Complete","success")
      this.getEmployee()
    },
    err=>{
      Swal.fire("Error","update Employee Error","error")
    })
  }
}
