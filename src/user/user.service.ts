import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BaseService } from 'src/shared/base.service';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { MapperService } from 'src/shared/mapper/mapper/mapper.service';
import { RegisterVm } from './models/view-models/register-vm.model';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectModel(User.modelName) private readonly _userModel: ModelType<User>,
    private readonly _mapperService: MapperService
  ){
    super();
    this.modelLocal = _userModel;
    this.mapperLocal = _mapperService.mapper;
  }

  async register(registerVm: RegisterVm): Promise<User> {
    const { username, password, firstName, lastName } = registerVm;
    const newUser = new this.modelLocal();
    newUser.username = username;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    
    newUser.password = password;

    try{
      const result = await this.create(newUser);
      return result.toJSON() as User;
    }
    catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  getHello(): object {
    return { isExecuted: true, statusCode: 200, data:{ message: 'Hello World User!' }};
  }
}
