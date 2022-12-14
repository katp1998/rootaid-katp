import { Entity, ObjectIdColumn, Column, BaseEntity } from "typeorm";
import { ObjectId } from "mongodb";

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn({ primary: true})
  _id!: ObjectId;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  refreshToken!: string;
}
