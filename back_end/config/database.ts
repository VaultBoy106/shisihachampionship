import { createConnection } from "typeorm";
import { Team } from "../entity/team";
import { User } from "../entity/user";
import { Scores } from "../entity/scores";
import { UserAndTeam } from "../entity/user_team";

const connectTypeormToPostgres = async () => {
  await createConnection({
    type: "postgres",
    host: "127.0.0.1",
    port: 5999,
    username: "dzemo",
    password: "dzemo",
    database: "postgres",
    synchronize: false,
    entities: [Team, User, Scores, UserAndTeam],
  });
};
export default connectTypeormToPostgres;
