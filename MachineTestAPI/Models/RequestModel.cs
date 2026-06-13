namespace MachineTestAPI.Models
{
    public class RequestModel
    {
        public string Action { get; set; }

        public int UserId { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string RoleName { get; set; }

        public int DepartmentId { get; set; }

        public string DepartmentName { get; set; }

        public string Description { get; set; }

        public int EmployeeId { get; set; }

        public string EmployeeCode { get; set; }

        public string EmployeeName { get; set; }

        public string Designation { get; set; }

        public string Email { get; set; }

        public string MobileNo { get; set; }

        public DateTime? JoiningDate { get; set; }

        public bool Status { get; set; }

    }
}