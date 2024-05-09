import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guards';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [JwtService, AuthGuard],
})
export class AuthModule {}
