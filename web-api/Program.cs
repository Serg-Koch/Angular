var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "TodoAPI";
    config.Title = "TodoAPI v1";
    config.Version = "v1";
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("Angular", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors("Angular");
if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.DocumentTitle = "TodoAPI";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });
}

app.MapGet("/questions/lpic101", () =>
{
    var json = File.ReadAllText("Data/lpic101b.json");
    return Results.Content(json, "application/json");
});
app.MapGet("/questions/lpic102", () =>
{
    var json = File.ReadAllText("Data/lpic102b.json");
    return Results.Content(json, "application/json");
});

app.Run();
