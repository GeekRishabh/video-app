import { Injectable } from '@nestjs/common';
import { createFFmpeg } from '@ffmpeg/ffmpeg';
import * as ffmpeg from 'fluent-ffmpeg';

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
      console.log(file, 'file');
      // Make file convert to mp4
      // const processedFile = this.convert(file); //
      return await this.supabaseService.uploadFile(
        process.env.UPLOAD_BUCKETNAME,
        file,
      );
      // const blob = data;
      // const buffer = Buffer.from( await blob.arrayBuffer() );
      // await fs.promises.writeFile(fileName, buffer);
    } catch (error) {
      console.log(error, 'upload error');
    }
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

  private async convert(file: any) {
    // Create a command to convert source.avi to MP4
    let command = ffmpeg();
    command = ffmpeg('/path/to/source.avi')
      .audioCodec('libfaac')
      .videoCodec('libx264')
      .format('mp4');

    // Save a converted version with the original size
    command.save('/path/to/output-original-size.mp4');
  }
}
