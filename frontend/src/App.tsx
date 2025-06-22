import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Building2, LogOut, Menu, X, User as UserIcon } from 'lucide-react';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import EmployeeManagement from './components/EmployeeManagement';
import DepartmentManagement from './components/DepartmentManagement';
import { apiService } from './services/api';
import type {
  Employee,
  Department,
  LoginData,
  RegisterData,
  ApiResponse,
  User,
} from './types';

type TabType = 'dashboard' | 'employees' | 'departments';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Data states
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      apiService.setToken(token);
      setIsAuthenticated(true);
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [employeesData, departmentsData] = await Promise.all([
        apiService.getEmployees(),
        apiService.getDepartments(),
      ]);
      setEmployees(employeesData as Employee[]);
      setDepartments(departmentsData as Department[]);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      // If token is invalid, logout
      if (error instanceof Error && error.message.includes('401')) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (credentials: LoginData) => {
    setIsLoading(true);
    try {
      const response = (await apiService.login(credentials)) as any;
      const token = response.access_token || response.token;
      if (token) {
        localStorage.setItem('token', token);
        apiService.setToken(token);
        setIsAuthenticated(true);
        if (response.user) {
          setCurrentUser(response.user);
        }
        await fetchData();
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      await apiService.register(userData);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    apiService.setToken('');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setEmployees([]);
    setDepartments([]);
    setCurrentTab('dashboard');
  };

  // Employee handlers
  const handleCreateEmployee = async (employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newEmployee = (await apiService.createEmployee(
        employee,
      )) as Employee;
      setEmployees((prev) => [...prev, newEmployee]);
    } catch (error) {
      console.error('Failed to create employee:', error);
      alert('创建员工失败');
    }
  };

  const handleUpdateEmployee = async (
    id: number,
    employee: Partial<Employee>,
  ) => {
    try {
      const updatedEmployee = (await apiService.updateEmployee(
        id,
        employee,
      )) as Employee;
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === id ? { ...emp, ...updatedEmployee } : emp)),
      );
    } catch (error) {
      console.error('Failed to update employee:', error);
      alert('更新员工失败');
    }
  };

  const handleDeleteEmployee = async (id: number) => {
    try {
      await apiService.deleteEmployee(id);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error('Failed to delete employee:', error);
      alert('删除员工失败');
    }
  };

  // Department handlers
  const handleCreateDepartment = async (department: Omit<Department, 'id'>) => {
    try {
      const newDepartment = (await apiService.createDepartment(
        department,
      )) as Department;
      setDepartments((prev) => [...prev, newDepartment]);
    } catch (error) {
      console.error('Failed to create department:', error);
      const errorMessage = error instanceof Error ? error.message : '创建部门失败';
      alert(`创建部门失败: ${errorMessage}`);
    }
  };

  const handleUpdateDepartment = async (
    id: number,
    department: Partial<Department>,
  ) => {
    try {
      const updatedDepartment = (await apiService.updateDepartment(
        id,
        department,
      )) as Department;
      setDepartments((prev) =>
        prev.map((dept) => (dept.id === id ? updatedDepartment : dept)),
      );
    } catch (error) {
      console.error('Failed to update department:', error);
      const errorMessage = error instanceof Error ? error.message : '更新部门失败';
      alert(`更新部门失败: ${errorMessage}`);
    }
  };

  const handleDeleteDepartment = async (id: number) => {
    try {
      await apiService.deleteDepartment(id);
      setDepartments((prev) => prev.filter((dept) => dept.id !== id));
    } catch (error) {
      console.error('Failed to delete department:', error);
      const errorMessage = error instanceof Error ? error.message : '删除部门失败';
      alert(`删除部门失败: ${errorMessage}`);
    }
  };

  // Navigation component
  const Navigation = () => (
    <nav className="backdrop-blur-md bg-white/20 rounded-xl p-4 border border-white/30">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-white">HR 管理系统</h1>
      </div>

      {/* 当前用户信息 */}
      {currentUser && (
        <div className="mb-4 p-3 bg-white/10 rounded-lg border border-white/20">
          <div className="flex items-center gap-2 mb-2">
            <UserIcon size={16} className="text-white/80" />
            <span className="text-sm font-medium text-white">当前用户</span>
          </div>
          <div className="text-sm text-white/80">
            <div>用户名: {currentUser.username}</div>
            <div>邮箱: {currentUser.email}</div>
            <div>角色: {
              currentUser.role === 'admin' ? '管理员' :
              currentUser.role === 'hr' ? '人力资源' :
              currentUser.role === 'manager' ? '经理' : '未知'
            }</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-2">
        <button
          onClick={() => setCurrentTab('dashboard')}
          className={`flex items-center gap-2 p-3 rounded-lg transition-all ${
            currentTab === 'dashboard'
              ? 'bg-white/30 text-white'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <BarChart3 size={16} />
          <span className="hidden sm:inline">仪表盘</span>
        </button>

        <button
          onClick={() => setCurrentTab('employees')}
          className={`flex items-center gap-2 p-3 rounded-lg transition-all ${
            currentTab === 'employees'
              ? 'bg-white/30 text-white'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <Users size={16} />
          <span className="hidden sm:inline">员工管理</span>
        </button>

        <button
          onClick={() => setCurrentTab('departments')}
          className={`flex items-center gap-2 p-3 rounded-lg transition-all ${
            currentTab === 'departments'
              ? 'bg-white/30 text-white'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <Building2 size={16} />
          <span className="hidden sm:inline">部门管理</span>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 bg-red-500/30 hover:bg-red-500/40 text-white rounded-lg transition-all"
        >
          <LogOut size={16} />
          退出
        </button>
      </div>
    </nav>
  );

  // Mobile navigation
  const MobileNavigation = () => (
    <div className="lg:hidden">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 right-4 z-50 p-2 bg-white/20 rounded-lg text-white"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-blue-600 to-purple-600 p-4">
            <Navigation />
          </div>
        </div>
      )}
    </div>
  );

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  // Login screen
  if (!isAuthenticated) {
    return (
      <LoginForm
        onLogin={handleLogin}
        onRegister={handleRegister}
        isLoading={isLoading}
      />
    );
  }

  console.log(currentTab);

  // Main application
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <MobileNavigation />

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="hidden lg:block">
              <Navigation />
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {currentTab === 'dashboard' && (
              <Dashboard departments={departments} employees={employees} />
            )}

            {currentTab === 'employees' && (
              <EmployeeManagement
                employees={employees}
                departments={departments}
                onCreateEmployee={handleCreateEmployee}
                onUpdateEmployee={handleUpdateEmployee}
                onDeleteEmployee={handleDeleteEmployee}
              />
            )}

            {currentTab === 'departments' && (
              <DepartmentManagement
                departments={departments}
                employees={employees}
                onCreateDepartment={handleCreateDepartment}
                onUpdateDepartment={handleUpdateDepartment}
                onDeleteDepartment={handleDeleteDepartment}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
