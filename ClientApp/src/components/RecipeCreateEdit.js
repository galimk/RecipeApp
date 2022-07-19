import {useHistory, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export const RecipeCreateEdit = () => {
    const {id} = useParams();
    const history = useHistory();
    
    const [recipe, setRecipe] = useState({
        name: '',
        description: '',
        ingredients: [],
        instructions: [],
    });

    useEffect(() => {
        if (id) {
            axios.get(`recipes/${id}`).then(r => {
                setRecipe(r.data)
            })
        }
    }, [id]);
    
    return (
        <>
            <h1>{!!id ? 'Edit Recipe': 'Create Recipe'}</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Recipe Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Recipe Name" onChange={(e ) => {
                        setRecipe({...recipe, name: e.target.value})
                    }} value={recipe.name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Recipe Name</label>
                    <textarea  className="form-control" id="name" placeholder="Recipe Description"
                               onChange={(e ) => {
                                   setRecipe({...recipe, description: e.target.value})
                               }}
                   value={recipe.description}/>
                </div>
                <div style={{marginTop:"10px", float:"right"}}>
                    <button className="btn btn-success" onClick={(e) => {
                       e.preventDefault();
                       if (id) {
                           axios.put(`recipes/${id}`, recipe).then(e => history.push("/recipe-list"));
                       } else{
                           axios.post('recipes', recipe).then(e => history.push("/recipe-list"));
                       }
                    }}> {id ? "Save Changes" : "Create" } </button>
                </div>
            </form>
        </>
        
    ) 
}