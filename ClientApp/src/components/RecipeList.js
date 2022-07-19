import {useFetch} from "use-http";
import {useEffect, useState} from "react";
import axios from "axios";


const RecipeItem = ({recipe, onDelete}) => {
    const {del} = useFetch(`recipes/${recipe.id}`);
    return (
        <tr key={recipe.id}>
            <td>{recipe.name}</td>
            <td>{recipe.description}</td>
            <td>
                <ul>
                    {recipe.ingredients.map(e => <li key={e.id}>{e.name}</li>)}
                </ul>
            </td>
            <td>
                <ul>
                    {recipe.instructions.map(e => <li key={e.id}>{e.text}</li>)}
                </ul>
            </td>
            <td>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <button type="button" className="btn btn-info">Edit</button>
                    <button type="button" className="btn btn-warning"
                        onClick={async () => {
                            if (window.confirm(`Delete recipe ${recipe.name}`)){
                                onDelete();
                            }
                        }}>
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    )
};


export  const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    
    const loadRecipes = () => axios.get("recipes").then(r => setRecipes(r.data));
    useEffect( () => loadRecipes(), [])
    
    return (
        <>
            {recipes.length === 0 && <span>Loading...</span> }
            {recipes && 
                <>
                    <h1>Recipes</h1>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Ingridients</th>
                            <th>Instructions</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {recipes.map(e =><RecipeItem recipe={e} onDelete={() => {
                            axios.delete(`recipes/${e.id}`).then(() => loadRecipes())
                        }}/>)}
                        </tbody>
                    </table>
                </>
            }
        </>    
    )
}