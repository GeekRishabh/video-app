import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { StorageClient } from '@supabase/storage-js';
import * as fs from 'fs';
import { getRootPath, blobToFile } from '../utils/';
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
    return await this.storageClient
      .from(bucketName)
      .upload(`${new Date()}-${file.originalname}`, file.buffer);
  }

  public async downloadFile(
    bucketName: string,
    fileName: string,
  ): Promise<string> {
    const { data, error } = await this.storageClient
      .from(bucketName.trim())
      .download(`/${fileName}`);
    const blob = data;
    const buffer = Buffer.from(await blob.arrayBuffer());
    const filePath = `${getRootPath()}/temp/${fileName}`;
    await fs.promises.writeFile(`${filePath}`, buffer);
    return filePath;
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

  public async createBucket(
    bucketName: string,
    isPublic = false,
    fileSizeLimit = 20971520,
  ) {
    return await this.storageClient.createBucket(bucketName, {
      public: isPublic,
      allowedMimeTypes: ['video/*'], //All video type is allowed
      fileSizeLimit, // size in bytes defaulted to 20 MB
    });
  }

  public async fetchBucket(bucketName: string) {
    return await this.storageClient.getBucket(bucketName.trim());
  }

  public async listFilesfromBucket(
    bucketName: string,
    limit = 100,
    offset = 0,
    sortByKey = 'created_at',
    order = 'desc',
  ) {
    return await this.storageClient.from(bucketName).list('', {
      limit,
      offset,
      sortBy: { column: sortByKey, order },
    });
  }

  public async deleteFilefromBucket(bucketName: string, fileName: string) {
    return await this.storageClient.from(bucketName).remove([`/${fileName}`]);
  }

  public async getSignedUrl(bucketName: string, fileName: string) {
    return await this.storageClient
      .from(bucketName)
      .createSignedUrl(`/${fileName}`, 3600);
  }
}
