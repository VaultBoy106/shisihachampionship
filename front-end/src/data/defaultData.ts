import { matchSchema, userSchema, teamSchema, pairSchema } from "./Yup";
import { yupResolver } from "@hookform/resolvers/yup";
export const MatchesformOptions = {
  resolver: yupResolver(matchSchema),
  defaultValues: {
    first_team_id: "",
    second_team_id: "",
    first_team_score: 0,
    second_team_score: 0,
  },
};
export const TeamformOptions = {
  resolver: yupResolver(teamSchema),
  defaultValues: {
    team_name: "",
  },
};
export const UserformOptions = {
  resolver: yupResolver(userSchema),
  defaultValues: {
    user_name: "",
  },
};

export const PairformOptions = {
  resolver: yupResolver(pairSchema),
  defaultValues: {
    pair_user: "",
    pair_team: "",
  },
};
