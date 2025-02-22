import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArchiveService } from './archive.service';
import { ArchiveController } from './archive.controller';
import { ArchiveEntit } from './archive.entity'; 
import { AuditModule, } from 'src/logs/logs.module';



@Module({
  imports: [
    AuditModule, 
    TypeOrmModule.forFeature([ArchiveEntit]),
  ],
  providers: [ArchiveService],
  controllers: [ArchiveController],
})
export class ArchiveModule {}