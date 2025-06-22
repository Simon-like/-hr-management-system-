import React, { useState } from 'react';
import { UserPlus, Edit, Trash2, Mail, Phone, Calendar } from 'lucide-react';

interface Department {
  id: number;
  name: string;
}

interface Employee {
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

interface EmployeeManagementProps {
  employees: Employee[];
  departments: Department[];
  onCreateEmployee: (employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateEmployee: (id: number, employee: Partial<Omit<Employee, 'id' | 'createdAt'>>) => void;
  onDeleteEmployee: (id: number) => void;
}

const EmployeeManagement: React.FC<EmployeeManagementProps> = ({
  employees,
  departments,
  onCreateEmployee,
  onUpdateEmployee,
  onDeleteEmployee,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<number>(0);
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    email: '',
    phone: '',
    position: '',
    departmentId: 0,
    salary: 0,
    hireDate: '',
    status: 'active' as 'active' | 'inactive' | 'terminated',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
  });

  const resetForm = () => {
    setFormData({
      employeeId: '',
      name: '',
      email: '',
      phone: '',
      position: '',
      departmentId: 0,
      salary: 0,
      hireDate: '',
      status: 'active',
      address: '',
      emergencyContact: '',
      emergencyPhone: '',
    });
    setEditingEmployee(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      hireDate: new Date(formData.hireDate),
    };
    
    if (editingEmployee) {
      onUpdateEmployee(editingEmployee.id, submitData);
    } else {
      onCreateEmployee(submitData);
    }
    resetForm();
  };

  const handleEdit = (employee: Employee) => {
    setFormData({
      employeeId: employee.employeeId,
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      position: employee.position,
      departmentId: employee.departmentId,
      salary: employee.salary,
      hireDate: employee.hireDate.toString().split('T')[0],
      status: employee.status,
      address: employee.address,
      emergencyContact: employee.emergencyContact,
      emergencyPhone: employee.emergencyPhone,
    });
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('确定要删除这个员工吗？')) {
      onDeleteEmployee(id);
    }
  };

  const getDepartmentName = (deptId: number) => {
    const dept = departments.find((d) => d.id === deptId);
    return dept ? dept.name : '未知部门';
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      searchTerm === '' ||
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      selectedDepartment === 0 || employee.departmentId === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">员工管理</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white/30 hover:bg-white/40 text-white rounded-lg transition-all"
        >
          <UserPlus size={16} />
          添加员工
        </button>
      </div>

      {/* 搜索和过滤 */}
      <div className="backdrop-blur-md bg-white/20 rounded-xl p-4 border border-white/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="搜索员工姓名、邮箱、职位或工号..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(Number(e.target.value))}
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <option value={0} className="text-gray-900">
              所有部门
            </option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id} className="text-gray-900">
                {dept.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 员工表单 */}
      {showForm && (
        <div className="backdrop-blur-md bg-white/20 rounded-xl p-6 border border-white/30">
          <h3 className="text-lg font-semibold text-white mb-4">
            {editingEmployee ? '编辑员工' : '添加员工'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="工号"
                value={formData.employeeId}
                onChange={(e) =>
                  setFormData({ ...formData, employeeId: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <input
                type="text"
                placeholder="姓名"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>
            <input
              type="email"
              placeholder="邮箱"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
            <input
              type="tel"
              placeholder="电话"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
            <input
              type="text"
              placeholder="职位"
              value={formData.position}
              onChange={(e) =>
                setFormData({ ...formData, position: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
            <select
              value={formData.departmentId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  departmentId: Number(e.target.value),
                })
              }
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            >
              <option value={0} className="text-gray-900">
                选择部门
              </option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id} className="text-gray-900">
                  {dept.name}
                </option>
              ))}
            </select>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="薪资"
                value={formData.salary}
                onChange={(e) =>
                  setFormData({ ...formData, salary: Number(e.target.value) })
                }
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <input
                type="date"
                placeholder="入职日期"
                value={formData.hireDate}
                onChange={(e) =>
                  setFormData({ ...formData, hireDate: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as 'active' | 'inactive' | 'terminated',
                })
              }
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            >
              <option value="active" className="text-gray-900">在职</option>
              <option value="inactive" className="text-gray-900">离职</option>
              <option value="terminated" className="text-gray-900">解雇</option>
            </select>
            <input
              type="text"
              placeholder="地址"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="紧急联系人"
                value={formData.emergencyContact}
                onChange={(e) =>
                  setFormData({ ...formData, emergencyContact: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <input
                type="tel"
                placeholder="紧急联系人电话"
                value={formData.emergencyPhone}
                onChange={(e) =>
                  setFormData({ ...formData, emergencyPhone: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500/30 hover:bg-green-500/40 text-white rounded-lg transition-all"
              >
                {editingEmployee ? '更新' : '创建'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-500/30 hover:bg-gray-500/40 text-white rounded-lg transition-all"
              >
                取消
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 员工列表 */}
      <div className="grid gap-4">
        {filteredEmployees.map((employee) => (
          <div
            key={employee.id}
            className="backdrop-blur-md bg-white/20 rounded-xl p-6 border border-white/30"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-white">
                    {employee.name}
                  </h3>
                  <span className="px-2 py-1 bg-gray-500/30 text-white text-xs rounded-full">
                    {employee.employeeId}
                  </span>
                  <span className="px-3 py-1 bg-blue-500/30 text-white text-sm rounded-full">
                    {employee.position}
                  </span>
                  <span className={`px-3 py-1 text-white text-sm rounded-full ${
                    employee.status === 'active' ? 'bg-green-500/30' :
                    employee.status === 'inactive' ? 'bg-yellow-500/30' :
                    'bg-red-500/30'
                  }`}>
                    {employee.status === 'active' ? '在职' :
                     employee.status === 'inactive' ? '离职' : '解雇'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/80 mb-3">
                  <div className="flex items-center gap-2">
                    <Mail size={14} />
                    <span>{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} />
                    <span>{employee.phone}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-white/60">
                  <span>部门: {employee.departmentName || getDepartmentName(employee.departmentId)}</span>
                  <span>薪资: ¥{employee.salary.toLocaleString()}</span>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>入职: {new Date(employee.hireDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(employee)}
                  className="p-2 bg-blue-500/30 hover:bg-blue-500/40 text-white rounded-lg transition-all"
                  title="编辑员工"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(employee.id)}
                  className="p-2 bg-red-500/30 hover:bg-red-500/40 text-white rounded-lg transition-all"
                  title="删除员工"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12 text-white/60">
            <UserPlus size={48} className="mx-auto mb-4 opacity-50" />
            <p>
              {searchTerm || selectedDepartment
                ? '未找到匹配的员工'
                : '暂无员工数据'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeManagement;
