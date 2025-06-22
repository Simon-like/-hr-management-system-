import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  // 创建应用实例时启用日志
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  
  const logger = new Logger('Bootstrap');
  
  // 启用全局验证管道
  app.useGlobalPipes(new ValidationPipe());
  
  // 配置CORS - 支持Docker环境
  app.enableCors({
    origin: [
      'http://localhost:3000', // React开发服务器地址
      'http://localhost:80',    // Docker前端地址
      'http://frontend:80',     // Docker内部前端地址
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  await app.listen(3001);
  logger.log('HR Management System Backend running on http://localhost:3001');
  logger.log('Environment: ' + process.env.NODE_ENV || 'development');
  logger.log('Process ID: ' + process.pid);
}

bootstrap();


