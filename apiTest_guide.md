# HR 管理系统 Postman 接口测试指南

## 基础配置

**服务器地址**: `http://localhost:3001`

## 测试步骤

### 1. 用户注册

**请求方式**: `POST`  
**URL**: `http://localhost:3001/auth/register`  
**Headers**: 
```
Content-Type: application/json
```

**请求体** (JSON):
```json
{
  "username": "admin",
  "password": "123456",
  "email": "admin@company.com",
  "role": "admin"
}
```

**角色说明**:
- `admin`: 管理员
- `hr`: 人事
- `manager`: 经理
- `employee`: 员工

**响应示例**:
```json
{
  "id": 1,
  "username": "admin",
  "email": "admin@company.com",
  "role": "admin"
}
```

### 2. 用户登录

**请求方式**: `POST`  
**URL**: `http://localhost:3001/auth/login`  
**Headers**: 
```
Content-Type: application/json
```

**请求体** (JSON):
```json
{
  "username": "admin",
  "password": "123456"
}
```

**响应示例**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@company.com",
    "role": "admin"
  }
}
```

⚠️ **重要**: 保存返回的 `access_token`，后续请求需要使用。

### 3. 设置认证 Token

登录成功后，为所有后续请求添加 Authorization header：

**Headers**:
```
Authorization: Bearer [your_access_token]
Content-Type: application/json
```

## 部门管理接口

### 4. 创建部门

**请求方式**: `POST`  
**URL**: `http://localhost:3001/departments`  
**Headers**: 
```
Authorization: Bearer [your_access_token]
Content-Type: application/json
```

**请求体** (JSON):
```json
{
  "name": "技术部",
  "description": "负责公司技术研发工作",
  "budget": 1000000
}
```

### 5. 查询所有部门

**请求方式**: `GET`  
**URL**: `http://localhost:3001/departments`  
**Headers**: 
```
Authorization: Bearer [your_access_token]
```

### 6. 根据ID查询部门

**请求方式**: `GET`  
**URL**: `http://localhost:3001/departments/1`  
**Headers**: 
```
Authorization: Bearer [your_access_token]
```

### 7. 更新部门信息

**请求方式**: `PUT`  
**URL**: `http://localhost:3001/departments/1`  
**Headers**: 
```
Authorization: Bearer [your_access_token]
Content-Type: application/json
```

**请求体** (JSON):
```json
{
  "name": "技术研发部",
  "description": "负责公司核心技术研发工作",
  "budget": 1200000
}
```

### 8. 删除部门

**请求方式**: `DELETE`  
**URL**: `http://localhost:3001/departments/1`  
**Headers**: 
```
Authorization: Bearer [your_access_token]
```

## 员工管理接口

### 9. 创建员工

**请求方式**: `POST`  
**URL**: `http://localhost:3001/employees`  
**Headers**: 
```
Authorization: Bearer [your_access_token]
Content-Type: application/json
```

**请求体** (JSON):
```json
{
  "firstName": "张",
  "lastName": "三",
  "email": "zhangsan@company.com",
  "phone": "13800138000",
  "position": "软件工程师",
  "departmentId": 1,
  "salary": 15000,
  "hireDate": "2024-01-15"
}
```

### 10. 查询所有员工

**请求方式**: `GET`  
**URL**: `http://localhost:3001/employees`  
**Headers**: 
```
Authorization: Bearer [your_access_token]
```

### 11. 按部门查询员工

**请求方式**: `GET`  
**URL**: `http://localhost:3001/employees?departmentId=1`  
**Headers**: 
```
Authorization: Bearer [your_access_token]
```

### 12. 获取员工统计信息

**请求方式**: `GET`  
**URL**: `http://localhost:3001/employees/statistics`  
**Headers**: 
```
Authorization: Bearer [your_access_token]
```

### 13. 根据ID查询员工

**请求方式**: `GET`  
**URL**: `http://localhost:3001/employees/1`  
**Headers**: 
```
Authorization: Bearer [your_access_token]
```

### 14. 更新员工信息

**请求方式**: `PUT`  
**URL**: `http://localhost:3001/employees/1`  
**Headers**: 
```
Authorization: Bearer [your_access_token]
Content-Type: application/json
```

**请求体** (JSON):
```json
{
  "firstName": "张",
  "lastName": "三",
  "email": "zhangsan@company.com",
  "phone": "13800138001",
  "position": "高级软件工程师",
  "departmentId": 1,
  "salary": 18000
}
```

### 15. 删除员工

**请求方式**: `DELETE`  
**URL**: `http://localhost:3001/employees/1`  
**Headers**: 
```
Authorization: Bearer [your_access_token]
```

## 用户管理接口

### 16. 查询所有用户

**请求方式**: `GET`  
**URL**: `http://localhost:3001/users`  
**Headers**: 
```
Authorization: Bearer [your_access_token]
```

### 17. 根据ID查询用户

**请求方式**: `GET`  
**URL**: `http://localhost:3001/users/1`  
**Headers**: 
```
Authorization: Bearer [your_access_token]
```

### 18. 更新用户信息

**请求方式**: `PUT`  
**URL**: `http://localhost:3001/users/1`  
**Headers**: 
```
Authorization: Bearer [your_access_token]
Content-Type: application/json
```

**请求体** (JSON):
```json
{
  "username": "admin",
  "email": "admin@company.com",
  "role": "admin"
}
```

### 19. 删除用户

**请求方式**: `DELETE`  
**URL**: `http://localhost:3001/users/1`  
**Headers**: 
```
Authorization: Bearer [your_access_token]
```

## 测试建议流程

1. **注册用户** → 创建一个管理员账户
2. **登录** → 获取访问令牌
3. **创建部门** → 先创建几个部门
4. **创建员工** → 为部门添加员工
5. **查询测试** → 测试各种查询接口
6. **更新测试** → 测试更新功能
7. **删除测试** → 测试删除功能

## 常见错误处理

- **401 Unauthorized**: 检查 Authorization header 是否正确设置
- **400 Bad Request**: 检查请求体格式是否正确
- **404 Not Found**: 检查 URL 路径和资源ID是否存在
- **500 Internal Server Error**: 检查服务器日志，可能是数据库连接问题

## Postman 环境变量设置

建议在 Postman 中设置环境变量：

1. `baseUrl`: `http://localhost:3001`
2. `token`: 登录后获取的 access_token

这样可以在请求中使用 `{{baseUrl}}` 和 `{{token}}` 变量，便于管理。

**使用示例**:
- URL: `{{baseUrl}}/employees`
- Authorization: `Bearer {{token}}`