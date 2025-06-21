import { Injectable } from '@nestjs/common';

export interface Employee {
  id: number;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  departmentId: number;
  departmentName?: string;
  salary: number;
  hireDate: Date;
  status: 'active' | 'inactive' | 'terminated';
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class EmployeesService {
  private employees: Employee[] = [
    {
      id: 1,
      employeeId: 'EMP001',
      name: '张三',
      email: 'zhangsan@techcorp.com',
      phone: '13800138001',
      position: '前端工程师',
      departmentId: 1,
      departmentName: '技术部',
      salary: 15000,
      hireDate: new Date('2023-01-15'),
      status: 'active',
      address: '北京市朝阳区望京街道',
      emergencyContact: '李四',
      emergencyPhone: '13900139001',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      employeeId: 'EMP002',
      name: '王小明',
      email: 'wangxiaoming@techcorp.com',
      phone: '13800138002',
      position: '产品经理',
      departmentId: 2,
      departmentName: '产品部',
      salary: 18000,
      hireDate: new Date('2023-03-20'),
      status: 'active',
      address: '北京市海淀区中关村',
      emergencyContact: '王大明',
      emergencyPhone: '13900139002',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      employeeId: 'EMP003',
      name: '李红',
      email: 'lihong@techcorp.com',
      phone: '13800138003',
      position: '运营专员',
      departmentId: 3,
      departmentName: '运营部',
      salary: 12000,
      hireDate: new Date('2023-05-10'),
      status: 'active',
      address: '北京市西城区金融街',
      emergencyContact: '李绿',
      emergencyPhone: '13900139003',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findAll(): Promise<Employee[]> {
    return this.employees;
  }

  async findById(id: number): Promise<Employee | undefined> {
    return this.employees.find(emp => emp.id === id);
  }

  async findByDepartment(departmentId: number): Promise<Employee[]> {
    return this.employees.filter(emp => emp.departmentId === departmentId);
  }

  async create(empData: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Employee> {
    const newEmployee: Employee = {
      id: Date.now(),
      ...empData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.employees.push(newEmployee);
    return newEmployee;
  }

  async update(id: number, empData: Partial<Omit<Employee, 'id' | 'createdAt'>>): Promise<Employee> {
    const empIndex = this.employees.findIndex(emp => emp.id === id);
    if (empIndex === -1) {
      throw new Error('员工不存在');
    }

    this.employees[empIndex] = { 
      ...this.employees[empIndex], 
      ...empData,
      updatedAt: new Date(),
    };
    return this.employees[empIndex];
  }

  async remove(id: number): Promise<void> {
    const empIndex = this.employees.findIndex(emp => emp.id === id);
    if (empIndex === -1) {
      throw new Error('员工不存在');
    }
    this.employees.splice(empIndex, 1);
  }

  async getStatistics() {
    const total = this.employees.length;
    const active = this.employees.filter(emp => emp.status === 'active').length;
    const inactive = this.employees.filter(emp => emp.status === 'inactive').length;
    const terminated = this.employees.filter(emp => emp.status === 'terminated').length;

    const departmentStats = this.employees.reduce((acc, emp) => {
      const deptName = emp.departmentName || '未分配';
      acc[deptName] = (acc[deptName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      active,
      inactive,
      terminated,
      departmentStats,
    };
  }
}

