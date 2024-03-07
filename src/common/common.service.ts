import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@Injectable()
export class CommonService {
  private readonly logger = new Logger('AppService');

  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  comparePassword(oldPassword: string, currentHashPassword: string): boolean {
    return bcrypt.compareSync(oldPassword, currentHashPassword);
  }

  handleDBExceptions(error: any): never {
    switch (error.code) {
      case 'P2000':
        throw new BadRequestException(error.message);

      case 'P2002':
        const targetField = error.meta.target.split('_')[1];
        throw new ConflictException(
          `Conflicto: El campo ${targetField} debe ser único`,
        );

      case 'P2025':
        throw new BadRequestException(error.message);

      default:
        this.logger.error(error);
        throw new InternalServerErrorException(
          'Error inesperado, por favor revisar los logs',
        );
    }
  }
}
