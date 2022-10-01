/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-vars */
import key from "./key";
import axios from "axios";
import { codeToLanguage, languageToCountry } from "./country";
class Call {
  pages = 1;
  path = "";
  type = "";
  baseURL = "https://api.themoviedb.org/3";
  results = [];
  data = {
    params: {
      api_key: key,
      page: this.pages,
    },
  };

  constructor(queries) {
    for (let key in queries) {
      this.data.params[key] = queries[key];
    }
  }
  addQuery(queries) {
    for (let key in queries) {
      this.data.params[key] = queries[key];
    }
  }
  removeQuery(queries) {
    for (let key in queries) {
      delete this.data.params[key];
    }
  }
  get Params() {
    return this.data;
  }

  async makeCall(...path) {
    let string = this.path;

    if (string === "") {
      for (let ele of path) {
        if (ele === "movie") this.type = "movie";
        else if (ele === "tv") this.type = "tv";

        string += "/" + ele;
      }
    }

    this.path = string;

    let response = await axios.get(this.baseURL + string, this.data).then(({ data }) => {
      return data;
    });

    return response;
  }

  async moreInformationAllMulti(response) {
    const response_1 = new Promise(async (resolve) => {
      response.results = response.results.filter((value, index) => {
        if (value.media_type !== "person") return true;
      });

      response.results.forEach(async (value, index) => {
        // console.log(value)
        let info = await this.getMoreInformation(value.id, value.media_type);
        if (value.media_type === "movie" || this.type === "movie") {
          let {
            backdrop_path,
            genres,
            production_countries,
            release_date,
            runtime,
            belongs_to_collection,
          } = info;

          if (production_countries.length === 0) production_countries.push({ iso_3166_1: "US" });
          if (value.poster_path !== null || backdrop_path !== null) {
            response.results[index].image = this.getImage(index, 5, value.poster_path);
            response.results[index].backdrop = this.getImage(index, 5, backdrop_path);
          } else {
            response.results[index].image =
              "https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg";
            response.results[index].backdrop =
              "https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg";
          }
          response.results[index].flag = this.getFlag(production_countries[0].iso_3166_1);
          response.results[index].languageCode = value.original_language;
          response.results[index].original_language = codeToLanguage[value.original_language];
          response.results[index] = {
            ...value,
            backdrop_path,
            genres,
            production_countries,
            release_date,
            runtime,
            belongs_to_collection,
          };
        } else if (value.media_type === "tv" || this.type === "movie") {
          let {
            backdrop_path,
            genres,
            origin_country,
            first_air_date,
            seasons,
            belongs_to_collection,
          } = info;

          if (value.poster_path !== null || backdrop_path !== null) {
            response.results[index].image = this.getImage(index, 5, value.poster_path);
            response.results[index].backdrop = this.getImage(index, 5, backdrop_path);
          } else {
            response.results[index].image =
              "https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg";
            response.results[index].backdrop =
              "https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg";
          }

          response.results[index].flag = this.getFlag(origin_country[0]);
          response.results[index].languageCode = value.original_language;
          response.results[index].original_language = codeToLanguage[value.original_language];
          seasons = seasons.length;

          response.results[index] = {
            title: value.name,
            release_date: first_air_date,
            backdrop_path,
            genres,
            origin_country,
            first_air_date,
            seasons,
            belongs_to_collection,
            ...value,
          };
        }
      });
      // console.log("api", response)
      this.results = response;
      resolve(response);
    });
    return response_1;
  }

  async moreInformationAllMovie(response) {
    const response_1 = new Promise(async (resolve) => {
      response.results.forEach(async (value, index) => {
        let info = await this.getMoreInformation(value.id);

        let {
          backdrop_path,
          genres,
          production_countries,
          release_date,
          runtime,
          belongs_to_collection,
        } = info;

        if (production_countries.length === 0) production_countries.push({ iso_3166_1: "US" });
        if (value.poster_path !== null || backdrop_path !== null) {
          response.results[index].image = this.getImage(index, 5, value.poster_path);
          response.results[index].backdrop = this.getImage(index, 5, backdrop_path);
        } else {
          response.results[index].image =
            "https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg";
          response.results[index].backdrop =
            "https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg";
        }
        response.results[index].flag = this.getFlag(production_countries[0].iso_3166_1);
        response.results[index].languageCode = value.original_language;
        response.results[index].original_language = codeToLanguage[value.original_language];
        response.results[index] = {
          ...value,
          backdrop_path,
          genres,
          production_countries,
          release_date,
          runtime,
          belongs_to_collection,
        };
      });
      this.results = response;
      resolve(response);
    });
    return response_1;
  }

  async moreInformationAllTV(response) {
    const response_1 = new Promise(async (resolve) => {
      response.results.forEach(async (value, index) => {
        let info = await this.getMoreInformation(value.id);
        let {
          backdrop_path,
          genres,
          origin_country,
          first_air_date,
          seasons,
          belongs_to_collection,
        } = info;

        if (value.poster_path !== null || backdrop_path !== null) {
          response.results[index].image = this.getImage(index, 5, value.poster_path);
          response.results[index].backdrop = this.getImage(index, 5, backdrop_path);
        } else {
          response.results[index].image =
            "https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg";
          response.results[index].backdrop =
            "https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg";
        }

        response.results[index].flag = this.getFlag(origin_country[0]);
        response.results[index].languageCode = value.original_language;
        response.results[index].original_language = codeToLanguage[value.original_language];
        seasons = seasons.length;

        response.results[index] = {
          title: value.name,
          release_date: first_air_date,
          backdrop_path,
          genres,
          origin_country,
          first_air_date,
          seasons,
          belongs_to_collection,
          ...value,
        };
      });
      this.results = response;
      resolve(response);
    });
    return response_1;
  }

  async nextPage() {
    if (this.path !== "") {
      this.pages++;
      this.data.params.page++;
      return await this.makeCall(this.path);
    }
  }
  async prevPage() {
    if (this.path !== "") {
      this.pages--;
      this.data.params.page--;
      return await this.makeCall(this.path);
    }
  }
  async toPage(number) {
    if (this.path !== "") {
      this.pages = number;
      this.data.params.page = number;
      return await this.makeCall(this.path);
    }
  }
  getImage(index = 0, numberSize = 4, poster_path) {
    let path;
    if (poster_path) path = poster_path;
    else path = this.results.results[index].poster_path;

    let sizes = ["w92", "w154", "w185", "w342", "w500", "w780", "original"];
    let result = "https://image.tmdb.org/t/p/" + sizes[numberSize] + path;

    return result;
  }

  getFlag(country) {
    if (!country) {
      country = "US";
    }
    const codePoints = country.split("").map((char) => 127397 + char.charCodeAt());
    // console.log(codePoints)
    return String.fromCodePoint(...codePoints);
  }



  async getByCategory(genre) {
    let category = new Call({ language: "it-IT", adult: false, with_genres: genre });

    let res = await new Promise((resolve) => {
      category.makeCall("discover", this.type).then(async (res) => {
        category.moreInformationAllMulti(res).then((value) => {
          resolve(value);
          // this.category.push({ results: value.results, title: "Last Release" });
        });
      });
    }).then((value) => value);
    return res;
  }




  async getMoreInformation(id, path) {
    let type = "";
    if (path) type = path;
    else type = this.type;

    // console.log(path, type)
    let response = await axios
      .get(`${this.baseURL}/${type}/${id}`, this.Params)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log("porco");
      });
    return response;
  }
}
let count = 0;
export default Call;
