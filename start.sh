#!/bin/bash

# HR Management System - 启动脚本
# 同时启动后端和前端服务

echo "🚀 启动 HR 管理系统..."

# 检查是否在正确的目录
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ 错误：请在项目根目录下运行此脚本"
    echo "   当前目录应该包含 backend/ 和 frontend/ 文件夹"
    exit 1
fi

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误：未找到 Node.js，请先安装 Node.js"
    exit 1
fi

# 检查 npm 是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ 错误：未找到 npm，请先安装 npm"
    exit 1
fi

echo "📦 检查依赖包..."

# 检查后端依赖
if [ ! -d "backend/node_modules" ]; then
    echo "📦 安装后端依赖..."
    cd backend
    npm install
    cd ..
fi

# 检查前端依赖
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 安装前端依赖..."
    cd frontend
    npm install
    cd ..
fi

echo "✅ 依赖检查完成"

# 创建日志目录
mkdir -p logs

# 启动后端服务
echo "🔧 启动后端服务..."
cd backend
npm run start > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# 等待后端启动
echo "⏳ 等待后端服务启动..."
sleep 3

# 检查后端是否成功启动
if ! curl -s http://localhost:3001 > /dev/null; then
    echo "⚠️  后端服务可能未完全启动，但继续启动前端..."
fi

# 启动前端服务
echo "🎨 启动前端服务..."
cd frontend
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# 保存进程 ID 到文件
echo $BACKEND_PID > logs/backend.pid
echo $FRONTEND_PID > logs/frontend.pid

echo "✅ 服务启动完成！"
echo ""
echo "📊 服务状态："
echo "   🔧 后端服务: http://localhost:3001 (PID: $BACKEND_PID)"
echo "   🎨 前端服务: http://localhost:3000 (PID: $FRONTEND_PID)"
echo ""
echo "📝 日志文件："
echo "   🔧 后端日志: logs/backend.log"
echo "   🎨 前端日志: logs/frontend.log"
echo ""
echo "🛑 停止服务请运行: ./stop.sh"
echo "📋 查看日志请运行: ./logs.sh"
echo ""
echo "按 Ctrl+C 停止所有服务"

# 等待用户中断
trap 'echo ""; echo "🛑 正在停止服务..."; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; rm -f logs/backend.pid logs/frontend.pid; echo "✅ 服务已停止"; exit 0' INT

# 保持脚本运行
wait 