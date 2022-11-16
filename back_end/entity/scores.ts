import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "scores", synchronize: false })
export class Scores {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  first_team_id!: number;

  @Column()
  second_team_id!: number;

  @Column()
  first_team_score!: number;

  @Column()
  second_team_score!: number;

  constructor(
    first_team_id: number,
    second_team_id: number,
    first_team_score: number,
    second_team_score: number
  ) {
    this.first_team_id = first_team_id;
    this.second_team_id = second_team_id;
    this.first_team_score = first_team_score;
    this.second_team_score = second_team_score;
  }
}
