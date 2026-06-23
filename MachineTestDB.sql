CREATE DATABASE MachineTestDB
GO

USE MachineTestDB
GO

CREATE TABLE Users
(
UserId INT IDENTITY(1,1) PRIMARY KEY,
UserName VARCHAR(100),
Email VARCHAR(200),
PasswordHash VARCHAR(MAX),
RoleName VARCHAR(20),
Status BIT DEFAULT 1
)
GO

CREATE TABLE Departments
(
DepartmentId INT IDENTITY(1,1) PRIMARY KEY,
DepartmentName VARCHAR(100),
Description VARCHAR(500),
Status BIT
)
GO

CREATE TABLE Employees
(
EmployeeId INT IDENTITY(1,1) PRIMARY KEY,
EmployeeCode VARCHAR(50),
EmployeeName VARCHAR(100),
DepartmentId INT,
Designation VARCHAR(100),
Email VARCHAR(200),
MobileNo VARCHAR(20),
JoiningDate DATE,
Status BIT,

FOREIGN KEY
(
DepartmentId
)

REFERENCES
Departments
(
DepartmentId
)

)
GO

INSERT INTO Users
VALUES
(
'Admin',
'[admin@test.com](mailto:admin@test.com)',
'123',
'Admin',
1
)

INSERT INTO Users
VALUES
(
'User',
'[user@test.com](mailto:user@test.com)',
'123',
'User',
1
)

INSERT INTO Departments
VALUES
(
'HR',
'Human Resource',
1
)

INSERT INTO Departments
VALUES
(
'IT',
'Information Technology',
1
)

INSERT INTO Employees
VALUES
(
'EMP001',
'Priti',
1,
'Developer',
'[priti@test.com](mailto:priti@test.com)',
'9999999999',
GETDATE(),
1
)

INSERT INTO Employees
VALUES
(
'EMP002',
'Riya',
2,
'Tester',
'[riya@test.com](mailto:riya@test.com)',
'8888888888',
GETDATE(),
1
)

GO

CREATE OR ALTER PROCEDURE SP_Master

@Action VARCHAR(50),

@UserId INT=NULL,

@UserName VARCHAR(100)=NULL,

@Password VARCHAR(MAX)=NULL,

@RoleName VARCHAR(20)=NULL,

@DepartmentId INT=NULL,

@DepartmentName VARCHAR(100)=NULL,

@Description VARCHAR(500)=NULL,

@EmployeeId INT=NULL,

@EmployeeCode VARCHAR(50)=NULL,

@EmployeeName VARCHAR(100)=NULL,

@Designation VARCHAR(100)=NULL,

@Email VARCHAR(200)=NULL,

@MobileNo VARCHAR(20)=NULL,

@JoiningDate DATE=NULL,

@Status BIT=NULL

AS

BEGIN

IF @Action='REGISTER'
BEGIN

INSERT INTO Users
VALUES
(
@UserName,
@Email,
@Password,
@RoleName,
1
)

END

IF @Action='LOGIN'
BEGIN

SELECT *

FROM Users

WHERE Email=@Email

AND PasswordHash=@Password

END

IF @Action='ADD_DEPT'
BEGIN

INSERT INTO Departments

VALUES
(
@DepartmentName,
@Description,
@Status
)

END

IF @Action='GET_DEPT'
BEGIN

SELECT *

FROM Departments

END

IF @Action='UPDATE_DEPT'
BEGIN

UPDATE Departments

SET

DepartmentName=@DepartmentName,

Description=@Description,

Status=@Status

WHERE

DepartmentId=@DepartmentId

SELECT 'UPDATED'

END

IF @Action='DELETE_DEPT'
BEGIN

DELETE
FROM Employees

WHERE DepartmentId=@DepartmentId

DELETE
FROM Departments

WHERE DepartmentId=@DepartmentId

SELECT 'DELETED'

END

IF @Action='ADD_EMP'
BEGIN

INSERT INTO Employees

VALUES
(
@EmployeeCode,
@EmployeeName,
@DepartmentId,
@Designation,
@Email,
@MobileNo,
@JoiningDate,
@Status
)

END

IF @Action='GET_EMP'
BEGIN

SELECT

E.*,

D.DepartmentName

FROM Employees E

INNER JOIN Departments D

ON E.DepartmentId=
D.DepartmentId

END

IF @Action='UPDATE_EMP'
BEGIN

UPDATE Employees

SET

EmployeeCode=@EmployeeCode,

EmployeeName=@EmployeeName,

DepartmentId=@DepartmentId,

Designation=@Designation,

Email=@Email,

MobileNo=@MobileNo,

JoiningDate=@JoiningDate,

Status=@Status

WHERE EmployeeId=@EmployeeId

SELECT 'UPDATED'

END

IF @Action='DELETE_EMP'
BEGIN

DELETE

FROM Employees

WHERE EmployeeId=@EmployeeId

SELECT 'DELETED'

END

IF @Action='DASHBOARD'
BEGIN

SELECT

(
SELECT COUNT(*)
FROM Employees
)
AS TotalEmployees,

(
SELECT COUNT(*)
FROM Employees
WHERE Status=1
)
AS ActiveEmployees,

(
SELECT COUNT(*)
FROM Employees
WHERE Status=0
)
AS InactiveEmployees,

(
SELECT COUNT(*)
FROM Departments
)
AS TotalDepartments

END

IF @Action='REPORT'
BEGIN

SELECT

D.DepartmentName,

COUNT(E.EmployeeId)
AS EmployeeCount

FROM Departments D

LEFT JOIN Employees E

ON D.DepartmentId=
E.DepartmentId

GROUP BY
D.DepartmentName

END

END

GO
