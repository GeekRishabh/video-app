import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly supabase = createClient(
    process.env.SUPABASE_PROJECTURL,
    process.env.SUPABASE_APIKEY,
  );

  public async uploadFile(bucketName: string, file: any) {
    const { data, error } = await this.supabase.storage
      .from(bucketName)
      .upload('/', file);
    if (error) {
      // Handle error
      console.log(error, 'error uploadFile');
    } else {
      // Handle success
      console.log(data, 'uploadFile');
    }
  }

  public async downloadFile(bucketName: string, fileName: string) {
    const { data, error } = await this.supabase.storage
      .from(bucketName)
      .download(fileName);
    if (error) {
      // Handle error
      console.log(error, 'error downloadFile');
    } else {
      // Handle success
      console.log(data, 'das downloadFile');
    }
  }

  public async emptyBucket(bucketName: string) {
    const { data, error } = await this.supabase.storage.emptyBucket(bucketName);
    if (error) {
      // Handle error
      console.log(error, 'error emptyBucket');
    } else {
      // Handle success
      console.log(data, 'Success emptyBucket');
    }
  }

  public async deleteBucket(bucketName: string) {
    const { data, error } = await this.supabase.storage.deleteBucket(
      bucketName,
    );
    if (error) {
      // Handle error
      console.log(error, 'error deleteBucket');
    } else {
      // Handle success
      console.log(data, 'Success deleteBucket');
    }
  }

  public async listBuckets() {
    const { data, error } = await this.supabase.storage.listBuckets();
    if (error) {
      // Handle error
      console.log(error, 'error listBuckets');
    } else {
      // Handle success
      console.log(data, 'Success listBuckets');
    }
  }

  public async createBucket(bucketName: string) {
    const { data, error } = await this.supabase.storage.createBucket(
      bucketName,
      {
        public: false,
        // allowedMimeTypes: ['image/png'],
        // fileSizeLimit: 1024 // size in bytes
      },
    );
    if (error) {
      // Handle error
      console.log(error, 'error createBuckets');
    } else {
      // Handle success
      console.log(data, 'Success createBuckets');
    }
  }

  public async fetchBucket(bucketName: string) {
    const { data, error } = await this.supabase.storage.getBucket(bucketName);
    if (error) {
      // Handle error
      console.log(error, 'error fetchBuckets');
    } else {
      // Handle success
      console.log(data, 'Success fetchBuckets');
    }
  }

  public async listFilesfromBucket(
    bucketName: string,
    limit = 100,
    offset = 0,
    order = 'asc',
  ) {
    const { data, error } = await this.supabase.storage
      .from(bucketName)
      .list('/', {
        limit,
        offset,
        sortBy: { column: 'name', order: order },
      });
    if (error) {
      // Handle error
      console.log(error, 'error listFilesfromBucket');
    } else {
      // Handle success
      console.log(data, 'Success listFilesfromBucket');
    }
  }
}
