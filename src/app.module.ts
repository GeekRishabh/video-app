import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { VideoModule } from './video/video.module';

dotenv.config();
const env: string = process.env.ENV;
console.log(`Environment: ${env}`);

@Module({
  imports: [VideoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
