namespace PortfolioApi.Models
{
    public class Profile
    {
        public string Name { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string GitHub { get; set; } = string.Empty;
        public string LinkedIn { get; set; } = string.Empty;
        public string Objective { get; set; } = string.Empty;
        // Relative path served by this API's static file middleware, e.g. /media/profile.jpg
        public string PhotoUrl { get; set; } = string.Empty;
        public string StatusMessage { get; set; } = string.Empty;
    }

    public class SkillGroup
    {
        public string Category { get; set; } = string.Empty;
        public List<string> Items { get; set; } = new();
    }

    public class Project
    {
        public string Name { get; set; } = string.Empty;
        public List<string> Description { get; set; } = new();
        public string Tech { get; set; } = string.Empty;
        public string GitHub { get; set; } = string.Empty;
    }

    public class TimelineEntry
    {
        public string Title { get; set; } = string.Empty;
        public string Place { get; set; } = string.Empty;
        public string Period { get; set; } = string.Empty;
    }

    public class LanguageSkill
    {
        public string Name { get; set; } = string.Empty;
        public int Level { get; set; }
    }

    // Everything the site needs, in one shape - the frontend fetches this
    // and never stores portfolio content of its own.
    public class PortfolioData
    {
        public Profile Profile { get; set; } = new();
        public List<SkillGroup> Skills { get; set; } = new();
        public List<Project> Projects { get; set; } = new();
        public List<TimelineEntry> Education { get; set; } = new();
        public List<TimelineEntry> Training { get; set; } = new();
        public List<LanguageSkill> Languages { get; set; } = new();
        public List<string> Hobbies { get; set; } = new();
    }
}
