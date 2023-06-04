import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoController } from './video/video.controller';
import { VideoService } from './video/video.service';
import { SupabaseService } from './supabase/supabase.service';



dotenv.config();
const env: string = process.env.ENV;
console.log(`Environment: ${env}`);

@Module({
  imports: [],
  controllers: [AppController, VideoController],
  providers: [AppService, VideoService, SupabaseService],
})
export class AppModule {}
