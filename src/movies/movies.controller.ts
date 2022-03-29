import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get(':text')
  find(@Param('text') text: string) {
    return this.moviesService.find(text);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.moviesService.getById(id);
  }
}
