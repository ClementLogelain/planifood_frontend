import axios from "axios";

const api = axios.create({
    baseURL:"http://127.0.0.1:8000/api",
});

const All = async (token) => {
    api.defaults.headers.common['Authorization'] = 'Token '+token;
    return api.get('/meals')
};

const Create = async (newMeal, token) => {
    api.defaults.headers.common['Authorization'] = 'Token '+token;
    return api.post("/meals", newMeal);
};

const Update = async (meal, token) => {
    api.defaults.headers.common['Authorization'] = 'Token '+token;
    return api.put(`/meals/${meal.id}`, meal)
}

const Delete = async (id, token) => {
    api.defaults.headers.common['Authorization'] = 'Token '+token;
    return api.delete(`/meals/${id}`);
};

const SingleMeal = async (id, token) => {
    api.defaults.headers.common['Authorization'] = 'Token '+token;
    return api.get(`/meals/${id}`);
}

const AppMeals = async (token) => {
    api.defaults.headers.common['Authorization'] = 'Token '+token;
    return api.get('/appMeals')
}

export { All, Create, Update, Delete, SingleMeal,AppMeals };