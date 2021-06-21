import { Column } from 'typeorm';

export default class Address {
  @Column() CEP: string;
  @Column() street: string;
  @Column() neighborhood: string;
  @Column() city: string;
  @Column() state: string;
  @Column() number: string;
  @Column() complement: string;
}
