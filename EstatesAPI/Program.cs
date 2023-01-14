using EstatesAPI.Models;
using EstatesAPI.Services;

namespace EstatesAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CORS",
                                policy =>
                                {
                                    policy.WithOrigins("http://localhost:5500",
                                                "https://localhost:3000",
                                                "https://localhost:5500",
                                                "https://127.0.0.1:5500",
                                                "http://localhost:3000",
                                                "http://localhost:5100",
                                                "https://localhost:5100",
                                                "https://127.0.0.1:5100")
                                                .AllowAnyHeader()
                                    .AllowAnyMethod()
                                    .AllowCredentials();
                                    // policy.AllowAnyOrigin();
                                    // policy.AllowAnyHeader();
                                });
            });

            // Add services to the container.
            builder.Services.Configure<EstateDatabaseSettings>(
                builder.Configuration.GetSection("EstateDB"));

            builder.Services.AddSingleton<PropertyService>();
            builder.Services.AddSingleton<LandlordService>();
            builder.Services.AddSingleton<ClientService>();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseCors("CORS");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}