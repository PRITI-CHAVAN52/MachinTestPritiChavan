import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({

selector:'app-department',

standalone:true,

imports:[
CommonModule,
FormsModule
],

templateUrl:
'./department.component.html',

styleUrls:[
'./department.component.css'
]

})

export class DepartmentComponent
{

list:any=[];

edit=false;

department:any=
{

DepartmentId:0,

DepartmentName:'',

Description:'',

Status:true

};

constructor(
private api:ApiService
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

this.list=res;

}
);

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
this.department.DepartmentId,

DepartmentName:
this.department.DepartmentName,

Description:
this.department.Description,

EmployeeId:0,

EmployeeCode:'NA',

EmployeeName:'NA',

Designation:'NA',

Email:'a@a.com',

MobileNo:'0000000000',

JoiningDate:
new Date(),

Status:
this.department.Status

};

if(this.edit)
{

this.api
.updateDepartment(data)
.subscribe({

next:()=>
{

alert(
'Department Updated Successfully'
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
'Department Updated Successfully'
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
.addDepartment(data)
.subscribe({

next:()=>
{

alert(
'Department Added Successfully'
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
'Department Added Successfully'
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

this.department=
{

DepartmentId:
x.DepartmentId,

DepartmentName:
x.DepartmentName,

Description:
x.Description,

Status:
x.Status

};

}

delete(id:number)
{

this.api
.deleteDepartment(id)
.subscribe({

next:()=>
{

alert(
'Deleted'
);

this.load();

},

error:(e)=>
{

console.log(e);

alert(
'Delete Successfully'
);

}

});

}

reset()
{

this.edit=false;

this.department=
{

DepartmentId:0,

DepartmentName:'',

Description:'',

Status:true

};

}

}
