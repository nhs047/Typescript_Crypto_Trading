import { Module, Global } from '@nestjs/common';
import { ConfigurationService } from './configuration/configuration/configuration.service';
import { MapperService } from './mapper/mapper/mapper.service';
import { UserModule } from 'src/user/user.module';

@Global()
@Module({
  providers: [ConfigurationService, MapperService],
  exports: [ConfigurationService, MapperService],
  imports: [UserModule],
})
export class SharedModule {}
