import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareHash, generateHash } from './utils/handleBcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../usuario/entities/usuario.entity';



@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UsersEntity, 'operacion') private readonly userModel: Repository<UsersEntity>,
    // @Inject('MAIL_SERVICE') private readonly clientMailService:ClientProxy
  ) { }


  /**
   * Iniciar sesion
   * @param userLoginBody
   * @returns
   */
  public async login(userLoginBody: LoginAuthDto) {

    const { password, email }: any = userLoginBody;

    // console.log(password)
    // const userExist = await this.userModel.findOne(email);
    let query = "SELECT * FROM usuarios WHERE email = '" + email + "' "
    const [userExist] = await this.userModel.query(query)
    // console.log(userExist)

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

    return this.userModel.save(newUser);
  }
}


