import * as Yup from "yup";

export const matchSchema = Yup.object().shape({
  first_team_id: Yup.number().required("First Team is requiered"),
  second_team_id: Yup.number().required("Second Team is requiered"),
  first_team_score: Yup.number().required("Second Team score is requiered"),
  second_team_score: Yup.number().required("Second Team score is requiered"),
});

export const userSchema = Yup.object().shape({
  user_name: Yup.string().required("User name requiered"),
});
export const teamSchema = Yup.object().shape({
  team_name: Yup.string().required("Team name requiered"),
});

export const pairSchema = Yup.object().shape({
  pair_user: Yup.number().required("User pair requiered"),
  pair_team: Yup.number().required("Team pair requiered"),
});
