
namespace RecipeApp.Models;

public class Recipe
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public byte Image { get; set; }
    public ICollection<Instruction> Instructions { get; set; }
    public ICollection<Ingredient> Ingredients { get; set; }
}    
