import key from "./key";
import axios from "axios";

class Call {
  pages = 1;
  lastpath = "";
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
    let string = this.lastpath;
    let response = [];

    if (string === "")
      for (let ele of path) {
        string += "/" + ele;
      }

    this.lastpath = string;
    await axios.get("https://api.themoviedb.org/3" + string, this.data).then(({ data }) => {
      response = { ...data };
      this.results = { ...response };
      response.results.map(async (value, index) => value.image = this.getImage(index))

    });    
    // eslint-disable-next-line no-unused-vars, no-undef
    return response.results;
  }

  async nextPage() {
    if (this.lastpath !== "") {
      this.pages++;
      this.data.params.page++;
      return await this.makeCall(this.lastpath);
    }
  }
  async prevPage() {
    if (this.lastpath !== "") {
      this.pages--;
      this.data.params.page--;
      return await this.makeCall(this.lastpath);
    }
  }
  async toPage(number) {
    if (this.lastpath !== "") {
      this.pages = number;
      this.data.params.page = number;
      return await this.makeCall(this.lastpath);
    }
  }
  getImage(index = 0, numberSize = 4) {
    let sizes = ["w92", "w154", "w185", "w342", "w500", "w780", "original"]
    let result = "https://image.tmdb.org/t/p/" + sizes[numberSize]+ this.results.results[index].poster_path
    return result
  }
}
export default Call;
