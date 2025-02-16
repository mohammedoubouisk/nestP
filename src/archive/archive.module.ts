import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArchiveService } from './archive.service';
import { ArchiveController } from './archive.controller';
import { ArchiveEntit } from './archive.entity'; // Ensure correct path

@Module({
  imports: [TypeOrmModule.forFeature([ArchiveEntit])], // Register ArchiveEntit here
  providers: [ArchiveService],
  controllers: [ArchiveController],
})
export class ArchiveModule {}