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

@Controller('video')
export class VideoController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
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
}
