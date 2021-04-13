import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SystemModule } from './system/system.module';

@Module({
  imports: [TypeOrmModule.forRoot(), SystemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
