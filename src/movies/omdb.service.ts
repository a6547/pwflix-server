import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import axios from 'axios';

const OMDb_KEY = '9ed2556f';
const searchedResults = {};
const apiUrl = `https://www.omdbapi.com/?apikey=${OMDb_KEY}`;

@Injectable()
export class OmdbService {
  private searchMovies(searchText: string) {
    const url = `${apiUrl}&s=${searchText}`;
    return axios(url).then((response) => response.data.Search ?? []);
  }

  private searchById(id: string) {
    const url = `${apiUrl}&i=${id}`;
    return axios(url).then((response) => response.data ?? {});
  }

  async getById(id: string) {
    return await this.searchById(id);
  }

  async find(text: string) {
    if (!(text in searchedResults)) {
      console.log(`Getting results for ${text} from api`);
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
    } else {
      console.log(`Getting results for ${text} from cache`);
    }
    return searchedResults[text];
  }
}