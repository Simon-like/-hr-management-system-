import React from 'react';
import { Building2, Users, BarChart3, TrendingUp, DollarSign } from 'lucide-react';

interface Department {
  id: number;
  name: string;
  description: string;
  budget: number;
}

interface Employee {
  id: number;
  name: string;
  salary: number;
  departmentId: number;
}

interface DashboardProps {
  departments: Department[];
  employees: Employee[];
}

const Dashboard: React.FC<DashboardProps> = ({ departments, employees }) => {
  const averageSalary =
    employees.length > 0
      ? Math.round(
          employees.reduce((sum, emp) => sum + emp.salary, 0) /
            employees.length,
        )
      : 0;

  const totalBudget = departments.reduce((sum, dept) => sum + dept.budget, 0);
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const budgetUtilization = totalBudget > 0 ? Math.round((totalSalary / totalBudget) * 100) : 0;
  
  // 按预算排序的部门
  const departmentsByBudget = [...departments].sort((a, b) => b.budget - a.budget);
  
  // 平均部门预算
  const averageDepartmentBudget = departments.length > 0 
    ? Math.round(totalBudget / departments.length) 
    : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">仪表盘</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="backdrop-blur-md bg-white/20 rounded-xl p-6 border border-white/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">总部门数</p>
              <p className="text-3xl font-bold text-white">
                {departments.length}
              </p>
            </div>
            <Building2 className="text-white/60" size={32} />
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/20 rounded-xl p-6 border border-white/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">总员工数</p>
              <p className="text-3xl font-bold text-white">
                {employees.length}
              </p>
            </div>
            <Users className="text-white/60" size={32} />
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/20 rounded-xl p-6 border border-white/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">平均薪资</p>
              <p className="text-3xl font-bold text-white">
                ¥{averageSalary.toLocaleString()}
              </p>
            </div>
            <BarChart3 className="text-white/60" size={32} />
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/20 rounded-xl p-6 border border-white/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">总预算</p>
              <p className="text-3xl font-bold text-white">
                ¥{totalBudget.toLocaleString()}
              </p>
            </div>
            <DollarSign className="text-white/60" size={32} />
          </div>
        </div>
      </div>

      {/* 预算统计 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="backdrop-blur-md bg-white/20 rounded-xl p-6 border border-white/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">预算使用率</h3>
            <TrendingUp className="text-white/60" size={24} />
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-white mb-2">{budgetUtilization}%</p>
            <p className="text-white/70 text-sm">
              薪资支出 / 总预算
            </p>
            <div className="mt-3 bg-white/20 rounded-full h-2">
              <div 
                className="bg-green-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/20 rounded-xl p-6 border border-white/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">平均部门预算</h3>
            <Building2 className="text-white/60" size={24} />
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-white mb-2">
              ¥{averageDepartmentBudget.toLocaleString()}
            </p>
            <p className="text-white/70 text-sm">
              每个部门平均预算
            </p>
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/20 rounded-xl p-6 border border-white/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">薪资支出</h3>
            <Users className="text-white/60" size={24} />
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-white mb-2">
              ¥{totalSalary.toLocaleString()}
            </p>
            <p className="text-white/70 text-sm">
              年度薪资总额
            </p>
          </div>
        </div>
      </div>

      {/* 部门概览 */}
      <div className="backdrop-blur-md bg-white/20 rounded-xl p-6 border border-white/30">
        <h3 className="text-xl font-semibold text-white mb-4">部门预算排名</h3>
        <div className="space-y-3">
          {departmentsByBudget.slice(0, 5).map((dept, index) => {
            const deptEmployees = employees.filter(
              (emp) => emp.departmentId === dept.id,
            );
            const deptSalary = deptEmployees.reduce((sum, emp) => sum + emp.salary, 0);
            const deptUtilization = dept.budget > 0 ? Math.round((deptSalary / dept.budget) * 100) : 0;
            
            return (
              <div
                key={dept.id}
                className="flex items-center justify-between p-3 bg-white/10 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{dept.name}</p>
                    <p className="text-white/70 text-sm">
                      {deptEmployees.length} 名员工
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">¥{dept.budget.toLocaleString()}</p>
                  <p className="text-white/70 text-sm">
                    使用率: {deptUtilization}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
