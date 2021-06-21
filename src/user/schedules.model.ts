import { Column } from 'typeorm';
export default class Schedules {
  @Column() type: string;
  @Column() schedule: string;
}
