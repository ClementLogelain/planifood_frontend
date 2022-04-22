import axios from "axios";

const api = axios.create({
    baseURL:"http://127.0.0.1:8000/api",
});

const All = async (token) => {
    api.defaults.headers.common['Authorization'] = 'Token '+token;
    return api.get("/appIngredients");
};

const Mine = async (token) => {
    api.defaults.headers.common['Authorization'] = 'Token '+token;
    return api.get("/ingredients");
};

const Create = async (newIngredient, token) => {
    api.defaults.headers.common['Authorization'] = 'Token '+token;
    return api.post("/ingredients", newIngredient);
};

const Update = async (ingredient, token) => {
    api.defaults.headers.common['Authorization'] = 'Token '+token;
    return api.put(`/ingredients/${ingredient.id}`, ingredient)
}

const Delete = async (id, token) => {
    api.defaults.headers.common['Authorization'] = 'Token '+token;
    return api.delete(`/ingredients/${id}`);
};

const AddUsing = async (using, token) => {
    api.defaults.headers.common['Authorization'] = 'Token '+token;
    return api.post(`/ingredientsUsed`, using);
}

const UpdateUsing = async (using, token) => {
    api.defaults.headers.common['Authorization'] = 'Token '+token;
    return api.put(`/ingredientsUsed/${using.id}`, using);
}

const DeleteUsing = async (id, token) => {
    api.defaults.headers.common['Authorization'] = 'Token '+token;
    return api.delete(`/ingredientsUsed/${id}`);
}

export { All, Mine, Create, Update, Delete, AddUsing, UpdateUsing, DeleteUsing };