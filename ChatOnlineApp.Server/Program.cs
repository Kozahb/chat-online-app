using ChatOnlineApp.Server;
using Microsoft.AspNetCore.SpaServices.Extensions;



var builder = WebApplication.CreateBuilder(args);






builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllersWithViews();
builder.Services.AddSignalR();  
builder.Services.AddSpaStaticFiles(configuration =>{
    configuration.RootPath = "ClientApp/dist/client-app";
    
});

var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.MapHub<ChatHub>("/chatHub");

app.MapFallbackToFile("/index.html");

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "Client app";
    if (app.Environment.IsDevelopment())
    {
        spa.UseProxyToSpaDevelopmentServer("https://localhost:4200");
    }
});

app.Run();
