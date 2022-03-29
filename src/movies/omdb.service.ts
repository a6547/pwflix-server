import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import axios from 'axios';


const OMDb_KEY = '9ed2556f';
const searchedResults = {};

@Injectable()
export class OmdbService {
  private searchMovies(searchText: string) {
    console.log('calling api');
    const url = `https://www.omdbapi.com/?apikey=${OMDb_KEY}&s=${searchText}`;
    return axios(url).then((response) => response.data.Search ?? []);
  }

  async find(text: string) {
    if (!(text in searchedResults)) {
      const result = await this.searchMovies(text);
      searchedResults[text] = result.map((item) => {
        const movie = new Movie();
        movie.imdbID = item.imdbID;
        movie.title = item.Title;
        movie.year = item.Year;
        movie.poster = item.Poster;
        movie.type = item.Type;
        return movie;
      });
    }
    return searchedResults[text];
  }
}