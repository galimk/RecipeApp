import {useHistory, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const RecipeRequiredObjectsList = ({list, propName, header, onListChange}) => {
    const [newItem, setNewItem] = useState('');
    return (
        <>
            <table className="table">
                <tr>
                    <th>{header}</th>
                    <th></th>
                </tr>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={index}>
                            <td>
                                {item[propName]}        
                            </td>
                            <td>
                                <button type="button" className="btn btn-warning" onClick={() => {
                                    if (window.confirm(`Delete ${header} ${item[propName]}?`)) {
                                        list.splice(index, 1);
                                        onListChange(list);
                                    }
                                }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <div className="form-group">
                                <input type="text" className="form-control" id="name" placeholder={`Add new ${header}`} onChange={(e ) => {
                                    setNewItem(e.target.value)
                                }} value={newItem}/>
                            </div>
                        </td>
                        <td>
                            <button className="btn btn-success" onClick={(e) => {
                                e.preventDefault();
                                onListChange([...list, {[propName]:newItem} ]);
                                setNewItem('');
                            }}>
                                {`Add new ${header}`}
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    )
};

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
                <div>
                    <RecipeRequiredObjectsList list={recipe.instructions} propName={"text"} header={"Instructions"}
                        onListChange={(newList) => setRecipe({...recipe, instructions: newList})}/>
                </div>
                <div>
                    <RecipeRequiredObjectsList list={recipe.ingredients} propName={"name"} header={"Ingredients"}
                       onListChange={(newList) => setRecipe({...recipe, ingredients: newList})}/>
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