import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'json', nullable: true, default: [] }) // <- lista de URLs
  medias: string[];

  // armazenando preço em centavos
  @Column({ type: 'int' })
  price: number; // sempre em centavos (ex: 1290 = R$ 12,90)

  @ManyToOne(() => UserEntity, (user) => user.products, { onDelete: "CASCADE" })
  user: UserEntity;
}
