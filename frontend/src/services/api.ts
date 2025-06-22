import type { Employee, LoginData, Department, RegisterData } from '../types'; // Adjust the path as needed

const API_BASE = 'http://localhost:3001';

interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
}

class ApiService {
  private token: string = '';

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${API_BASE}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        // 尝试解析错误响应
        let errorData: any = {};
        try {
          errorData = await response.json();
        } catch {
          // 如果无法解析JSON，使用默认错误信息
          errorData = { message: `HTTP error! status: ${response.status}` };
        }
        
        const error: ApiError = {
          message: errorData.message || `HTTP error! status: ${response.status}`,
          statusCode: response.status,
          error: errorData.error,
        };
        throw error;
      }
      
      // 检查响应是否有内容
      const contentType = response.headers.get('content-type');
      const contentLength = response.headers.get('content-length');
      
      // 如果响应体为空或没有内容，返回空对象或null
      if (contentLength === '0' || !contentType || !contentType.includes('application/json')) {
        return {} as T;
      }
      
      // 尝试解析JSON响应
      try {
        const data = await response.json();
        return data;
      } catch (parseError) {
        // 如果JSON解析失败，返回空对象
        console.warn('Failed to parse JSON response:', parseError);
        return {} as T;
      }
    } catch (error) {
      console.error('API request failed:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('网络请求失败');
    }
  }

  // Auth
  async login(credentials: LoginData) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Departments
  async getDepartments() {
    return this.request<Department[]>('/departments');
  }

  async createDepartment(department: Partial<Department>) {
    // 前端验证
    if (!department.name?.trim()) {
      throw new Error('部门名称是必需的');
    }
    if (!department.description?.trim()) {
      throw new Error('部门描述是必需的');
    }
    if (department.budget === undefined || department.budget === null) {
      throw new Error('预算字段是必需的');
    }
    if (typeof department.budget !== 'number' || department.budget < 0) {
      throw new Error('预算必须是一个非负数');
    }

    return this.request<Department>('/departments', {
      method: 'POST',
      body: JSON.stringify(department),
    });
  }

  async updateDepartment(id: number, department: Partial<Department>) {
    // 前端验证
    if (department.name !== undefined && !department.name.trim()) {
      throw new Error('部门名称不能为空');
    }
    if (department.description !== undefined && !department.description.trim()) {
      throw new Error('部门描述不能为空');
    }
    if (department.budget !== undefined && (typeof department.budget !== 'number' || department.budget < 0)) {
      throw new Error('预算必须是一个非负数');
    }

    return this.request<Department>(`/departments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(department),
    });
  }

  async deleteDepartment(id: number) {
    return this.request<{}>(`/departments/${id}`, {
      method: 'DELETE',
    });
  }

  // Employees
  async getEmployees() {
    return this.request<Employee[]>('/employees');
  }

  async createEmployee(employee: Partial<Employee>) {
    return this.request<Employee>('/employees', {
      method: 'POST',
      body: JSON.stringify(employee),
    });
  }

  async updateEmployee(id: number, employee: Partial<Employee>) {
    return this.request<Employee>(`/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(employee),
    });
  }

  async deleteEmployee(id: number) {
    return this.request<{}>(`/employees/${id}`, {
      method: 'DELETE',
    });
  }

  async getEmployeeStatistics() {
    return this.request('/employees/statistics');
  }
}

export const apiService = new ApiService();
