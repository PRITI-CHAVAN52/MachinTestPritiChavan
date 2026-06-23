import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { ApiService }
from '../../services/api.service';

@Component({

selector:
'app-employee',

standalone:true,

imports:[
CommonModule,
FormsModule
],

templateUrl:
'./employee.component.html',

styleUrls:[
'./employee.component.css'

]

})

export class EmployeeComponent
{

list:any=[];

edit=false;

employee:any=
{

EmployeeId:0,

EmployeeCode:'',

EmployeeName:'',

Designation:'',

Email:'',

MobileNo:'',

DepartmentId:1,

Status:true

};

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
.subscribe({

next:(res:any)=>
{

this.list=res;

},

error:(e)=>
{

console.log(e);

}

});

}

save()
{

const data=
{

Action:'',

UserId:0,

UserName:'NA',

Password:'NA',

RoleName:'NA',

DepartmentId:
this.employee.DepartmentId,

DepartmentName:'NA',

Description:'NA',

EmployeeId:
this.employee.EmployeeId,

EmployeeCode:
this.employee.EmployeeCode,

EmployeeName:
this.employee.EmployeeName,

Designation:
this.employee.Designation,

Email:
this.employee.Email,

MobileNo:
this.employee.MobileNo,

JoiningDate:
new Date(),

Status:
this.employee.Status

};

if(this.edit)
{

this.api
.updateEmployee(data)
.subscribe({

next:()=>
{

alert(
'Employee Updated Successfully'
);

this.reset();

this.load();

},

error:(e)=>
{

console.log(e);

if(
e.status===200
||
e.status===204
)
{

alert(
'Employee Updated Successfully'
);

this.reset();

this.load();

}
else
{

alert(
'Update Failed'
);

}

}

});

}

else
{

this.api
.addEmployee(data)
.subscribe({

next:()=>
{

alert(
'Employee Added Successfully'
);

this.reset();

this.load();

},

error:(e)=>
{

console.log(e);

if(
e.status===200
||
e.status===204
)
{

alert(
'Employee Added Successfully'
);

this.reset();

this.load();

}
else
{

alert(
'Add Failed'
);

}

}

});

}

}

editData(x:any)
{

this.edit=true;

this.employee=
{
...x
};

}

delete(id:number)
{

if(
confirm(
'Delete Employee?'
)
)
{

this.api
.deleteEmployee(id)
.subscribe({

next:()=>
{

alert(
'Employee Deleted Successfully'
);

this.load();

},

error:(e)=>
{

console.log(e);

if(
e.status===200
||
e.status===204
)
{

alert(
'Employee Deleted Successfully'
);

this.load();

}
else
{

alert(
'Delete Failed'
);

}

}

});

}

}
reset()
{

this.edit=false;

this.employee=
{

EmployeeId:0,

EmployeeCode:'',

EmployeeName:'',

Designation:'',

Email:'',

MobileNo:'',

DepartmentId:1,

Status:true

};

}

}
