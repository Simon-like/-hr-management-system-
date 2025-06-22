#!/bin/bash

# HR Management System - Docker 停止脚本

echo "🛑 停止 HR 管理系统 Docker 容器..."

# 检查 Docker Compose 是否安装
if ! command -v docker-compose &> /dev/null; then
    echo "❌ 错误：未找到 Docker Compose，请先安装 Docker Compose"
    exit 1
fi

# 检查是否在正确的目录
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ 错误：请在项目根目录下运行此脚本"
    echo "   当前目录应该包含 docker-compose.yml 文件"
    exit 1
fi

echo "🛑 停止服务..."
docker-compose down

if [ $? -ne 0 ]; then
    echo "❌ 停止失败，请检查错误信息"
    exit 1
fi

echo "✅ Docker 服务已停止！"
echo ""
echo "📋 其他选项："
echo "   🧹 停止并清理数据: docker-compose down -v"
echo "   🗑️  删除镜像: docker-compose down --rmi all"
echo "   🔄 重启服务: docker-compose restart" 