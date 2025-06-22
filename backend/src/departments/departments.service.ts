import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';

export interface Department {
  id: number;
  name: string;
  description: string;
  budget: number;
  managerId?: number;
  createdAt: Date;
}

@Injectable()
export class DepartmentsService {
  private departments: Department[] = [
    {
      id: 1,
      name: '技术部',
      description: '负责产品研发和技术支持',
      budget: 500000,
      createdAt: new Date(),
    },
    {
      id: 2,
      name: '产品部',
      description: '负责产品规划和需求管理',
      budget: 300000,
      createdAt: new Date(),
    },
    {
      id: 3,
      name: '运营部',
      description: '负责市场运营和用户增长',
      budget: 400000,
      createdAt: new Date(),
    },
  ];

  async findAll(): Promise<Department[]> {
    return this.departments;
  }

  async findById(id: number): Promise<Department | undefined> {
    return this.departments.find(dept => dept.id === id);
  }

  async create(deptData: Omit<Department, 'id' | 'createdAt'>): Promise<Department> {
    // 验证预算字段
    if (deptData.budget === undefined || deptData.budget === null) {
      throw new BadRequestException('预算字段是必需的');
    }
    
    if (typeof deptData.budget !== 'number' || deptData.budget < 0) {
      throw new BadRequestException('预算必须是一个非负数');
    }

    // 验证名称字段
    if (!deptData.name || deptData.name.trim().length === 0) {
      throw new BadRequestException('部门名称是必需的');
    }

    // 验证描述字段
    if (!deptData.description || deptData.description.trim().length === 0) {
      throw new BadRequestException('部门描述是必需的');
    }

    const newDepartment: Department = {
      id: Date.now(),
      ...deptData,
      createdAt: new Date(),
    };

    this.departments.push(newDepartment);
    return newDepartment;
  }

  async update(id: number, deptData: Partial<Omit<Department, 'id' | 'createdAt'>>): Promise<Department> {
    const deptIndex = this.departments.findIndex(dept => dept.id === id);
    if (deptIndex === -1) {
      throw new NotFoundException('部门不存在');
    }

    // 验证预算字段（如果提供）
    if (deptData.budget !== undefined) {
      if (typeof deptData.budget !== 'number' || deptData.budget < 0) {
        throw new BadRequestException('预算必须是一个非负数');
      }
    }

    // 验证名称字段（如果提供）
    if (deptData.name !== undefined && (!deptData.name || deptData.name.trim().length === 0)) {
      throw new BadRequestException('部门名称不能为空');
    }

    // 验证描述字段（如果提供）
    if (deptData.description !== undefined && (!deptData.description || deptData.description.trim().length === 0)) {
      throw new BadRequestException('部门描述不能为空');
    }

    this.departments[deptIndex] = { ...this.departments[deptIndex], ...deptData };
    return this.departments[deptIndex];
  }

  async remove(id: number): Promise<void> {
    const deptIndex = this.departments.findIndex(dept => dept.id === id);
    if (deptIndex === -1) {
      throw new NotFoundException('部门不存在');
    }
    this.departments.splice(deptIndex, 1);
  }
}
