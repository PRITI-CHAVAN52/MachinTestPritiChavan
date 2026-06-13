
CREATE DATABASE MachineTestDB;
GO
USE MachineTestDB;
GO

CREATE TABLE Users(
 UserId INT IDENTITY(1,1) PRIMARY KEY,
 UserName VARCHAR(100),
 Email VARCHAR(200),
 PasswordHash VARCHAR(MAX),
 RoleName VARCHAR(20),
 Status BIT DEFAULT 1
);

CREATE TABLE Departments(
 DepartmentId INT IDENTITY(1,1) PRIMARY KEY,
 DepartmentName VARCHAR(100),
 Description VARCHAR(500),
 Status BIT
);

CREATE TABLE Employees(
 EmployeeId INT IDENTITY(1,1) PRIMARY KEY,
 EmployeeCode VARCHAR(50),
 EmployeeName VARCHAR(100),
 DepartmentId INT,
 Designation VARCHAR(100),
 Email VARCHAR(200),
 MobileNo VARCHAR(20),
 JoiningDate DATE,
 Status BIT,
 FOREIGN KEY (DepartmentId) REFERENCES Departments(DepartmentId)
);
GO

INSERT INTO Users(UserName,Email,PasswordHash,RoleName,Status)
VALUES
('Admin','admin@gmail.com','Admin@123','Admin',1),
('Priti','pritichavan123@gmail.com','PritiC@123','User',1);

INSERT INTO Departments(DepartmentName,Description,Status)
VALUES
('IT','Software Development',1),
('HR','Human Resources',1),
('Support','Ticket Support',1);

INSERT INTO Employees(EmployeeCode,EmployeeName,DepartmentId,Designation,Email,MobileNo,JoiningDate,Status)
VALUES
('EMP001','Priti',1,'Software Developer','pritichavan123@gmail.com','9876543210','2026-06-12',1),
('EMP002','Sanika',1,'Dot Net Developer','sanika@gmail.com','9876543211','2026-06-10',1),
('EMP003','Riya',2,'HR Executive','riya@gmail.com','9876543212','2026-06-01',0);
GO

CREATE OR ALTER PROCEDURE SP_Master
@Action VARCHAR(50)=NULL,
@UserId INT=NULL,
@UserName VARCHAR(100)=NULL,
@Password VARCHAR(MAX)=NULL,
@RoleName VARCHAR(20)=NULL,
@Email VARCHAR(200)=NULL,
@DepartmentId INT=NULL,
@DepartmentName VARCHAR(100)=NULL,
@Description VARCHAR(500)=NULL,
@EmployeeId INT=NULL,
@EmployeeCode VARCHAR(50)=NULL,
@EmployeeName VARCHAR(100)=NULL,
@Designation VARCHAR(100)=NULL,
@MobileNo VARCHAR(20)=NULL,
@JoiningDate DATE=NULL,
@Status BIT=NULL
AS
BEGIN
IF @Action='LOGIN'
SELECT * FROM Users WHERE Email=@Email AND PasswordHash=@Password;

IF @Action='GET_DEPT'
SELECT * FROM Departments;

IF @Action='GET_EMP'
SELECT E.*,D.DepartmentName
FROM Employees E
JOIN Departments D ON E.DepartmentId=D.DepartmentId;

IF @Action='DASHBOARD'
SELECT
(SELECT COUNT(*) FROM Employees) TotalEmployees,
(SELECT COUNT(*) FROM Employees WHERE Status=1) ActiveEmployees,
(SELECT COUNT(*) FROM Employees WHERE Status=0) InactiveEmployees,
(SELECT COUNT(*) FROM Departments) TotalDepartments;

IF @Action='REPORT'
SELECT D.DepartmentName,COUNT(E.EmployeeId) EmployeeCount
FROM Departments D
LEFT JOIN Employees E ON D.DepartmentId=E.DepartmentId
GROUP BY D.DepartmentName;
END
GO
