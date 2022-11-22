import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersEntity } from '../usuario/entities/usuario.entity';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          signOptions: { expiresIn: '4d' },
          secret: 'somesecretkey',
        };
      },
    }),
    TypeOrmModule.forFeature([UsersEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
