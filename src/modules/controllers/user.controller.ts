import {
  Controller,
  Post,
  Body,  
  Put,
  Delete,
  Param  
} from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { UsersInterface } from '../dto/interfaces/user/user.Interface';
import { CreateUsersDto } from '../dto/interfaces/user/dto/createuser.dto';


@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {} 

  @Post()
  create(@Body() data: CreateUsersDto) {
    return this.service.createUser(data);
  }

  @Put()
  update(@Body() user: UsersInterface) {
    return this.service.updateUser(user);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.deleteUser(params.id);
  }
  

  
 
}
