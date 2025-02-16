import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntit } from './reviews.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
constructor(
    @InjectRepository(ReviewEntit)
    private readonly reviewRepository:Repository<ReviewEntit>
){}

    public async AllReviews(){
        return await this.reviewRepository.find()
    }
}
