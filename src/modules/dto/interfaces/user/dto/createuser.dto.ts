import { IsEmail, IsNotEmpty } from 'class-validator';
import { RoleDto } from './rol.dto';

export class CreateUsersDto {  
  name: string;
  email: string; 
  phone: string;  
  role_id: RoleDto; 
  pass: string;  
  user_status:boolean;
}
