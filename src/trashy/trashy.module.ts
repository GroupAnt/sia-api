import { Module } from '@nestjs/common';
import { TrashyService } from './trashy.service';
import { TrashyController } from './trashy.controller';

@Module({
  controllers: [TrashyController],
  providers: [TrashyService]
})
export class TrashyModule {}
