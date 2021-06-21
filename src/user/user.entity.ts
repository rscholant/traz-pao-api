/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import Address from './address.model';
import Schedules from './schedules.model';

@Entity('user')
export class User {
  @ObjectIdColumn() id: ObjectID;
  @Column() name: string;
  @Column() email: string;
  @Column() password: string;
  @Column() birthDate: Date;
  @Column((type) => Address) address: Address;
  @Column((type) => Schedules) schedules: Schedules[];

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}
