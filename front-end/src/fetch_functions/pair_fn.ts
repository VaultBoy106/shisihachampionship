import axios from "axios";

export const getPairs = async () =>
  await axios.get("http://localhost:5199/get-pairs");
export const deletePair = async (id: number) => {
  await axios.delete("http://localhost:5199/delete-pair", {
    data: { id: id },
  });
};
export const add_pair = async (pair: any) => {
  const { user_id, team_id } = pair;
  return await axios.post("http://localhost:5199/add-pair", {
    user_id: user_id,
    team_id: team_id,
  });
};
