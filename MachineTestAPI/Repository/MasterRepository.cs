using Dapper;

using Microsoft.Data.SqlClient;

using MachineTestAPI.Models;

using System.Data;

namespace MachineTestAPI.Repository
{
    public class MasterRepository
    {
        private readonly IConfiguration config;

        public MasterRepository(IConfiguration config)
        {
            this.config = config;
        }

        public async Task<List<dynamic>> ExecuteSP(RequestModel model)
        {
            using var con =new SqlConnection( config.GetConnectionString( "DefaultConnection" ));

            DynamicParameters p = new();

            p.Add("@Action", model.Action);

            p.Add("@UserId", model.UserId);

            p.Add("@UserName", model.UserName);

            p.Add("@Password", model.Password);

            p.Add("@Email", model.Email);

            p.Add("@RoleName", model.RoleName);

            p.Add("@DepartmentId", model.DepartmentId);

            p.Add("@DepartmentName", model.DepartmentName);

            p.Add("@Description", model.Description);

            p.Add("@EmployeeId", model.EmployeeId);

            p.Add("@EmployeeCode", model.EmployeeCode);

            p.Add("@EmployeeName", model.EmployeeName);

            p.Add("@Designation", model.Designation);

            p.Add("@MobileNo", model.MobileNo);

            p.Add("@JoiningDate", model.JoiningDate);

            p.Add("@Status", model.Status);

            var result =
            (
                await con.QueryAsync(
                    "SP_Master",
                    p,
                    commandType:
                    CommandType.StoredProcedure
                )
            ).ToList<dynamic>();

            return result;
        }
    }
}