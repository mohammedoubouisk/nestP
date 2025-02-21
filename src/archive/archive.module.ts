import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArchiveService } from './archive.service';
import { ArchiveController } from './archive.controller';
import { ArchiveEntit } from './archive.entity'; // Ensure correct path
import { AuditModule, } from 'src/logs/logs.module';



@Module({
  imports: [
    AuditModule, // Ensure LogsModule is imported
    TypeOrmModule.forFeature([ArchiveEntit]), // Register ArchiveEntit here
  ],
  providers: [ArchiveService],
  controllers: [ArchiveController],
})
export class ArchiveModule {}