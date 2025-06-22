import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DepartmentsService, Department } from './departments.service';

// DTO for creating a department
export class CreateDepartmentDto {
  name: string;
  description: string;
  budget: number;
  managerId?: number;
}

// DTO for updating a department
export class UpdateDepartmentDto {
  name?: string;
  description?: string;
  budget?: number;
  managerId?: number;
}

@Controller('departments')
@UseGuards(JwtAuthGuard)
export class DepartmentsController {
  constructor(private departmentsService: DepartmentsService) {}

  @Get()
  findAll(): Promise<Department[]> {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Department | undefined> {
    return this.departmentsService.findById(id);
  }

  @Post()
  create(@Body() createData: CreateDepartmentDto): Promise<Department> {
    return this.departmentsService.create(createData);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateData: UpdateDepartmentDto): Promise<Department> {
    return this.departmentsService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.departmentsService.remove(id);
  }
}