import { Injectable } from '@nestjs/common';
// import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import { Readable } from 'stream';

import { getRootPath } from '../utils';
import { SupabaseService } from '../supabase/supabase.service';

const ffprobe = require('ffprobe');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobeStatic = require('ffprobe-static');
ffmpeg.setFfmpegPath(ffmpegPath);
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
      // Make file convert to mp4
      const fileName = file.originalname.substring(
        0,
        file.originalname.indexOf('.'),
      );
      const processedFile = await this.convert(file);
      const uploadFile = {
        buffer: new Buffer(''),
        originalname: `${fileName}.mp4`,
      };
      file.buffer = fs.readFileSync(processedFile);
      await this.supabaseService.uploadFile(
        process.env.UPLOAD_BUCKETNAME,
        uploadFile,
      );
      this.deleteTempFile(processedFile);
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
    const buffer = new Buffer(file.buffer, 'base64');
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    const command = ffmpeg().input(readable).format('mp4');
    const fileName = file.originalname.substring(
      0,
      file.originalname.indexOf('.'),
    );
    const path = `${getRootPath()}/temp/${fileName}.mp4`;
    // Save a converted version with the original size
    await command.save(`${path}`);
    return path;
  }

  private deleteTempFile(filePath: string) {
    fs.unlink(filePath, (err) => {
      if (err) throw err; //handle your error the way you want to;
      console.log(`${filePath} was deleted`);
    });
  }

  async getMetaData(filename: string): Promise<any> {
    const filePath = await this.supabaseService.downloadFile(
      process.env.UPLOAD_BUCKETNAME,
      filename,
    );
    return ffprobe(`${filePath}`, { path: ffprobeStatic.path })
      .then((info) => {
        this.deleteTempFile(filePath);
        return info?.streams[0];
      })
      .catch((err: Error) => {
        return err;
      });
  }
}
