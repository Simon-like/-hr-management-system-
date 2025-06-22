export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'hr' | 'manager';
}

export interface Department {
  id: number;
  name: string;
  description: string;
  budget: number;
  createdAt?: string;
  updatedAt?: string;
}

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

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData extends LoginData {
  email: string;
  role: 'admin' | 'hr' | 'manager';
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
