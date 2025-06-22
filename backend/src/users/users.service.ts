import { Injectable, ConflictException } from '@nestjs/common';

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  role: 'admin' | 'hr' | 'manager';
  createdAt: Date;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      username: 'admin',
      password: '$2b$10$pkjfMx.ct0T.i7mJYb02QeQd5F9VKDdoF3JXVrhx5FA8CjM14jHi.', // admin123 的 bcrypt 哈希值
      email: 'admin@ByteDance.com',
      role: 'admin',
      createdAt: new Date(),
    },
  ];

  async findAll(): Promise<Omit<User, 'password'>[]> {
    return this.users.map(({ password, ...user }) => user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async create(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const existingUser = await this.findByUsername(userData.username);
    if (existingUser) {
      throw new ConflictException('用户名已存在');
    }

    const newUser: User = {
      id: Date.now(),
      ...userData,
      createdAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }

  async update(id: number, userData: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('用户不存在');
    }

    this.users[userIndex] = { ...this.users[userIndex], ...userData };
    return this.users[userIndex];
  }

  async remove(id: number): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('用户不存在');
    }
    this.users.splice(userIndex, 1);
  }
}

