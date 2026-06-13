using MachineTestAPI.Repository;
using MachineTestAPI.Helpers;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

using System.Text;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();

builder.Services.AddScoped<MasterRepository>();

builder.Services.AddScoped<JwtService>();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc(
        "v1",
        new OpenApiInfo
        {
            Title = "MachineTestAPI",
            Version = "v1"
        });

    options.AddSecurityDefinition(
        "Bearer",
        new OpenApiSecurityScheme
        {
            Name = "Authorization",

            Type = SecuritySchemeType.Http,

            Scheme = "bearer",

            BearerFormat = "JWT",

            In = ParameterLocation.Header,

            Description =
            "Enter: Bearer {token}"
        });

    options.AddSecurityRequirement(
        new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference =
                    new OpenApiReference
                    {
                        Type =
                        ReferenceType.SecurityScheme,

                        Id =
                        "Bearer"
                    }
                },

                new string[]{}
            }
        });

});

builder.Services
.AddAuthentication(
JwtBearerDefaults.AuthenticationScheme
)

.AddJwtBearer(o =>
{
    o.TokenValidationParameters =
    new TokenValidationParameters
    {
        ValidateIssuer = true,

        ValidateAudience = true,

        ValidateLifetime = true,

        ValidateIssuerSigningKey = true,

        ValidIssuer =
        builder.Configuration["Jwt:Issuer"],

        ValidAudience =
        builder.Configuration["Jwt:Audience"],

        IssuerSigningKey =
        new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(
                builder.Configuration["Jwt:Key"]
            )
        )
    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "x",
        policy =>
        policy
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod()
    );
});



var app = builder.Build();

app.UseSwagger();

app.UseSwaggerUI();

app.UseCors("x");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();