import { Injectable } from '@nestjs/common';

export interface Department {
  id: number;
  name: string;
  description: string;
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
      createdAt: new Date(),
    },
    {
      id: 2,
      name: '产品部',
      description: '负责产品规划和需求管理',
      createdAt: new Date(),
    },
    {
      id: 3,
      name: '运营部',
      description: '负责市场运营和用户增长',
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
      throw new Error('部门不存在');
    }

    this.departments[deptIndex] = { ...this.departments[deptIndex], ...deptData };
    return this.departments[deptIndex];
  }

  async remove(id: number): Promise<void> {
    const deptIndex = this.departments.findIndex(dept => dept.id === id);
    if (deptIndex === -1) {
      throw new Error('部门不存在');
    }
    this.departments.splice(deptIndex, 1);
  }
}
