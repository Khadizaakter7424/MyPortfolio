using PortfolioApi.Services;

var builder = WebApplication.CreateBuilder(args);

const string CorsPolicy = "AllowReactApp";

// The React app (Vite) runs on its own port during development,
// so the API needs to explicitly allow requests from it.
builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicy, policy =>
    {
        var allowedOrigins = builder.Configuration
            .GetSection("Cors:AllowedOrigins")
            .Get<string[]>() ?? new[] { "http://localhost:5173" };

        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IMessageStore, JsonMessageStore>();
builder.Services.AddSingleton<IEmailNotifier, SmtpEmailNotifier>();
builder.Services.AddSingleton<IPortfolioDataProvider, JsonPortfolioDataProvider>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(CorsPolicy);
app.UseStaticFiles(); // serves wwwroot/media/profile.jpg etc.
app.UseAuthorization();
app.MapControllers();

app.Run();
