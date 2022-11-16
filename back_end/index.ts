import type { NextFunction, Request, Response, Router } from "express";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
  getCustomRepository,
  getManager,
  getConnection,
  Column,
} from "typeorm";
import { Userepository } from "./Repo/UserRepository";
import { Teamrepository } from "./Repo/TeamRepository";
import connectTypeormToPostgres from "./config/database";
import "reflect-metadata";
import { User } from "./entity/user";
import { Team } from "./entity/team";
import console, { Console } from "console";
import { Scoresrepository } from "./Repo/ScoresRepositroy";
import { UserAndTeamrepozitory } from "./Repo/UserandTeams";
import { UserAndTeam } from "./entity/user_team";
import { Scores } from "./entity/scores";
dotenv.config();
const app = express();
connectTypeormToPostgres();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//users api cals
//add users

app.post("/add-user", (req: Request, res: Response, next: NextFunction) => {
  try {
    let user_repo = getCustomRepository(Userepository);
    user_repo.addUser({
      name: req.body.name,
      score: 0,
      aditonal_score: 0,
    });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.post(
  "/add-aditional-score",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      let user_repo = getCustomRepository(Userepository);
      const id = req.body.id;
      const additional_core = req.body.additional_core;
      user_repo
        .createQueryBuilder()
        .update(User)
        .set({
          additional_core: additional_core,
        })
        .where("id = :id", { id: id })
        .execute();

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
);
//get all of the users or some of them
app.get(
  "/get-users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user_repo = getCustomRepository(Userepository);
      let user_and_team_repo = getCustomRepository(UserAndTeamrepozitory);
      const users = await user_repo.find();

      const sorted_users = users.sort((a, b): any => {
        const full_score1 = a.additional_core + a.score;
        const full_score2 = b.additional_core + b.score;

        if (full_score1 < full_score2) {
          return 1;
        } else if (full_score1 > full_score2) {
          return -1;
        } else {
          return 0;
        }
      });
      res.json(sorted_users);
    } catch (error) {
      next(error);
    }
  }
);

//deleting users

app.delete(
  "/delete-user/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user_repo = getCustomRepository(Userepository);
      let user_and_team_repo = getCustomRepository(UserAndTeamrepozitory);
      let id = req.body.id;
      user_repo
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", { id: id })
        .execute();

      user_and_team_repo
        .createQueryBuilder()
        .delete()
        .from(UserAndTeam)
        .where("user_id = :user_id", { user_id: id })
        .execute();
      res.sendStatus(200).send("user deleted");
    } catch (error) {}
  }
);
//get footbal teams
app.get(
  "/get-teams",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user_repo = getCustomRepository(Teamrepository)
        .createQueryBuilder("team")
        .orderBy("team.name", "ASC")
        .getMany();

      res.json(await user_repo);
    } catch (error) {
      next(error);
    }
  }
);
app.get(
  "/get-user-teams",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // prettier-ignore
      let user_repo = getCustomRepository(Userepository);
      const user_and_team_repo = getCustomRepository(UserAndTeamrepozitory);
      let users = await user_repo.find();
      let team_repo = getCustomRepository(Teamrepository);
      const new_users = await Promise.all(
        users.map(async (user: any) => {
          const new_user_teams = await user_and_team_repo.find({
            user_id: user.id,
          });
          const new_user_data = await Promise.all(
            new_user_teams.map(async (team: any) => {
              const team_name = (await team_repo.findOne({ id: team.team_id }))
                ?.name;
              return team_name;
            })
          );

          return {
            id: user.id,
            teams: new_user_data,
            name: user.name,
          };
        })
      );
      res.json(new_users);
    } catch (error) {
      next(error);
    }
  }
);
// add footbal teams
app.post(
  "/add-team",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let team_repo = getCustomRepository(Teamrepository);
      team_repo.addTeam(req.body.name);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
);
//get all of the teams

// //delete team

