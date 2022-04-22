import axios from "axios";

const api = axios.create({
    baseURL:"http://127.0.0.1:8000/api",
});

const Register = async(user) =>  {
    return api.post("/user/register", user);
};

const Login = (user) => {
    return api.post("/auth/login", user);
}
 
export { Register, Login };