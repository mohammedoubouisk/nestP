import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntit } from './reviews.entity';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports:[ReviewsService],
  imports:[TypeOrmModule.forFeature([ReviewEntit])]
})
export class ReviewsModule {}
