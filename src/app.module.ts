import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoController } from './video/video.controller';
import { VideoService } from './video/video.service';
import { SupabaseService } from './supabase/supabase.service';

@Module({
  imports: [],
  controllers: [AppController, VideoController],
  providers: [AppService, VideoService, SupabaseService],
})
export class AppModule {}
