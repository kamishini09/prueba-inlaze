import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRO } from '../interfaces/user/dto/usersro.dto';
import { RolEntity } from './rol.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;
  
  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;   

  @ManyToOne(
    type => RolEntity,
    rol=>rol.user
    )
   role_id:RolEntity;


  @Column({ type: 'text' }) 
  pass: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.pass) {
      this.pass = await bcrypt.hash(this.pass, 10);
    }
  }

  @BeforeUpdate()
  async hashupdatePassword() {
    if (this.pass) {
      this.pass = await bcrypt.hash(this.pass, 10);
    }
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.pass);
  }

  toResponseObject(showToken: boolean = true): UserRO {
    const { user_id, name,  email } = this;
    const responseObject: UserRO = {
      user_id,
      name,      
      email,
    };
    return responseObject;
  }
  
  @Column()
  user_status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
