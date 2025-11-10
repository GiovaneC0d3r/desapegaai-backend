import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany
} from 'typeorm';

import * as argon2 from 'argon2';
import { ProductEntity } from 'src/products/entities/product.entity';
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: true})
  name?: string;

  @Column({ unique: true })
  email: string;

  @Column({ type:'text'})
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @OneToMany(() => ProductEntity, (product) => product.user)
  products: ProductEntity[];


}