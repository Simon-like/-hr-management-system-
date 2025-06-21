import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './departments/departments.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    EmployeesModule,
    DepartmentsModule,
  ],
})
export class AppModule {}

