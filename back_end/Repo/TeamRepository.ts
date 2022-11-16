import { Repository, EntityRepository } from "typeorm";
import { Team } from "../entity/team";
@EntityRepository(Team)
export class Teamrepository extends Repository<Team> {
  // getTeams = async () => this.find();
  addTeam = async (name: string) => {
    const kompanija = new Team(name);
    this.insert(kompanija);
  };
  getTeamName = async (id: number) => {
    if (id == null) {
      return null;
    }
    return this.findOne({ id: id });
  };
  getTeam = async (id: number) => this.findOne({ id: id });
}
