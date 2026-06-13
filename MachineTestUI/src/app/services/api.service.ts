import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders
}
from '@angular/common/http';
@Injectable({
providedIn:'root'
})

export class ApiService
{

baseUrl=
'https://localhost:7140/api/Master/';

constructor(
private http:HttpClient
){}

getHeader()
{

return {

headers:

new HttpHeaders({

Authorization:
'Bearer '+
localStorage.getItem(
'token'
)

})

};

}

login(data:any)
{
return this.http.post(
this.baseUrl+
'Login',
data
);
}

dashboard()
{
return this.http.get(
this.baseUrl+
'Dashboard',
this.getHeader()
);
}

department()
{
return this.http.get(
this.baseUrl+
'GetDepartment',
this.getHeader()
);
}

employee()
{
return this.http.get(
this.baseUrl+
'GetEmployee',
this.getHeader()
);
}

}
