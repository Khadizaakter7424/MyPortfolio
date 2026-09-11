using System.Text.Json;
using PortfolioApi.Models;

namespace PortfolioApi.Services
{
    // All portfolio content (profile, skills, projects, education...) lives here in the backend,
    // persisted to App_Data/portfolio.json. The frontend only ever renders what this returns -
    // it holds no resume content of its own. Edit the JSON file directly (or extend this class
    // with write endpoints later) to update the site without touching any React code.
    public class JsonPortfolioDataProvider : IPortfolioDataProvider
    {
        private readonly string _filePath;
        private readonly SemaphoreSlim _lock = new(1, 1);

        public JsonPortfolioDataProvider(IWebHostEnvironment env)
        {
            var dataDir = Path.Combine(env.ContentRootPath, "App_Data");
            Directory.CreateDirectory(dataDir);
            _filePath = Path.Combine(dataDir, "portfolio.json");

            if (!File.Exists(_filePath))
            {
                var options = new JsonSerializerOptions { WriteIndented = true };
                File.WriteAllText(_filePath, JsonSerializer.Serialize(SeedData(), options));
            }
        }

        public async Task<PortfolioData> GetAsync()
        {
            await _lock.WaitAsync();
            try
            {
                await using var stream = File.OpenRead(_filePath);
                var data = await JsonSerializer.DeserializeAsync<PortfolioData>(stream);
                return data ?? SeedData();
            }
            finally
            {
                _lock.Release();
            }
        }

        private static PortfolioData SeedData() => new()
        {
            Profile = new Profile
            {
                Name = "Khadiza Akter",
                Role = "Aspiring .NET Developer",
                Location = "Kanchpur, Narayanganj, Dhaka",
                Email = "khadizabristy371@gmail.com",
                Phone = "01581-467424",
                GitHub = "https://github.com/Khadizaakter7424",
                LinkedIn = "https://linkedin.com/in/khadiza-akter-04b500395",
                Objective = "Entry-level .NET developer with hands-on project experience in C#, ASP.NET MVC, ASP.NET Core, Entity Framework and SQL Server, built through self-driven coursework projects. Looking to bring solid fundamentals in object-oriented programming and database design to a growing development team, with a commitment to REST API design, Git-based collaboration and clean code.",
                PhotoUrl = "/media/profile.jpg",
                StatusMessage = "Currently in the IsDB-BISEW training programme"
            },
            Skills = new List<SkillGroup>
            {
                new() { Category = "Backend", Items = new() { "C# (.NET / .NET Core)", "ASP.NET MVC", "ASP.NET Core MVC", "ASP.NET Web API", "Entity Framework", "ADO.NET" } },
                new() { Category = "Frontend", Items = new() { "HTML5", "CSS3", "JavaScript", "jQuery", "Bootstrap", "Angular", "React" } },
                new() { Category = "Desktop", Items = new() { "Windows Forms", "Connected & disconnected ADO.NET" } },
                new() { Category = "Database", Items = new() { "MS SQL Server", "T-SQL", "Stored Procedures", "Views", "Triggers" } },
                new() { Category = "Reporting", Items = new() { "Crystal Reports" } },
                new() { Category = "Tools", Items = new() { "Visual Studio", "Git", "GitHub", "VS Code", "Postman", "SQL Server" } },
                new() { Category = "Conceptual knowledge", Items = new() { "Object-Oriented Programming", "ORM" } }
            },
            Projects = new List<Project>
            {
                new()
                {
                    Name = "University Admission & Student Management System",
                    Description = new() {
                        "A student records and university admission web app with full CRUD, image upload/preview handling, and dynamic subject rows added or removed with jQuery.",
                        "Includes supporting HTML/C# student and school registration forms built during iterative development."
                    },
                    Tech = "C#, ASP.NET MVC, ASP.NET Core MVC, Entity Framework, jQuery, SQL Server, Crystal Reports",
                    GitHub = "https://github.com/Khadizaakter7424"
                },
                new()
                {
                    Name = "Patient Management System",
                    Description = new() { "A full patient record and treatment-tracking system, including an ASP.NET MVC web version with complete CRUD workflows, Ajax.BeginForm submissions, and dynamic prescription rows." },
                    Tech = "C#",
                    GitHub = "https://github.com/Khadizaakter7424"
                },
                new()
                {
                    Name = "Apartment Management System",
                    Description = new() { "A C# application to list and manage apartment owner details for a residential property." },
                    Tech = "C#, SQL Server",
                    GitHub = "https://github.com/Khadizaakter7424"
                },
                new()
                {
                    Name = "Online Book Store (E-Commerce)",
                    Description = new() { "A full-stack e-commerce platform for browsing and ordering books, with a Node.js backend and MongoDB storage." },
                    Tech = "HTML, CSS, JavaScript, jQuery, Node.js, MongoDB",
                    GitHub = "https://github.com/Khadizaakter7424"
                },
                new()
                {
                    Name = "Hospital & Medical Database Systems",
                    Description = new() {
                        "A day-to-day doctor-patient database covering appointments and treatment records.",
                        "A supporting mini-project applying stored procedures, views and triggers to automate common medical-record operations."
                    },
                    Tech = "MS SQL Server, T-SQL, Stored Procedures, Views, Triggers",
                    GitHub = "https://github.com/Khadizaakter7424"
                },
                new()
                {
                    Name = "Movie Review & Rating System",
                    Description = new() { "A relational database for movies, users and ratings, with T-SQL queries supporting review and rating features." },
                    Tech = "MS SQL Server, T-SQL",
                    GitHub = "https://github.com/Khadizaakter7424"
                },
                new()
                {
                    Name = "Chatting App",
                    Description = new() { "A simple offline chat application for talking with friends, built to be easy to use and explore." },
                    Tech = "JavaScript",
                    GitHub = "https://github.com/Khadizaakter7424"
                },
                new()
                {
                    Name = "Bucket List App",
                    Description = new() { "A bucket list app for adding and tracking daily tasks in a simple, straightforward way." },
                    Tech = "HTML, Java",
                    GitHub = "https://github.com/Khadizaakter7424"
                }
            },
            Education = new List<TimelineEntry>
            {
                new() { Title = "MBA — Finance & Banking", Place = "Eden Mohila College, Dhaka", Period = "2022 – 2023" },
                new() { Title = "BBA — Finance & Banking", Place = "Eden Mohila College, Dhaka", Period = "2018 – 2022" },
                new() { Title = "HSC", Place = "Motijheel Ideal School and College, Dhaka", Period = "2018" },
                new() { Title = "SSC", Place = "Motijheel Govt. Girls High School, Dhaka", Period = "2016" }
            },
            Training = new List<TimelineEntry>
            {
                new() { Title = "IsDB-BISEW IT Scholarship Programme", Place = "Cross-platform apps with ASP.NET, Angular & React", Period = "Ongoing" },
                new() { Title = "Intern, .NET Development", Place = "Daffodil International Academy", Period = "Ongoing" }
            },
            Languages = new List<LanguageSkill>
            {
                new() { Name = "Bangla", Level = 5 },
                new() { Name = "English", Level = 5 },
                new() { Name = "Japanese", Level = 3 },
                new() { Name = "Korean", Level = 2 },
                new() { Name = "Thai", Level = 2 }
            },
            Hobbies = new List<string> { "Judo (White Belt)", "Reading books", "Photography", "Exploring" }
        };
    }
}
