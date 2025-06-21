import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EmployeesService } from './employees.service';

@Controller('employees')
@UseGuards(JwtAuthGuard)
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Get()
  findAll(@Query('departmentId') departmentId?: string) {
    if (departmentId) {
      return this.employeesService.findByDepartment(+departmentId);
    }
    return this.employeesService.findAll();
  }

  @Get('statistics')
  getStatistics() {
    return this.employeesService.getStatistics();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findById(+id);
  }

  @Post()
  create(@Body() createData: any) {
    return this.employeesService.create(createData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.employeesService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
