Machine Test Project

Technology Used

Backend:
* ASP.NET Core Web API (.NET 8)
* C#
* Dapper
* JWT Authentication

Frontend:
* Angular 17

Database:
* SQL Server
* Stored Procedure

Project Modules

1. Authentication
* User Registration
* Login using JWT Token

2. Department
* Add Department
* Get Department List

3. Employee
* Add Employee
* Get Employee List

4. Dashboard
* Employee and Department Summary

5. Report
* Department wise employee data

Project Structure

MachineTestProject

MachineTestAPI
MachineTestUI
MachineTestDB_Final.sql

Steps to Run

1. Open SQL Server
2. Execute MachineTestDB.sql
3. Open MachineTestAPI
4. Update Connection String in appsettings.json
5. Run API Project
6. Open MachineTestUI
7. Run:
   ng serve
8. Open:
   http://localhost:4200

Notes
* JWT authentication is implemented.
* Single stored procedure is used.
* Angular 17 is used for frontend.
* Project includes Dashboard, Department and Employee modules.
