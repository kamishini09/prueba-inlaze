import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../dto/db/user.entity';
import { UsersInterface } from '../dto/interfaces/user/user.Interface';
import { CreateUsersDto } from '../dto/interfaces/user/dto/createuser.dto';
import { RegistrationStatus } from '../auth/dto/registrationStatus.interface';


@Injectable() 
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  
  async createUser(data: CreateUsersDto) {
      let status: RegistrationStatus = {
        success: true,
        message: '',
      };
      try {
        const user = await this.usersRepository.create(data);
        const respon = await this.usersRepository.save(user);
        return await respon;
      } catch (err) {        
        status = { success: false, message: 'Error al crear el usuario: '+err };
        return status;
      }
  }


  async updateUser(data: Partial<UsersInterface>) {
    let status: RegistrationStatus = {
      success: true,
      message: '',
    };
    try {
      const existingUser = await this.usersRepository
    .createQueryBuilder('user')
    .where('user.user_id = :userId', { userId: data.user_id })
    .leftJoinAndSelect('user.role_id', 'role')
    .select([
      'user.user_id',
      'user.name',
      'user.email',
      'user.phone',
      'user.pass',
      'user.user_status',
      'user.created_at',
      'user.updated_at',
      'role.rol_id',
    ])
    .getOne();    


    if(existingUser.user_status==false){
      status = { success: false, message: 'El usuario no esta en el sistema' };
      return status;
      
    }
    if (data.role_id.rol_id !== undefined ) {      
      existingUser.role_id.rol_id = data.role_id.rol_id;
    }  
    if (data.name !== undefined ) {
      existingUser.name = data.name;
    }   
    if (data.email !== undefined) {
      existingUser.email = data.email;
    }
    if (data.phone !== undefined) {
      existingUser.phone = data.phone;
    }
    if (data.pass !== undefined) {
      existingUser.pass = data.pass;
    }
      
    return await this.usersRepository.save(existingUser);
    } catch (err) {      
      status = { success: false, message: 'Error al actualizar el usuario: '+err };
      return status;
    }
  }

  async deleteUser(user: number) {
    let status: RegistrationStatus = {
      success: true,
      message: '',
    };
    try {
      const existingUser = await this.usersRepository.findOne(user);
      existingUser.user_status=false;
       return await this.usersRepository.save(existingUser);
    } catch (err) {
      
      status = { success: false, message: 'Error al eliminar el usuario: Usuaio no encontrado' };
      return status;
    }
  }


  //auth

  public async findByEmail(userEmail: string): Promise<UserEntity | null> {
    return await this.usersRepository.findOne({      
      where: [{ email: userEmail }],
    });
  }

  public async findById(id: number): Promise<UserEntity | null> {
    return await this.usersRepository.findOneOrFail({      
      where: [{ user_id: id }],
    });
  }
  


}
