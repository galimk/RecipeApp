using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace RecipeApp.Models;

public class Instruction
{
    [JsonIgnore] 
    public int Id { get; set; }
    [Required]
    public string Text { get; set; }
}