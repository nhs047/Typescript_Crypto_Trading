import { Controller, Get, Post, HttpStatus, Body, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { User } from './models/user.model';
import { UserVm } from './models/view-models/user-vm.model';
import { ApiException } from 'src/shared/api-exception.model';
import { GetOperationId } from 'src/shared/utilities/get-operation-id';
import { RegisterVm } from './models/view-models/register-vm.model';

@Controller('api')
@ApiUseTags(User.modelName)
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get('usergreetings')
  getHello(): object {
    return this._userService.getHello();
  }

  @Post('register')
  @ApiResponse({status: HttpStatus.CREATED, type: UserVm})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException})
  @ApiOperation(GetOperationId(User.modelName, 'Register'))
  async register(@Body() registerVm: RegisterVm): Promise<UserVm> {
    const { username, password } = registerVm;
    if(!username) {
      throw new HttpException('Username is required', HttpStatus.BAD_REQUEST);
    }
    if(!password) {
      throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
    }
    let exist;
    try{
        exist = await this._userService.findOne({username});
    }
    catch(e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if(exist) {
      throw new HttpException(`${username} exist`, HttpStatus.BAD_REQUEST);
    }
    const newUser = await this._userService.register(registerVm);
    return newUser;
  }
}
