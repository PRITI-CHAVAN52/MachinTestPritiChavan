import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService }
from '../../services/api.service';
@Component({
selector:'app-dashboard',
standalone:true,

imports:[CommonModule],
templateUrl:'./dashboard.component.html',
styleUrl:'./dashboard.component.css'

})

export class DashboardComponent
{

data:any;
constructor(
private api:ApiService,
private router:Router

)
{

this.load();

}

load()
{

this.api
.dashboard()

.subscribe(
(res)=>
{

this.data=
res;

}

);

}

goDepartment()
{

this.router.navigate(
[
'/department'
]
);

}

goEmployee()
{

this.router.navigate(
[
'/employee'
]
);

}

logout()
{

localStorage.clear();

this.router.navigate(
[
''
]
);

}

}
