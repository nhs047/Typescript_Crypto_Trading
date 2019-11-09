import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return { isExecuted: true, statusCode: 200, data:{ message: 'Hello World!' }};
  }
}
