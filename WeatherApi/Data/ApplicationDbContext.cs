using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    // Placeholder DbSets for future entities
    // public DbSet<User> Users { get; set; }
    // public DbSet<WeatherLog> WeatherLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Configure entity relationships and constraints here
        // Example:
        // modelBuilder.Entity<User>()
        //     .HasKey(u => u.Id);
    }
}

// Placeholder entities for future use
/*
public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Auth0Id { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

public class WeatherLog
{
    public int Id { get; set; }
    public int CityId { get; set; }
    public string CityName { get; set; } = string.Empty;
    public double Temperature { get; set; }
    public string WeatherDescription { get; set; } = string.Empty;
    public DateTime RequestedAt { get; set; }
    public int? UserId { get; set; }
    public User? User { get; set; }
}
*/