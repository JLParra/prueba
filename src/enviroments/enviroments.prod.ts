export const enviroment = {
    production: true,
    API: 'http://localhost:5197/api/'

    //     //Local
    // Scaffold-DbContext "Server=DESKTOP-FJ6E75V\SQLEXPRESS; 
    // DataBase=DBPrueba; 
    // User=DESKTOP-FJ6E75V\Development; 
    // Password=;Trusted_Connection=True; 
    // TrustServerCertificate=True;" Microsoft.EntityFrameworkCore.SqlServer -OutPutDir Models
    // // ONLINE
    // Scaffold-DbContext "Data Source=dbCustomers.mssql.somee.com;
    // Initial Catalog=dbCustomers;
    // user id=jeffolp_SQLLogin_1;
    // pwd=taiawtdc6y;TrustServerCertificate=True;
    // "Microsoft.EntityFrameworkCore.SqlServer -OutPutDir Models

    //     builder.Services.AddDbContext<DbpruebaContext>(options =>
    //         options.UseSqlServer(builder.Configuration.GetConnectionString("conexion")));

    // //cors
    // builder.Services.AddCors(options =>
    // {
    //     options.AddPolicy("NuevaPolitica", app =>
    //     {
    //         app.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    //     });

    // });

    // app.UseCors("NuevaPolitica");

}