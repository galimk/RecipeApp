using Microsoft.EntityFrameworkCore;

namespace RecipeApp.Models;

public class RecipeContext : DbContext
{
    public DbSet<Recipe> Recipes { get; set; }
    public string DbPath { get; }
        
    public RecipeContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = System.IO.Path.Join(path, "recipe.db");
    }

    // The following configures EF to create a Sqlite database file in the
    // special "local" folder for your platform.
    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Recipe>().HasMany(e => e.Ingredients);
        modelBuilder.Entity<Recipe>().HasMany(e => e.Instructions);
    }
}