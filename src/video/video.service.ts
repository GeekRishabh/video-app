import { Injectable } from '@nestjs/common';
import { createFFmpeg } from '@ffmpeg/ffmpeg';

import { SupabaseService } from '../supabase/supabase.service';
@Injectable()
export class VideoService {
  constructor(private supabaseService: SupabaseService) {}

  async merge(firstVideoId: string, secondVideoId: string) {
    try {
    } catch (error) {
      console.log(error, 'Merge Service Error');
    }
  }

  async upload(bucketName: string = process.env.UPLOAD_BUCKETNAME, file: any) {
    try {
      const bucket = await this.supabaseService.fetchBucket(bucketName);
      if (!bucket.data || bucket.data === null) {
        await this.supabaseService.createBucket(bucketName);
      }
    } catch (error) {
      console.log(error, 'upload error');
    }
    //       const fileName = 'some-file.png'
    // const filePath = 'some-folder/' + fileName
    // const { data, error } = await supabase.storage
    //         .from('storage-name')
    //         .download(filePath)

    // const blob = data;
    // const buffer = Buffer.from( await blob.arrayBuffer() );
    // await fs.promises.writeFile(fileName, buffer);
  }

  async deleteFile(fileName: string) {
    try {
      return await this.supabaseService.deleteFilefromBucket(
        process.env.UPLOAD_BUCKETNAME,
        fileName,
      );
    } catch (error) {
      console.log(error, 'deleteFile Service Error');
    }
  }

  async delete() {
    try {
      return await this.supabaseService.emptyBucket(
        process.env.UPLOAD_BUCKETNAME,
      );
    } catch (error) {
      console.log(error, 'delete Service Error');
    }
  }

  async getAll() {
    try {
      return await this.supabaseService.listFilesfromBucket(
        process.env.UPLOAD_BUCKETNAME,
      );
    } catch (error) {
      console.log(error, 'Merge Service Error');
    }
  }
}
