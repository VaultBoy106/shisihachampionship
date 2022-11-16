import axios from "axios";

export const getTeams = async () =>
  await axios.get("http://localhost:5199/get-teams");

export const addTeams = async (name: string) => {
  return await axios.post("http://localhost:5199/add-team", {
    name: name,
  });
};
export const deleteTeam = async (id: number) => {
  await axios.delete("http://localhost:5199/delete-team", {
    data: { id: id },
  });
};
