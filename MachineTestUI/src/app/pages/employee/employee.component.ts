import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ApiService }
from '../../services/api.service';

@Component({

standalone:true,

imports:
[
CommonModule
],

templateUrl:
'./employee.component.html',

styleUrl:'./employee.component.css'

})

export class EmployeeComponent
{

list:any[]=[];

constructor(
private api:
ApiService
)
{

this.load();

}

load()
{

this.api
.employee()

.subscribe(
(res:any)=>
{

this.list=
res;

console.log(
res
);

}

);

}

}
