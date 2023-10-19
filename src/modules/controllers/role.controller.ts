import {
    Controller,
    Post,
    Body,  
    Put,
    Delete,
    Param  
  } from '@nestjs/common';  
import { RolesService } from '../services/role.service';
import { CreateRolDto } from '../dto/interfaces/user/dto/createrol.dto';
import { RoleInterface } from '../dto/interfaces/user/rol.Interface';
  
  
  @Controller('roles')
  export class RoleController {
    constructor(private service: RolesService) {} 
  
    @Post()
    create(@Body() data: CreateRolDto) {
      return this.service.createRol(data);
    }
  
    @Put()
    update(@Body() user: RoleInterface) {
      return this.service.updateRol(user);
    }
  
    @Delete(':id')
    deleteUser(@Param() params) {
      return this.service.deleteRol(params.id);
    }
    
  
    
   
  }
  