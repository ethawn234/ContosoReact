// import { HttpClient } from "../http-client";
import { ContosoPizza } from "../ContosoPizza";

const apiClient = new ContosoPizza({
    baseURL: "https://localhost:7030"
});

export default apiClient;