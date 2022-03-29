import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { OmdbService } from './omdb.service';
const omdbService = new OmdbService();

@Injectable()
export class MoviesService {
  find(text: string) {
    return omdbService.find(text);
  }
  getById(id: string) {
    return omdbService.getById(id);
  }
}
