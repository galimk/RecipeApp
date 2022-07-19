using System.ComponentModel.DataAnnotations;
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

    [HttpPost]
    public async Task<Recipe> Create(Recipe recipe)
    {
        if (!ModelState.IsValid)
        {
            throw new BadHttpRequestException("Invalid Recipe Object");
        }

        var newRecipe = Context.Recipes.Add(recipe);
        await Context.SaveChangesAsync();
        return newRecipe.Entity;
    }

    [HttpPut("{id:int}")]
    public async Task<Recipe> Update([FromBody]Recipe recipe, [FromRoute]int id)
    {
        if (!ModelState.IsValid)
        {
            throw new BadHttpRequestException("Invalid Recipe Object");
        }

        var toUpdate  = await Context.Recipes
            .Include(e => e.Ingredients)
            .Include(e => e.Instructions)
            .FirstAsync(e => e.Id == id);

        toUpdate.Name = recipe.Name;
        toUpdate.Description = recipe.Description;

        foreach (var oldIngredient in toUpdate.Ingredients)
            Context.Entry(oldIngredient).State = EntityState.Deleted;
        
        foreach (var oldInstructions in toUpdate.Instructions)
            Context.Entry(oldInstructions).State = EntityState.Deleted;

        toUpdate.Ingredients = recipe.Ingredients;
        toUpdate.Instructions = recipe.Instructions;

        await Context.SaveChangesAsync();

        return toUpdate;
    }

    [HttpDelete("{id:int}")]
    public async Task<Recipe> Delete([FromRoute]int id)
    {
       var toDelete = await Context.Recipes
            .Include(e => e.Ingredients)
            .Include(e => e.Instructions)
            .FirstAsync(e => e.Id == id);

       Context.Entry(toDelete).State = EntityState.Deleted;

        foreach (var oldIngredient in toDelete.Ingredients)
            Context.Entry(oldIngredient).State = EntityState.Deleted;
        
        foreach (var oldInstructions in toDelete.Instructions)
            Context.Entry(oldInstructions).State = EntityState.Deleted;

        await Context.SaveChangesAsync();

        return toDelete;
    }
}