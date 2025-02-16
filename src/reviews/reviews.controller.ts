
import { ReviewsService } from './reviews.service';
import { Controller , Get} from '@nestjs/common';

@Controller('api/reviews')
export class ReviewsController {
    constructor(
        private readonly reviewsService:ReviewsService,

    ){}

    @Get()
    public AllReviews(){
        return this.reviewsService.AllReviews()
    }
}
