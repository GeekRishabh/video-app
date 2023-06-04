import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { VideoService } from './video.service';
import { SupabaseService } from '../supabase/supabase.service';

@Controller('video')
export class VideoController {
  constructor(
    private videoService: VideoService,
    private supabaseService: SupabaseService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const response = this.videoService.upload(
        process.env.UPLOAD_BUCKETNAME,
        file,
      );
      console.log(response, 'response');
      return { data: {}, success: true };
    } catch (error) {
      console.log(error, '>>>');
    }
  }

  @Post('merge')
  mergeFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Get('download/:id')
  async downloadFile(@Param() params: any) {
    try {
      return await this.supabaseService.getSignedUrl(
        process.env.MERGE_BUCKETNAME,
        params.id,
      );
    } catch (error) {}
  }

  @Get('metadata/:id')
  async getMetaData(@Param() params: any) {
    try {
      return await this.videoService.getMetaData(params.id);
    } catch (error) {}
  }

  @Get('signedUrl')
  getSignedUrl(@Param() params: any) {
    console.log(params.id);
  }

  @Get()
  async getFiles() {
    try {
      return await this.videoService.getAll();
    } catch (error) {}
  }

  @Get(':id')
  async getFile(@Param() params: any) {
    try {
      return await this.supabaseService.downloadFile(
        process.env.UPLOAD_BUCKETNAME,
        params.id,
      );
    } catch (error) {}
  }

  @Delete(':id')
  deleteFile(@Param() params: any) {
    console.log(params.id);
  }

  @Delete()
  async deleteAllFiles() {
    try {
      return await this.supabaseService.emptyBucket(
        process.env.UPLOAD_BUCKETNAME,
      );
    } catch (error) {}
  }
}
