import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user1", synchronize: false })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name!: string;

  @Column()
  score!: number;

  @Column()
  additional_core!: number;

  all_score(): number {
    return this.score + this.additional_core;
  }
  constructor(name: string, score: number, aditonal_score: number) {
    this.name = name;
    this.score = score;
    this.additional_core = aditonal_score;
  }
}
