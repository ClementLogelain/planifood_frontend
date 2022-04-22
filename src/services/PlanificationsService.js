import axios from "axios";
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL:"http://127.0.0.1:8000/api",
});

const All = async (token) => {
    api.defaults.headers.common['Authorization'] = 'Token '+token;
    return api.get("/planifications");
};

const Create = async (newPlanification) => {
    const token = Cookies.get('token');
    api.defaults.headers.common['Authorization'] = 'Token '+token;
    return api.post("/planifications", newPlanification);
};

const Update = async (planification) => {
    const token = Cookies.get('token');
    api.defaults.headers.common['Authorization'] = 'Token '+token;
    return api.put(`/planifications/${planification.id}`, planification)
}

const Delete = async (id) => {
    const token = Cookies.get('token');
    api.defaults.headers.common['Authorization'] = 'Token '+token;
    return api.delete(`/planifications/${id}`);
};

export { All, Create, Update, Delete };