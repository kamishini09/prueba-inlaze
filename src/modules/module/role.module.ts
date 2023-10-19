import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from '../controllers/role.controller';
import { RolesService } from '../services/role.service';
import { RolEntity } from '../dto/db/rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolEntity])],
  providers: [RolesService],
  controllers: [RoleController],
  exports: [RolesService],
})
export class RolesModule {}
