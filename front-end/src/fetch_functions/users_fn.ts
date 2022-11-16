import axios from "axios";

export const getUsers = async () =>
  await axios.get("http://localhost:5199/get-users");
export const addUsers = async (name: string) => {
  return await axios.post("http://localhost:5199/add-user", {
    name: name,
  });
};
export const getUserTeams = async () =>
  await axios.get("http://localhost:5199/get-user-teams");

export const deleteUser = async (id: number) => {
  await axios.delete("http://localhost:5199/delete-user/", {
    data: { id: id },
  });
};
export const addAditoinalScore = async (params: any) => {
  const { id, additional_core } = params;

  return await axios.post("http://localhost:5199/add-aditional-score", {
    id: id,
    additional_core: additional_core,
  });
};
