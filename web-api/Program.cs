using web_api;
using System.Text.Json;

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

app.MapGet("/topics", () =>
{
    var json = File.ReadAllText("Data/topics.json");
    return Results.Content(json, "application/json");
});

app.MapGet("/topics/{topicId}/catalogs", (string topicId) =>
{
    var json = File.ReadAllText($"Data/{topicId}/catalogs.json");
    return Results.Content(json, "application/json");
});

app.MapGet("/topics/{topicId}/catalogs/{catalogId}/questions", (string topicId, string catalogId) =>
{
    var catalogsJson = File.ReadAllText($"Data/{topicId}/catalogs.json");

    var options = new JsonSerializerOptions
{
    PropertyNameCaseInsensitive = true
};

var catalogs = JsonSerializer.Deserialize<List<Catalog>>(catalogsJson, options);

    var catalog = catalogs?.FirstOrDefault(c => c.Id == catalogId);

    if (catalog == null)
    {
        return Results.NotFound();
    }

    var questionsJson = File.ReadAllText($"Data/{topicId}/{catalog.File}");

    return Results.Content(questionsJson, "application/json");
});

app.Run();
