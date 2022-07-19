using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace RecipeApp.Models;

public class Ingredient
{
    [JsonIgnore]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
}