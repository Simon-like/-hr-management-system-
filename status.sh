#!/bin/bash

# HR Management System - 状态检查脚本
# 检查后端和前端服务的运行状态

echo "📊 HR 管理系统状态检查"
echo "======================"

# 检查后端服务状态
echo "🔧 后端服务状态:"
if [ -f "logs/backend.pid" ]; then
    BACKEND_PID=$(cat logs/backend.pid)
    if ps -p $BACKEND_PID > /dev/null 2>&1; then
        echo "   ✅ 运行中 (PID: $BACKEND_PID)"
        if curl -s http://localhost:3001 > /dev/null 2>&1; then
            echo "   ✅ 服务响应正常 (http://localhost:3001)"
        else
            echo "   ⚠️  服务无响应 (http://localhost:3001)"
        fi
    else
        echo "   ❌ 进程不存在 (PID: $BACKEND_PID)"
    fi
else
    echo "   ❌ 未运行"
fi

echo ""

# 检查前端服务状态
echo "🎨 前端服务状态:"
if [ -f "logs/frontend.pid" ]; then
    FRONTEND_PID=$(cat logs/frontend.pid)
    if ps -p $FRONTEND_PID > /dev/null 2>&1; then
        echo "   ✅ 运行中 (PID: $FRONTEND_PID)"
        if curl -s http://localhost:3000 > /dev/null 2>&1; then
            echo "   ✅ 服务响应正常 (http://localhost:3000)"
        else
            echo "   ⚠️  服务无响应 (http://localhost:3000)"
        fi
    else
        echo "   ❌ 进程不存在 (PID: $FRONTEND_PID)"
    fi
else
    echo "   ❌ 未运行"
fi

echo ""

# 检查端口占用情况
echo "🔍 端口占用情况:"
BACKEND_PORT=$(lsof -i :3001 2>/dev/null | grep LISTEN)
FRONTEND_PORT=$(lsof -i :3000 2>/dev/null | grep LISTEN)

if [ -n "$BACKEND_PORT" ]; then
    echo "   🔧 端口 3001: 被占用"
    echo "      $BACKEND_PORT"
else
    echo "   🔧 端口 3001: 空闲"
fi

if [ -n "$FRONTEND_PORT" ]; then
    echo "   🎨 端口 3000: 被占用"
    echo "      $FRONTEND_PORT"
else
    echo "   🎨 端口 3000: 空闲"
fi

echo ""
echo "💡 命令提示:"
echo "   - 启动服务: ./start.sh"
echo "   - 停止服务: ./stop.sh"
echo "   - 查看日志: ./logs.sh" 