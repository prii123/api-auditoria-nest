// import { ClientProxy } from '@nestjs/microservices';
// import { EventEmitter2 } from '@nestjs/event-emitter';
import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareHash, generateHash } from './utils/handleBcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UsersEntity } from '../usuario/entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    // private readonly eventEmitter: EventEmitter2,
    @InjectRepository(UsersEntity) private readonly userModel: Repository<UsersEntity>,
    // @Inject('MAIL_SERVICE') private readonly clientMailService:ClientProxy
  ) { }

  /**
   * Iniciar sesion
   * @param userLoginBody
   * @returns
   */
  public async login(userLoginBody: LoginAuthDto) {
    const { password, email }: any = userLoginBody;

    const userExist = await this.userModel.findOne(email);

    if (!userExist) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    const isCheck = await compareHash(password, userExist.password);
    if (!isCheck)
      throw new HttpException('PASSWORD_INVALID', HttpStatus.CONFLICT);

    const userFlat = userExist;
    delete userFlat.password;


    const payload = {
      id: userFlat.id,
    };

    const token = this.jwtService.sign(payload);

    const data = {
      token,
      user: userFlat,
    };
    // this.eventEmitter.emit('user.login', data);

    return data;
  }

  /**
   * Registrar un usuario
   * @param userBody
   * @returns
   */
  public async register(userBody: RegisterAuthDto) {
    const { password, ...user } = userBody;

    const userParse = {
      ...user,
      password: await generateHash(password),
    };

    const newUser = await this.userModel.create(userParse);

    /** 
     * Enviar (evento) de email
     */

    return this.userModel.save(newUser);
  }
}


