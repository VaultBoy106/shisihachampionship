import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user_team", synchronize: false })
export class UserAndTeam {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column()
  team_id!: number;

  @Column()
  score!: number;

  constructor(user_id: number, team_id: number, score: number) {
    this.user_id = user_id;
    this.team_id = team_id;
    this.score = score;
  }
}
