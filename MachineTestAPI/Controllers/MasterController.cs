using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using MachineTestAPI.Models;

using MachineTestAPI.Repository;

using MachineTestAPI.Helpers;

namespace MachineTestAPI.Controllers
{

    [Route("api/[controller]")]

    [ApiController]

    public class MasterController : ControllerBase
    {

        private readonly MasterRepository repo;

        private readonly JwtService jwt;

        public MasterController(MasterRepository repo,JwtService jwt)
        {
            this.repo = repo;

            this.jwt = jwt;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register ( RequestModel model )
        {

            model.Action = "REGISTER";

            var data =
            await repo
            .ExecuteSP(model);

            return Ok
            (
            new
            {
                message =
            "Registered Successfully"
            }
            );

        }
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginModel login)
        {
            RequestModel model = new();

            model.Action = "LOGIN";

            model.Email = login.Email;

            model.Password = login.Password;

            var result =
            await repo.ExecuteSP(model);

            var user =
            result.FirstOrDefault();

            if (user == null)
            {
                return Unauthorized(
                    new
                    {
                        message =
                        "Invalid Email Or Password"
                    }
                );
            }

            string token =
            jwt.GenerateToken(
                user.Email,
                user.RoleName
            );

            return Ok(
                new
                {
                    token,
                    role =
                    user.RoleName
                }
            );
        }


        [Authorize]
        [HttpPost]
        [Route("AddDepartment")]
        public async Task<IActionResult>AddDepartment(RequestModel model)
        {

            model.Action =
            "ADD_DEPT";

            await repo
            .ExecuteSP(model);

            return Ok
            (
            "Department Added"
            );

        }


        [Authorize]
        [HttpGet]
        [Route("GetDepartment")]

        public async Task<IActionResult>GetDepartment()
        {

            RequestModel model =
            new();

            model.Action =
            "GET_DEPT";

            var data =
            await repo
            .ExecuteSP(model);

            return Ok
            (
            data
            );

        }


        [Authorize]
        [HttpPost]
        [Route("AddEmployee")]

        public async Task<IActionResult>AddEmployee(RequestModel model)
        {

            model.Action =
            "ADD_EMP";

            await repo
            .ExecuteSP(model);

            return Ok
            (
            "Employee Added"
            );

        }

        [Authorize]
        [HttpGet]
        [Route("GetEmployee")]

        public async Task<IActionResult> GetEmployee()
        {

            RequestModel model =
            new();

            model.Action =
            "GET_EMP";

            var data =
            await repo
            .ExecuteSP(model);

            return Ok
            (
            data
            );

        }


        [Authorize]
        [HttpGet]
        [Route("Dashboard")]

        public async Task<IActionResult> Dashboard()
        {

            RequestModel model =
            new();

            model.Action =
            "DASHBOARD";

            var data =
            await repo
            .ExecuteSP(model);

            return Ok
            (
            data
            );

        }

        [Authorize]
        [HttpGet]
        [Route("Report")]

        public async Task<IActionResult> Report()
        {

            RequestModel model =
            new();

            model.Action =
            "REPORT";

            var data =
            await repo
            .ExecuteSP(model);

            return Ok
            (
            data
            );

        }

    }

}