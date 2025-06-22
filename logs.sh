#!/bin/bash

# HR Management System - 日志查看脚本
# 查看后端和前端服务的日志

echo "📋 HR 管理系统日志查看器"
echo ""

# 检查日志目录是否存在
if [ ! -d "logs" ]; then
    echo "❌ 未找到日志目录"
    exit 1
fi

# 显示后端日志
if [ -f "logs/backend.log" ]; then
    echo "🔧 后端服务日志 (logs/backend.log):"
    echo "=================================="
    tail -n 20 logs/backend.log
    echo ""
else
    echo "⚠️  未找到后端日志文件"
fi

# 显示前端日志
if [ -f "logs/frontend.log" ]; then
    echo "🎨 前端服务日志 (logs/frontend.log):"
    echo "=================================="
    tail -n 20 logs/frontend.log
    echo ""
else
    echo "⚠️  未找到前端日志文件"
fi

echo "💡 提示："
echo "   - 使用 'tail -f logs/backend.log' 实时查看后端日志"
echo "   - 使用 'tail -f logs/frontend.log' 实时查看前端日志"
echo "   - 使用 'cat logs/backend.log' 查看完整后端日志"
echo "   - 使用 'cat logs/frontend.log' 查看完整前端日志" 