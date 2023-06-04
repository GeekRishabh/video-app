import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  imports: [VideoModule],
  controllers: [VideoController],
  providers: [VideoService, SupabaseService],
})
export class VideoModule {}
