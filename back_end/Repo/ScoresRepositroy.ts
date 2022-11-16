import { Repository, EntityRepository } from "typeorm";
import { Scores } from "../entity/scores";
@EntityRepository(Scores)
export class Scoresrepository extends Repository<Scores> {
  addScore = async (match_data: any) => {
    const {
      first_team_id,
      second_team_id,
      first_team_score,
      second_team_score,
    } = match_data;
    const user = new Scores(
      first_team_id,
      second_team_id,
      first_team_score,
      second_team_score
    );
    this.insert(user);
  };
}
