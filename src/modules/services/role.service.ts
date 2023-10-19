import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistrationStatus } from '../auth/dto/registrationStatus.interface';
import { RolEntity } from '../dto/db/rol.entity';
import { CreateRolDto } from '../dto/interfaces/user/dto/createrol.dto';
import { RoleInterface } from '../dto/interfaces/user/rol.Interface';

@Injectable() 
export class RolesService {
  constructor(
    @InjectRepository(RolEntity)
    private rolesRepository: Repository<RolEntity>,
  ) {}

  
  async createRol(data: CreateRolDto) {
      let status: RegistrationStatus = {
        success: true,
        message: '',
      };
      try {
        const user = await this.rolesRepository.create(data);
        const respon = await this.rolesRepository.save(user);
        return await respon;
      } catch (err) {        
        status = { success: false, message: 'Error al crear el rol: '+err };
        return status;
      }
  }


  async updateRol(data: Partial<RoleInterface>) {
    let status: RegistrationStatus = {
      success: true,
      message: '',
    };
    try {
      const existingRol = await this.rolesRepository.findOne(data.rol_id);     


    if(data.name !== undefined ) {
      existingRol.name = data.name;
    }

    if (data.is_deleted !== undefined) {
      existingRol.is_deleted = data.is_deleted;
    }
   
      
    return await this.rolesRepository.save(existingRol);
    } catch (err) {      
      status = { success: false, message: 'Error al actualizar el rol: '+err };
      return status;
    }
  }

  async deleteRol(rol: number) {
    let status: RegistrationStatus = {
      success: true,
      message: '',
    };
    try {
      const existingRol = await this.rolesRepository.findOne(rol);
      if(existingRol.is_deleted){        
       return await this.rolesRepository.delete(rol);
      }else{
        status = { success: false, message: 'Error al eliminar el Rol: el Rol no puede ser eliminado' };
        return status;
      }      
    } catch (err) {      
      status = { success: false, message: 'Error al eliminar el Rol: '+err };
      return status;
    }
  }


  
  


}
