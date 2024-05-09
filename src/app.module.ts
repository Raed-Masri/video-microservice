import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideosModule } from './video/video.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/microservices'),
    VideosModule,
    AuthModule,
  ],
})
export class AppModule {}
