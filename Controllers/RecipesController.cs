using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeApp.Models;

namespace RecipeApp.Controllers;

[ApiController]
[Route("[controller]")]
public class RecipesController : ControllerBase
{ 
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private RecipeContext Context { get; }

    public RecipesController(RecipeContext context)
    {
        Context = context;
    }

    [HttpGet]
    public async Task<IEnumerable<Recipe>> Get()
    {
        return await Context.Recipes
            .Include(e => e.Ingredients)
            .Include(e => e.Instructions).ToListAsync();
    }
}