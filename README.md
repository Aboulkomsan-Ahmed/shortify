# Shortly.NET

A lightweight URL shortener and analytics API built with C# .NET Core and React. This project allows users to convert long URLs into short, branded links and track basic click analytics.

## Features

- **URL Shortening:** Generate unique 6-character short codes for any given URL.
- **Analytics Dashboard:** (Upcoming) Track click counts, user locations, and referrer data.
- **Custom URL Aliases:** (Optional future feature) Allow users to create custom short links.
- **QR Code Generation:** (Upcoming) Automatically generate QR codes for shortened URLs.
- **RESTful API:** Easily integrate with external applications.

## Tech Stack

- **Backend:** C# .NET Core Web API, Entity Framework Core
- **Database:** SQL Server (LocalDB for development, configurable for production)
- **Frontend:** React with Material UI (separate repo or folder, if applicable)
- **Documentation:** Swagger for API exploration

## Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [SQL Server Express/LocalDB](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- Optional: [Node.js](https://nodejs.org/) if working on the React frontend

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/shortly-dotnet.git
   cd shortly-dotnet
   ```

2. **Configure the Database Connection:**

In appsettings.json, update the connection string:

```bash
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=UrlShortenerDB;Trusted_Connection=True;"
}
```

3. **Apply Database Migrations:**

Run the following commands to create the database schema:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

4. **Run the API:**

Start the API with:

```bash
dotnet run
```

The API will be available at https://localhost:5001 (or the specified port).

5. **Explore the API Documentation:**

Swagger UI is available at https://localhost:5001/swagger for testing endpoints.


### API Endpoints

POST /api/urlshortener/shorten
* Description: Shortens a given URL.
* Request Body: A string containing the original URL.
* Response: Returns the shortened URL, e.g., https://yourdomain.com/abc123.

Additional endpoints for redirection and analytics can be added in future iterations.

### Future Enhancements

* Implement user authentication for managing personal links.
* Develop a frontend using React to complement the API.
* Add advanced analytics and reporting features.
* Introduce custom alias functionality and QR code generation.

### Contributing

Contributions are welcome! If you want to contribute, please fork the repository and submit a pull request with your proposed changes.

### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Contact

For any questions or suggestions, please open an issue or contact ahmed.aboulkomsan@gmail.com.

