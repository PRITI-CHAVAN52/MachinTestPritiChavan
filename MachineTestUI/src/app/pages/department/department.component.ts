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
'./department.component.html'

})

export class DepartmentComponent
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
.department()

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
