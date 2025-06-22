import React, { useState } from 'react';
import { Plus, Edit, Trash2, Users, Building2 } from 'lucide-react';

interface Department {
  id: number;
  name: string;
  description: string;
  budget: number;
}

interface Employee {
  id: number;
  departmentId: number;
}

interface DepartmentManagementProps {
  departments: Department[];
  employees: Employee[];
  onCreateDepartment: (department: Omit<Department, 'id'>) => void;
  onUpdateDepartment: (id: number, department: Partial<Department>) => void;
  onDeleteDepartment: (id: number) => void;
}

const DepartmentManagement: React.FC<DepartmentManagementProps> = ({
  departments,
  employees,
  onCreateDepartment,
  onUpdateDepartment,
  onDeleteDepartment,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    budget: 0,
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const resetForm = () => {
    setFormData({ name: '', description: '', budget: 0 });
    setErrors({});
    setEditingDept(null);
    setShowForm(false);
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = '部门名称是必需的';
    }

    if (!formData.description.trim()) {
      newErrors.description = '部门描述是必需的';
    }

    if (formData.budget < 0) {
      newErrors.budget = '预算不能为负数';
    }

    if (formData.budget === 0) {
      newErrors.budget = '预算必须大于0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (editingDept) {
      onUpdateDepartment(editingDept.id, formData);
    } else {
      onCreateDepartment(formData);
    }
    resetForm();
  };

  const handleEdit = (dept: Department) => {
    setFormData({
      name: dept.name,
      description: dept.description,
      budget: dept.budget,
    });
    setErrors({});
    setEditingDept(dept);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('确定要删除这个部门吗？')) {
      onDeleteDepartment(id);
    }
  };

  const getDepartmentEmployeeCount = (deptId: number) => {
    return employees.filter((emp) => emp.departmentId === deptId).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">部门管理</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white/30 hover:bg-white/40 text-white rounded-lg transition-all"
        >
          <Plus size={16} />
          添加部门
        </button>
      </div>

      {/* 部门表单 */}
      {showForm && (
        <div className="backdrop-blur-md bg-white/20 rounded-xl p-6 border border-white/30">
          <h3 className="text-lg font-semibold text-white mb-4">
            {editingDept ? '编辑部门' : '添加部门'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="部门名称"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({...errors, name: ''});
                }}
                className={`w-full p-3 rounded-lg bg-white/20 border text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                  errors.name ? 'border-red-400' : 'border-white/30'
                }`}
                required
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            
            <div>
              <textarea
                placeholder="部门描述"
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                  if (errors.description) setErrors({...errors, description: ''});
                }}
                className={`w-full p-3 rounded-lg bg-white/20 border text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                  errors.description ? 'border-red-400' : 'border-white/30'
                }`}
                rows={3}
                required
              />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1">{errors.description}</p>
              )}
            </div>
            
            <div>
              <input
                type="number"
                placeholder="预算 (元)"
                min="0"
                step="1000"
                value={formData.budget}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setFormData({ ...formData, budget: value });
                  if (errors.budget) setErrors({...errors, budget: ''});
                }}
                className={`w-full p-3 rounded-lg bg-white/20 border text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                  errors.budget ? 'border-red-400' : 'border-white/30'
                }`}
                required
              />
              {errors.budget && (
                <p className="text-red-400 text-sm mt-1">{errors.budget}</p>
              )}
              {formData.budget > 0 && (
                <p className="text-white/60 text-sm mt-1">
                  预算: ¥{formData.budget.toLocaleString()} 元
                </p>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500/30 hover:bg-green-500/40 text-white rounded-lg transition-all"
              >
                {editingDept ? '更新' : '创建'}
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

      {/* 部门列表 */}
      <div className="grid gap-4">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="backdrop-blur-md bg-white/20 rounded-xl p-6 border border-white/30"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-white">
                    {dept.name}
                  </h3>
                  <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/30 rounded-full">
                    <Users size={14} className="text-white" />
                    <span className="text-white text-sm">
                      {getDepartmentEmployeeCount(dept.id)}
                    </span>
                  </div>
                </div>
                <p className="text-white/80 mb-3">{dept.description}</p>
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <span className="font-medium text-green-400">
                    预算: ¥{dept.budget.toLocaleString()}
                  </span>
                  <span>员工: {getDepartmentEmployeeCount(dept.id)} 人</span>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(dept)}
                  className="p-2 bg-blue-500/30 hover:bg-blue-500/40 text-white rounded-lg transition-all"
                  title="编辑部门"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(dept.id)}
                  className="p-2 bg-red-500/30 hover:bg-red-500/40 text-white rounded-lg transition-all"
                  title="删除部门"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {departments.length === 0 && (
          <div className="text-center py-12 text-white/60">
            <Building2 size={48} className="mx-auto mb-4 opacity-50" />
            <p>暂无部门数据</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentManagement;
