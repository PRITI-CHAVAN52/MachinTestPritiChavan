import { Injectable } from '@angular/core';

import {
HttpClient,
HttpHeaders
}
from '@angular/common/http';

@Injectable({
providedIn:'root'
})

export class ApiService {

url=
'https://localhost:7140/api/Master/';

constructor(
private http:
HttpClient
)
{}

getHeaders()
{

return{

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
this.url+'Login',
data
);
}

dashboard()
{
return this.http.get(
this.url+'Dashboard',
this.getHeaders()
);
}

department()
{
return this.http.get(
this.url+'GetDepartment',
this.getHeaders()
);
}

addDepartment(data:any)
{
return this.http.post(
this.url+'AddDepartment',
data,
this.getHeaders()
);
}

updateDepartment(data:any)
{
return this.http.put(
this.url+'UpdateDepartment',
data,
this.getHeaders()
);
}

deleteDepartment(id:number)
{
return this.http.delete(
this.url+
'DeleteDepartment/'+id,
this.getHeaders()
);
}

employee()
{
return this.http.get(
this.url+
'GetEmployee',
this.getHeaders()
);
}

addEmployee(data:any)
{
return this.http.post(
this.url+
'AddEmployee',

data,

this.getHeaders()

);
}

updateEmployee(data:any)
{
return this.http.put(
this.url+
'UpdateEmployee',

data,

this.getHeaders()

);
}

deleteEmployee(id:number)
{
return this.http.delete(
this.url+
'DeleteEmployee/'+id,

this.getHeaders()

);
}

report()
{
return this.http.get(
this.url+
'Report',
this.getHeaders()
);
}

}
