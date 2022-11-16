import { Repository, EntityRepository } from "typeorm";
import { UserAndTeam } from "../entity/user_team";
@EntityRepository(UserAndTeam)
export class UserAndTeamrepozitory extends Repository<UserAndTeam> {
  addPair = async (pair_data: any) => {
    const { user_id, team_id, score } = pair_data;
    const user = new UserAndTeam(user_id, team_id, score);
    this.insert(user);
  };
  findAllTeams = async (id: any) => {
    return this.find({ team_id: id });
  };
  findAllUserTeams = async (id: any) => {
    return this.find({ user_id: id });
  };
  findWinner = async (id: number) => {
    const winner: any = await this.findOne({ team_id: id });
    if (!winner) {
      return null;
    }
    return winner.user_id;
  };

  findScore = async (id: number) => {
    return (await this.findOne({ id: id })).score;
  };
}
