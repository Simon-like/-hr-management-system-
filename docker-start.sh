#!/bin/bash

# HR Management System - Docker 启动脚本

echo "🐳 启动 HR 管理系统 Docker 容器..."

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ 错误：未找到 Docker，请先安装 Docker"
    exit 1
fi

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

echo "🔧 构建 Docker 镜像..."
docker-compose build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi

echo "🚀 启动服务..."
docker-compose up -d

if [ $? -ne 0 ]; then
    echo "❌ 启动失败，请检查错误信息"
    exit 1
fi

echo "⏳ 等待服务启动..."
sleep 10

# 检查服务状态
echo "📊 检查服务状态..."
docker-compose ps

echo ""
echo "✅ Docker 服务启动完成！"
echo ""
echo "🌐 访问地址："
echo "   🎨 前端界面: http://localhost"
echo "   🔧 后端API: http://localhost:3001"
echo ""
echo "📋 常用命令："
echo "   📝 查看日志: docker-compose logs -f"
echo "   🛑 停止服务: docker-compose down"
echo "   🔄 重启服务: docker-compose restart"
echo "   🧹 清理数据: docker-compose down -v"
echo ""
echo "🔍 查看实时日志请运行: docker-compose logs -f" 