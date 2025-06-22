# HR 管理系统 (HR Management System)

一个现代化的企业人力资源管理系统，提供员工管理、部门管理、数据统计等功能。采用前后端分离架构，支持本地开发和Docker部署。

## 🚀 功能特性

- **用户认证**: JWT身份验证，支持多角色权限管理
- **员工管理**: 完整的员工信息CRUD操作
- **部门管理**: 部门信息管理和预算控制
- **数据统计**: 员工和部门数据可视化展示
- **响应式设计**: 支持桌面端和移动端访问
- **Docker支持**: 一键容器化部署

## ��️ 技术栈

### 后端 (Backend)
- **框架**: NestJS (Node.js)
- **语言**: TypeScript
- **认证**: JWT + Passport
- **验证**: class-validator
- **加密**: bcrypt

### 前端 (Frontend)
- **框架**: React 19
- **构建工具**: Vite
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React

### 部署
- **容器化**: Docker + Docker Compose
- **Web服务器**: Nginx
- **进程管理**: PM2

## 📋 系统要求

- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0
- **Docker**: >= 20.0.0 (可选，用于容器化部署)

## 🛠️ 快速开始

### 方式一：本地开发环境

1. **克隆项目**
```bash
git clone <repository-url>
cd hr-management-system
```

2. **一键启动**
```bash
# 使用提供的启动脚本
./start.sh
```

启动脚本会自动：
- 检查依赖并安装
- 启动后端服务 (端口: 3001)
- 启动前端服务 (端口: 3000)
- 显示服务状态和日志位置

3. **访问系统**
- 前端界面: http://localhost:3000
- 后端API: http://localhost:3001

### 方式二：Docker部署

1. **构建并启动容器**
```bash
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps
```

2. **访问系统**
- 前端界面: http://localhost
- 后端API: http://localhost:3001

## �� 使用指南

### 初始设置

1. **注册管理员账户**
   - 访问系统登录页面
   - 点击"注册"按钮
   - 填写管理员信息（建议角色选择"admin"）

2. **登录系统**
   - 使用注册的账户登录
   - 系统会自动跳转到主界面

### 功能模块

#### 仪表板 (Dashboard)
- 员工总数统计
- 部门数量统计
- 数据可视化图表

#### 员工管理
- 添加新员工
- 编辑员工信息
- 删除员工记录
- 按部门筛选员工

#### 部门管理
- 创建新部门
- 编辑部门信息
- 设置部门预算
- 删除部门

## 🔧 开发指南

### 项目结构

```bash
hr-management-system/
├── backend/ # 后端服务
│ ├── src/
│ │ ├── auth/ # 认证模块
│ │ ├── employees/ # 员工管理
│ │ ├── departments/ # 部门管理
│ │ └── users/ # 用户管理
│ └── package.json
├── frontend/ # 前端应用
│ ├── src/
│ │ ├── components/ # React组件
│ │ ├── services/ # API服务
│ │ └── types/ # TypeScript类型
│ └── package.json
├── logs/ # 日志文件
├── docker-compose.yml # Docker配置
└── start.sh # 启动脚本
```

### 开发命令

#### 后端开发
```bash
cd backend

# 安装依赖
npm install

# 开发模式启动
npm run start:dev

# 构建生产版本
npm run build
```

#### 前端开发
```bash
cd frontend

# 安装依赖
npm install

# 开发模式启动
npm run dev

# 构建生产版本
npm run build

# 代码检查
npm run lint
```

### API接口文档

详细的API接口文档请参考 [apiTest_guide.md](./apiTest_guide.md)

主要接口包括：
- **认证**: `/auth/login`, `/auth/register`
- **员工管理**: `/employees`
- **部门管理**: `/departments`

## �� Docker部署

### 生产环境部署

1. **构建镜像**
```bash
# 构建所有服务
docker-compose build

# 启动服务
docker-compose up -d
```

2. **查看日志**
```bash
# 查看所有服务日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs -f backend
docker-compose logs -f frontend
```

3. **停止服务**
```bash
docker-compose down
```

### 环境变量配置

可以通过环境变量自定义配置：

```bash
# 后端环境变量
NODE_ENV=production
PORT=3001

# 前端环境变量
VITE_API_BASE_URL=http://localhost:3001
```

## 📊 监控和日志

### 日志管理
- **后端日志**: `logs/backend.log`
- **前端日志**: `logs/frontend.log`
- **查看日志**: `./logs.sh`

### 服务状态
- **查看状态**: `./status.sh`
- **停止服务**: `./stop.sh`

## �� 安全特性

- JWT令牌认证
- 密码加密存储 (bcrypt)
- CORS跨域保护
- 输入数据验证
- 角色权限控制


## �� 常见问题

### Q: 启动时提示端口被占用？
A: 请检查端口3000和3001是否被其他服务占用，可以使用以下命令查看：
```bash
lsof -i :3000
lsof -i :3001
```

### Q: Docker容器启动失败？
A: 请检查Docker服务是否正常运行，并查看容器日志：
```bash
docker-compose logs
```

### Q: 前端无法连接后端API？
A: 请确认后端服务正常运行，并检查CORS配置是否正确。

---

**HR管理系统** - 让企业人力资源管理更简单高效 ��