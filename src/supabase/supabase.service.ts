import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { StorageClient } from '@supabase/storage-js';

@Injectable()
export class SupabaseService {
  private readonly supabase = createClient(
    process.env.SUPABASE_PROJECTURL,
    process.env.SUPABASE_APIKEY,
  );

  private readonly storageClient = new StorageClient(
    process.env.SUPABASE_STORAGE_URL,
    {
      apikey: process.env.SUPABASE_SERVICEROLE,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICEROLE}`,
    },
  );

  public async uploadFile(bucketName: string, file: any) {
    return await this.storageClient.from(bucketName).upload('/', file);
  }

  public async downloadFile(bucketName: string, fileName: string) {
    return await this.storageClient.from(bucketName).download(fileName);
  }

  public async emptyBucket(bucketName: string) {
    return await this.storageClient.emptyBucket(bucketName);
  }

  public async deleteBucket(bucketName: string) {
    return await this.storageClient.deleteBucket(bucketName);
  }

  public async listBuckets() {
    return await this.storageClient.listBuckets();
  }

  public async createBucket(bucketName: string) {
    return await this.storageClient.createBucket(bucketName, {
      public: true,
      // allowedMimeTypes: ['image/png'],
      fileSizeLimit: 20971520, // size in bytes 20MB
    });
  }

  public async fetchBucket(bucketName: string) {
    return await this.storageClient.getBucket(bucketName.trim());
  }

  public async listFilesfromBucket(
    bucketName: string,
    limit = 100,
    offset = 0,
    order = 'asc',
  ) {
    return await this.storageClient.from(bucketName).list('/', {
      limit,
      offset,
      sortBy: { column: 'name', order: order },
    });
  }

  public async deleteFilefromBucket(bucketName: string, fileName: string) {
    return await this.storageClient.from(bucketName).remove([`/${fileName}`]);
  }

  public async getSignedUrl(bucketName: string, fileName: string) {
    return await this.storageClient
      .from(bucketName)
      .createSignedUrl(`/${fileName}`, 360000);
  }
}
