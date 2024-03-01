using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Sedna.Poc.Data;
using Sedna.Poc.Lib.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

var config = builder.Configuration;

var connectionString = $"Host={config["DB:Host"]};" +
                       $"Database={config["DB:Database"]};" +
                       $"Username={config["DB:Username"]};" +
                       $"Password={config["DB:Password"]};";

builder.Services.AddDbContext<SednaDbContext>(options =>
{
    options.UseNpgsql(connectionString);
    options.UseSnakeCaseNamingConvention();
});

builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ContractResolver = new DefaultContractResolver
    {
        NamingStrategy = new SnakeCaseNamingStrategy()
    };
    options.SerializerSettings.DateFormatString = "yyyy-MM-dd";
    options.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter());
    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
});


builder.Services.AddCognitoIdentity();

var awsRegion = config["AWS:Cognito:Region"];
var userPoolId = config["AWS:Cognito:UserPoolId"];
var appClientId = config["AWS:Cognito:AppClientId"];
var cognitoUrl = $"https://cognito-idp.{awsRegion}.amazonaws.com/{userPoolId}";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.Authority = cognitoUrl;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = cognitoUrl,
        ValidateIssuerSigningKey = true,
        ValidateLifetime = true,
        ValidAudience = appClientId,
        ValidateAudience = true
    };
});

builder.Services.AddAuthorization();

builder.Services.AddScoped<UserService, UserService>();

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();