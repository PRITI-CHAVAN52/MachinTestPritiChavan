using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using Microsoft.IdentityModel.Tokens;

namespace MachineTestAPI.Helpers
{
    public class JwtService
    {
        private readonly IConfiguration config;

        public JwtService(IConfiguration config)
        {
            this.config = config;
        }

        public string GenerateToken(
            string email,
            string role
        )
        {
            var claims =
            new[]
            {
                new Claim(
                    ClaimTypes.Email,
                    email
                ),

                new Claim(
                    ClaimTypes.Role,
                    role
                )
            };

            var key =
            new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    config["Jwt:Key"]
                )
            );

            var credentials =
            new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            );

            var token =
            new JwtSecurityToken(
                issuer:
                config["Jwt:Issuer"],

                audience:
                config["Jwt:Audience"],

                claims:
                claims,

                expires:
                DateTime.Now.AddHours(8),

                signingCredentials:
                credentials
            );

            return
            new JwtSecurityTokenHandler()
            .WriteToken(token);
        }
    }
}