import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';

import { CommonService } from 'src/common/common.service';

import { JwtPayload } from './interfaces';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly utilities: CommonService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;

    try {
      const newUser = await this.prisma.user.create({
        data: {
          password: this.utilities.hashPassword(password),
          ...userData,
        },
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      });

      return {
        user: newUser,
        message: '¡El usuario fue registrado satisfactoriamente!',
      };
    } catch (error) {
      this.utilities.handleDBExceptions(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const { user } = await this.findOneByEmail(email);

    if (!this.utilities.comparePassword(password, user.password))
      throw new UnauthorizedException('¡Usuario o contraseña inválida!');

    // ! Remove password from user object before returning it to the frontend.
    delete user.password;

    return {
      user: user,
      accessToken: this.getJwtToken({
        id: user.id,
        email: user.email,
      }),
      message: 'Inicio de sesión correcto',
    };
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    return { users };
  }

  async findOneById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user)
      throw new NotFoundException(`No se encontró el usuario con ese id ${id}`);

    return {
      user,
    };
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user)
      throw new NotFoundException(
        `No se encontró el usuario con ese email ${email}`,
      );

    return {
      user,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOneById(id);

    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          ...updateUserDto,
        },
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      });

      return {
        user: updatedUser,
        message: '¡El usuario fue actualizado satisfactoriamente!',
      };
    } catch (error) {
      this.utilities.handleDBExceptions(error);
    }
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
