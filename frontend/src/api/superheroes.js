import axios from "axios";
export const fetchSuperHeroes = async () => {
  return await axios.get("http://localhost:8080/api/superheroes");
};

export const addSuperHeroes = async (data) => {
  return await axios.post("http://localhost:8080/api/superheroes", {
    name: data.name,
    alterEgo: data.alterEgo
  });
};

export const DetailSuperHeroes = async (id) => {
    return await axios.get(`http://localhost:8080/api/superheroes/${id}`)
}