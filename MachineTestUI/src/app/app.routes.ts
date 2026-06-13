import { Routes }
from '@angular/router';

import {
LoginComponent
}
from './pages/login/login.component';

import {
DashboardComponent
}
from './pages/dashboard/dashboard.component';

import {
DepartmentComponent
}
from './pages/department/department.component';

import {
EmployeeComponent
}
from './pages/employee/employee.component';

export const routes:
Routes=
[

{
path:'',
component:
LoginComponent
},

{
path:'dashboard',
component:
DashboardComponent
},

{
path:'department',
component:
DepartmentComponent
},

{
path:'employee',
component:
EmployeeComponent
}

];
