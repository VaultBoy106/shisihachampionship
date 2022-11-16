import { Repository, EntityRepository } from "typeorm";
import { User } from "../entity/user";
@EntityRepository(User)
export class Userepository extends Repository<User> {
  getUserData = async (id: number) => {
    if (id == null) {
      return null;
    }
    return this.findOne({ id: id });
  };

  addUser = async (users: any) => {
    const { name, score, aditonal_score } = users;
    const user = new User(name, score, aditonal_score);
    this.insert(user);
  };
}
