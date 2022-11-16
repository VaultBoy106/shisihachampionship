import axios from "axios";

export const getMatches = async () => {
  return axios.get("http://localhost:5199/get-score");
};
export const addMatches = async (match: any) => {
  const { first_team_id, second_team_id, first_team_score, second_team_score } =
    match;
  return await axios.post("http://localhost:5199/add-score", {
    first_team_id: first_team_id,
    second_team_id: second_team_id,
    first_team_score: first_team_score,
    second_team_score: second_team_score,
  });
};
export const deleteMatch = async (id: number) => {
  await axios.delete("http://localhost:5199/delete-score", {
    data: { id: id },
  });
};
