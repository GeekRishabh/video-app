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
    this.videoService.upload(process.env.UPLOAD_BUCKETNAME, file);
  }

  @Post('merge')
  mergeFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Get('download')
  downloadFile(@Param() params: any) {
    console.log(params.id);
  }

  @Get()
  getFiles() {
    console.log('getfile');
  }

  @Get(':id')
  getFile(@Param() params: any) {
    console.log(params.id);
  }

  @Delete(':id')
  deleteFile(@Param() params: any) {
    console.log(params.id);
  }

  @Delete()
  deleteAllFiles() {
    console.log('>>');
  }
}
