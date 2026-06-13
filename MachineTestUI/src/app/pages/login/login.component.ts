import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { ApiService }
from '../../services/api.service';

@Component({

selector:'app-login',

standalone:true,

imports:
[
FormsModule
],

templateUrl:
'./login.component.html'

})

export class LoginComponent
{

email='';

password='';

constructor(

private api:
ApiService,

private router:
Router

){}

login()
{

const body=
{

email:
this.email,

password:
this.password

};

this.api
.login(body)

.subscribe({

next:
(res:any)=>
{

localStorage.setItem(
'token',
res.token
);

localStorage.setItem(
'role',
res.role
);

alert(
'Login Success'
);

this.router.navigate(
[
'/dashboard'
]
);

},

error:()=>
{

alert(
'Invalid Login'
);

}

});

}

}
