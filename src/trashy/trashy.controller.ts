import { Controller, Get, Param } from '@nestjs/common';
import { TrashyService } from './trashy.service';

@Controller('trashy')
export class TrashyController {
  constructor(private readonly trashyService: TrashyService) {}

  @Get('image/:id')
  async getImage(@Param('id') id: string) {
    const buff = await this.trashyService.getImageById(id);

    return buff.toString('base64');
  }
}
