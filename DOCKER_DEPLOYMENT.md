# HR 管理系统 Docker 部署指南

## 📋 概述

本项目已配置完整的 Docker 容器化部署方案，包含前端 React 应用和后端 NestJS API 服务。

## 🐳 系统要求

- Docker Engine 20.10+
- Docker Compose 2.0+
- 至少 2GB 可用内存
- 至少 5GB 可用磁盘空间

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone <your-repo-url>
cd hr-management-system
```

### 2. 使用脚本启动（推荐）
```bash
# 启动服务
./docker-start.sh

# 停止服务
./docker-stop.sh
```

### 3. 手动启动
```bash
# 构建镜像
docker-compose build

# 启动服务
docker-compose up -d

# 查看状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

## 🌐 访问地址

- **前端界面**: http://localhost
- **后端API**: http://localhost:3001
- **健康检查**: http://localhost/health

## 📁 项目结构

```
hr-management-system/
├── backend/
│   ├── Dockerfile          # 后端 Docker 配置
│   └── src/
├── frontend/
│   ├── Dockerfile          # 前端 Docker 配置
│   ├── nginx.conf          # Nginx 配置
│   └── src/
├── docker-compose.yml      # 服务编排配置
├── .dockerignore           # Docker 忽略文件
├── docker-start.sh         # 启动脚本
├── docker-stop.sh          # 停止脚本
└── DOCKER_DEPLOYMENT.md    # 本文档
```

## 🔧 配置说明

### 后端配置 (backend/Dockerfile)
- 基于 Node.js 18 Alpine 镜像
- 多阶段构建优化镜像大小
- 使用非 root 用户运行
- 健康检查配置
- 端口: 3001

### 前端配置 (frontend/Dockerfile)
- 基于 Node.js 18 Alpine 构建
- 使用 Nginx Alpine 服务静态文件
- 配置 API 代理到后端
- 支持 React Router
- 端口: 80

### Nginx 配置 (frontend/nginx.conf)
- Gzip 压缩
- 静态资源缓存
- API 代理配置
- 安全头设置
- 健康检查端点

## 📊 常用命令

### 服务管理
```bash
# 启动服务
docker-compose up -d

# 停止服务
docker-compose down

# 重启服务
docker-compose restart

# 查看状态
docker-compose ps

# 查看日志
docker-compose logs -f [service-name]
```

### 镜像管理
```bash
# 重新构建镜像
docker-compose build --no-cache

# 删除镜像
docker-compose down --rmi all

# 清理未使用的镜像
docker image prune -f
```

### 数据管理
```bash
# 停止并清理数据卷
docker-compose down -v

# 备份数据卷
docker run --rm -v hr-management-system_backend-logs:/data -v $(pwd):/backup alpine tar czf /backup/backend-logs.tar.gz -C /data .

# 恢复数据卷
docker run --rm -v hr-management-system_backend-logs:/data -v $(pwd):/backup alpine tar xzf /backup/backend-logs.tar.gz -C /data
```

## 🔍 故障排除

### 常见问题

1. **端口冲突**
   ```bash
   # 检查端口占用
   lsof -i :80
   lsof -i :3001
   
   # 修改 docker-compose.yml 中的端口映射
   ports:
     - "8080:80"  # 改为其他端口
   ```

2. **构建失败**
   ```bash
   # 清理缓存重新构建
   docker-compose build --no-cache
   
   # 检查网络连接
   docker network ls
   ```

3. **服务无法启动**
   ```bash
   # 查看详细日志
   docker-compose logs [service-name]
   
   # 检查健康状态
   docker-compose ps
   ```

4. **内存不足**
   ```bash
   # 增加 Docker 内存限制
   # 在 Docker Desktop 设置中调整内存限制
   ```

### 日志查看
```bash
# 查看所有服务日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs -f backend
docker-compose logs -f frontend

# 查看最近 100 行日志
docker-compose logs --tail=100
```

## 🔒 安全配置

### 生产环境建议

1. **修改默认端口**
   ```yaml
   ports:
     - "8080:80"      # 前端
     - "3002:3001"    # 后端
   ```

2. **添加环境变量**
   ```yaml
   environment:
     - NODE_ENV=production
     - JWT_SECRET=your-secret-key
   ```

3. **配置反向代理**
   - 使用 Nginx 或 Apache 作为反向代理
   - 配置 SSL 证书
   - 设置防火墙规则

4. **数据持久化**
   ```yaml
   volumes:
     - ./data:/app/data
     - ./logs:/app/logs
   ```

## 📈 性能优化

### 镜像优化
- 使用多阶段构建
- 清理不必要的文件
- 使用 Alpine 基础镜像
- 合并 RUN 指令

### 运行时优化
- 配置资源限制
- 使用健康检查
- 配置日志轮转
- 启用 Gzip 压缩

## 🆘 获取帮助

如果遇到问题，请：

1. 查看日志文件
2. 检查系统资源
3. 验证网络连接
4. 参考故障排除部分
5. 提交 Issue 到项目仓库

## 📝 更新日志

- **v1.0.0**: 初始 Docker 配置
- 支持前后端分离部署
- 配置 Nginx 反向代理
- 添加健康检查
- 优化镜像大小 