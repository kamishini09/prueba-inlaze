import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,    
    UpdateDateColumn,
    CreateDateColumn,
    OneToMany,
  } from 'typeorm';  
import { UserEntity } from './user.entity';
  
  @Entity('roles')
  export class RolEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    rol_id: number;


    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column()
    is_deleted :boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(
        type=>UserEntity,
        use=>use.role_id
    )
    user : UserEntity[];

  }