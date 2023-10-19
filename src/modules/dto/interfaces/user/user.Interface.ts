import { RoleInterface } from "./rol.Interface";

export interface UsersInterface  {  
  user_id: number;  
  name?: string;  
  email?: string;  
  phone?: string;  
  role_id?: RoleInterface;   
  pass?: string;
  user_status?: boolean;  
}

