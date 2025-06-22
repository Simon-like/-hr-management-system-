# HR 管理系统 - 前端

这是一个现代化的人力资源管理系统前端应用，使用 React + TypeScript + Tailwind CSS 构建。

## 功能特性

- 🔐 用户认证（登录/注册）
- 📊 仪表盘统计
- 👥 员工管理（增删改查）
- 🏢 部门管理（增删改查）
- 📱 响应式设计
- 🎨 现代化UI设计

## 技术栈

- **React 19** - 前端框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Lucide React** - 图标库
- **Vite** - 构建工具

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动。

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
src/
├── components/          # React组件
│   ├── Dashboard.tsx           # 仪表盘组件
│   ├── DepartmentManagement.tsx # 部门管理组件
│   ├── EmployeeManagement.tsx  # 员工管理组件
│   └── LoginForm.tsx          # 登录表单组件
├── services/           # API服务
│   └── api.ts                 # API客户端
├── types/              # TypeScript类型定义
│   └── index.ts               # 类型接口
├── App.tsx             # 主应用组件
└── main.tsx            # 应用入口
```

## API 配置

确保后端服务器在 `http://localhost:3001` 运行，或者修改 `src/services/api.ts` 中的 `API_BASE` 配置。

## 功能说明

### 认证系统
- 支持用户注册和登录
- JWT token 认证
- 自动登录状态保持

### 仪表盘
- 显示部门和员工统计
- 平均薪资计算
- 部门预算概览

### 员工管理
- 员工信息的增删改查
- 按部门筛选
- 搜索功能
- 表单验证

### 部门管理
- 部门信息的增删改查
- 员工数量统计
- 预算管理

## 开发指南

### 添加新组件

1. 在 `src/components/` 目录下创建新组件
2. 使用 TypeScript 接口定义 props
3. 使用 Tailwind CSS 进行样式设计
4. 在 `App.tsx` 中集成新组件

### API 集成

1. 在 `src/services/api.ts` 中添加新的 API 方法
2. 在 `src/types/index.ts` 中定义相关类型
3. 在组件中调用 API 方法

### 样式指南

- 使用 Tailwind CSS 类名
- 遵循响应式设计原则
- 保持一致的视觉风格
- 使用 backdrop-blur 效果增强视觉层次

## 部署

### 构建

```bash
npm run build
```

### 部署到静态服务器

将 `dist` 目录的内容部署到任何静态文件服务器。

### 环境变量

创建 `.env` 文件来配置环境变量：

```env
VITE_API_BASE_URL=http://localhost:3001
```

## 贡献

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License
