import { Injectable } from '@nestjs/common';
import { StorageFactory } from 'src/storage/storage.factory';

@Injectable()
export class TrashyService {
  private readonly storageName = process.env.TRASHY_DEFAULT_STORAGE_NAME;
  private readonly storageService = StorageFactory.getService(this.storageName);

  async getImageById(id: string): Promise<Buffer> {
    return this.storageService.getFile(id);
  }
}