app.delete(
  "/delete-team",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user_repo = getCustomRepository(Teamrepository);
      const user_and_team_repo = getCustomRepository(UserAndTeamrepozitory);
      let team_repo = getCustomRepository(Teamrepository);

      const id: number = req.body.id;
      //nadi svakog koji ima taj tim
      const teams = await user_and_team_repo.findAllTeams(id);

      teams.forEach((team: any) => {
        user_repo
          .createQueryBuilder()
          .update(User)
          .set({
            score: () => `score - ${team.score}`,
          })
          .where("id = :id", { id: team.user_id })
          .execute();
      });
      // za svaki item  u user oduzmi od scora
      user_and_team_repo
        .createQueryBuilder()
        .delete()
        .from(UserAndTeam)
        .where("team_id = :team_id", { team_id: id })
        .execute();
      team_repo
        .createQueryBuilder()
        .delete()
        .from(Team)
        .where("id = :id", { id: id })
        .execute();
      res.sendStatus(200);
    } catch (error) {}
  }
);
//user & teams routes
app.post(
  "/add-pair",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user_and_team_repo = getCustomRepository(UserAndTeamrepozitory);
      user_and_team_repo.addPair({
        user_id: req.body.user_id,
        team_id: req.body.team_id,
        score: 0,
      });
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
);
app.get(
  "/get-pairs",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user_and_team_repo = getCustomRepository(UserAndTeamrepozitory);
      let team_repo = getCustomRepository(Teamrepository);
      const user_repo = getCustomRepository(Userepository);
      const pairs = await user_and_team_repo
        .createQueryBuilder("user_team")
        .orderBy("user_team.user_id", "ASC")
        .getMany();

      const new_pair = await Promise.all(
        pairs.map(async (i: any) => {
          const team_name = (await team_repo.getTeamName(i.team_id))?.name;
          const user_name = (await user_repo.getUserData(i.user_id))?.name;

          return {
            id: i.id,
            user_name: user_name,
            team_name: team_name,
            score: i.score,
          };
        })
      );

      res.json(new_pair);
    } catch (error) {
      next(error);
    }
  }
);
app.delete(
  "/delete-pair",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user_repo = getCustomRepository(Teamrepository);
      const user_and_team_repo = getCustomRepository(UserAndTeamrepozitory);
      const id: number = req.body.id;
      const score = await user_and_team_repo.findScore(id);
      //nadi svakog koji ima taj tim
      user_repo
        .createQueryBuilder()
        .update(User)
        .set({
          score: () => `score - ${score}`,
        })
        .where("id = :id", { id: id })
        .execute();

      user_and_team_repo
        .createQueryBuilder()
        .delete()
        .from(UserAndTeam)
        .where("id = :id", { id: id })
        .execute();

      res.sendStatus(200);
    } catch (error) {}
  }
);
//on what port is the app running

//matches routes
app.get(
  "/get-score",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let team_repo = getCustomRepository(Teamrepository);
      const scores_repo = getCustomRepository(Scoresrepository);
      const user_and_team_repo = getCustomRepository(UserAndTeamrepozitory);
      const user_repo = getCustomRepository(Userepository);
      const score = await scores_repo
        .createQueryBuilder("scores")
        .orderBy("scores.first_team_id", "ASC")
        .getMany();
      const result = await Promise.all(
        score.map(async (i: any) => {
          const team1 = (await team_repo.getTeam(i.first_team_id))?.name;
          let user1: any = (
            await user_repo.getUserData(
              await user_and_team_repo.findWinner(i.first_team_id)
            )
          )?.name;
          let user2: any = (
            await user_repo.getUserData(
              await user_and_team_repo.findWinner(i.second_team_id)
            )
          )?.name;
          if (!user1) {
            user1 = "No user";
          }
          if (!user2) {
            user2 = "No user";
          }
          const team2 = (await team_repo.getTeam(i.second_team_id))?.name;
          return {
            id: i.id,
            first_team_name: team1,
            first_team_score: i.first_team_score,
            first_team_user: user1,
            second_team_score: i.second_team_score,
            second_team_name: team2,
            second_team_user: user2,
          };
        })
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);
app.post(
  "/add-score",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const scores_repo = getCustomRepository(Scoresrepository);
      const user_and_team_repo = getCustomRepository(UserAndTeamrepozitory);
      const user_repo = getCustomRepository(Userepository);
      const first_score = req.body.first_team_score;
      const second_score = req.body.second_team_score;

      scores_repo.addScore({
        first_team_id: req.body.first_team_id,
        second_team_id: req.body.second_team_id,
        first_team_score: first_score,
        second_team_score: second_score,
      });

      const updateUser = async (id: number) => {
        const user_id = await user_and_team_repo.findWinner(id);
        let score = 1;
        user_and_team_repo
          .createQueryBuilder()
          .update(UserAndTeam)
          .set({
            score: () => `score + ${score}`,
          })
          .where("team_id = :team_id", { team_id: id })
          .execute();

        user_repo
          .createQueryBuilder()
          .update(User)
          .set({
            score: () => `score + ${score}`,
          })
          .where("id = :id", { id: user_id })
          .execute();
      };
      if (first_score > second_score) {
        updateUser(req.body.first_team_id);
      } else {
        updateUser(req.body.second_team_id);
      }

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
);
app.delete(
  "/delete-score",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const scores_repo = getCustomRepository(Scoresrepository);
      const id = req.body.id;
      scores_repo
        .createQueryBuilder()
        .delete()
        .from(Scores)
        .where("id = :id", { id: id })
        .execute();

      res.sendStatus(200);
    } catch (error) {}
  }
);

//on what port is the app running
app.listen(5199);
