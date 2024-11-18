import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Criar um novo usuário
  async create(user: CreateUserDto): Promise<User> {
    const checkIfUserExists = await this.findByUsername(user.username);
    if (checkIfUserExists) {
      throw new ConflictException('Este usuário já existe!');
    }

    if (user.password.length < 6) {
      throw new BadRequestException('A senha precisa conter mais de 6 digitos');
    }
    // Hash da senha com bcrypt
    const saltOrRounds = 10; // Ajuste a complexidade conforme necessário
    const hashedPassword = await hash(user.password, saltOrRounds);

    const newUser = this.usersRepository.create({
      ...user,
      password: hashedPassword, // Substitua pela senha hasheada
    });

    return this.usersRepository.save(newUser);
  }

  // Buscar um usuário por nome de usuário
  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }
}
