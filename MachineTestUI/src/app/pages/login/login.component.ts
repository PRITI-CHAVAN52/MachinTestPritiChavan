import {
Component
}
from '@angular/core';

import {
FormsModule
}
from '@angular/forms';

import {
Router
}
from '@angular/router';

import {
ApiService
}
from '../../services/api.service';

@Component({

selector:
'app-login',

standalone:
true,

imports:
[
FormsModule
],

templateUrl:
'./login.component.html',

styleUrls:
[
'./login.component.css'
]

})

export class LoginComponent
{

loginObj:any=
{

email:'',

password:''

};

constructor(

private api:
ApiService,

private router:
Router

)
{}

login()
{

this.api
.login(
this.loginObj
)
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
'Login Successful'
);

this.router.navigate(
[
'/dashboard'
]
);

},

error:
()=>
{

alert(
'Invalid Credentials'
);

}

});

}

}
