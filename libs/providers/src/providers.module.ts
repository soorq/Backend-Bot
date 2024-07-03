import { TypeormModule } from './typeorm/typeorm.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeormModule],
})
export class ProvidersModule {}
