/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-vars */
import key from './key'
import axios from 'axios'

import { codeToLanguage, languageToCountry } from './country'
class Call {
  pages = 1
  path = ''
  type = ''
  baseURL = 'https://api.themoviedb.org/3'
  results = []
  data = {
    params: {
      api_key: key,
      page: this.pages,
    },
  }

  /**
   *
   * @param {Object} queries Parametri della query da aggiungere alla richiesta
   */
  constructor(queries) {
    for (let key in queries) {
      this.data.params[key] = queries[key]
    }
  }
  /**
   *
   * @param {Object} queries chiavi e valori da aggiungere alla query
   */
  addQuery(queries) {
    for (let key in queries) {
      this.data.params[key] = queries[key]
    }
  }
  /**
   *
   * @param {Object} queries chiavi e valori da rimuovere dalla query
   */
  removeQuery(queries) {
    for (let key in queries) {
      delete this.data.params[key]
    }
  }

  get Params() {
    return this.data
  }

  /**
   *  EFFETTUA UNA CHIAMATA AXIOS SU GLI ENDPOINT PASSATI
   * @param  {...any} path Enpoints
   * @returns {Object} dati richiesti
   */
  async makeCall(...path) {
    let string = this.path

    if (string === '') {
      for (let ele of path) {
        if (ele === 'movie') this.type = 'movie'
        else if (ele === 'tv') this.type = 'tv'

        string += '/' + ele
      }
    }

    this.path = string

    let {data} = await axios.get(this.baseURL + string, this.data)

    return data
  }
  /**
   *
   * @param {Object[]} tvShows Array di serie tv al quale chiedere più info
   * @returns {Object[]} Ritorna un array simile a quello in ingresso con
   * nuove proprietà contenti informazioni più dettagliate:
   *
   */
  async moreInformationAllMulti(moviesOrSeries) {
      let movies = {}
      let tvs = {}

      if (!this.type) {
        movies = { ...moviesOrSeries }
        tvs = { ...moviesOrSeries }
        movies.results = []
        tvs.results = []

        moviesOrSeries.results = moviesOrSeries.results.filter((value, index) => {
          if (value.media_type !== 'person') {
            if (value.media_type === 'movie') movies.results.push(value)
            else tvs.results.push(value)
            return true
          }
        })
      } else {
        if (this.type === 'movie') movies = { ...moviesOrSeries }
        else tvs = { ...moviesOrSeries }
      }
      moviesOrSeries.results = []
      if (movies.results !== undefined) {
        let mov = {}
        mov = await this.moreInformationAllMovie(movies)
        moviesOrSeries.results = mov.results
      }
      if (tvs.results !== undefined) {
        tvs = await this.moreInformationAllTV(tvs)
        if (movies.results !== undefined) {
          moviesOrSeries.results.concat(tvs.results)
        } else moviesOrSeries.results = tvs.results
      }

      this.results = moviesOrSeries



    return moviesOrSeries
  }
  /**
   *
   * @param {Object[]} tvShows Array di Film al quale chiedere più info
   * @returns {Object[]} Ritorna un array simile a quello in ingresso con
   * nuove proprietà contenti informazioni più dettagliate:
   *
   */
  async moreInformationAllMovie(movies) {

    await movies.results.forEach(async (value, index) => {
        let info = await this.getMoreInformation(value.id, 'movie')

        let { backdrop_path, genres, production_countries, release_date, runtime, belongs_to_collection } = info

        if (production_countries.length === 0) production_countries.push({ iso_3166_1: 'US' })
        if (value.poster_path !== null || backdrop_path !== null) {
          movies.results[index].image = this.getImage(index, 5, value.poster_path)
          movies.results[index].backdrop = this.getImage(index, 5, backdrop_path)
        } else {
          movies.results[index].image = 'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg'
          movies.results[index].backdrop = 'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg'
        }
        movies.results[index].flag = this.getFlag(production_countries[0].iso_3166_1)
        movies.results[index].languageCode = value.original_language
        movies.results[index].original_language = codeToLanguage[value.original_language]
        movies.results[index] = {
          ...value,
          backdrop_path,
          genres,
          production_countries,
          release_date,
          runtime,
          belongs_to_collection,
        }
      })
    this.results = movies
    
    return movies
  }

  /**
   *
   * @param {Object[]} tvShows Array di serie tv al quale chiedere più info
   * @returns {Object[]} Ritorna un array simile a quello in ingresso con
   * nuove proprietà contenti informazioni più dettagliate:
   *
   */
  async moreInformationAllTV(tvShows) {
      await tvShows.results.forEach(async (value, index) => {
        let info = await this.getMoreInformation(value.id, 'tv')
        let { backdrop_path, genres, origin_country, first_air_date, seasons, belongs_to_collection } = info

        if (value.poster_path !== null || backdrop_path !== null) {
          tvShows.results[index].image = this.getImage(index, 5, value.poster_path)
          tvShows.results[index].backdrop = this.getImage(index, 5, backdrop_path)
        } else {
          tvShows.results[index].image = 'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg'
          tvShows.results[index].backdrop = 'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg'
        }

        tvShows.results[index].flag = this.getFlag(origin_country[0])
        tvShows.results[index].languageCode = value.original_language
        tvShows.results[index].original_language = codeToLanguage[value.original_language]
        seasons = seasons.length

        tvShows.results[index] = {
          title: value.name,
          release_date: first_air_date,
          backdrop_path,
          genres,
          origin_country,
          first_air_date,
          seasons,
          belongs_to_collection,
          ...value,
        }
      })
      this.results = tvShows

    return tvShows
  }

  /**
   *
   * @returns la pagina successiva
   */
  async nextPage() {
    if (this.path !== '') {
      this.pages++
      this.data.params.page++
      return await this.makeCall(this.path)
    }
  }
  /**
   *
   * @returns la pagina precedente
   */
  async prevPage() {
    if (this.path !== '') {
      this.pages--
      this.data.params.page--
      return await this.makeCall(this.path)
    }
  }
  /**
   * VAI ALLA PAGINA PASSATA
   * @param {Number} number
   * @returns
   */
  async toPage(number) {
    if (this.path !== '') {
      this.pages = number
      this.data.params.page = number
      return await this.makeCall(this.path)
    }
  }

  /**
   *
   * @param {Number = 0} [index] Quale immagine dell'array prendere
   * @param {NumberSize = 4} [numberSize] OPZIONALE grandezza dell'immagine nell'array di ["w92", "w154", "w185", "w342", "w500", "w780", "original"]
   * @param {Array} poster_path array dove si trova l'indicazione della img
   * @returns {String} Link completo all'immagine
   */
  getImage(index = 0, numberSize = 4, poster_path) {
    let path
    if (poster_path !== '') path = poster_path
    else path = this.results.results[index].poster_path
    if (poster_path === null) return null
    let sizes = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']
    let result = 'https://image.tmdb.org/t/p/' + sizes[numberSize] + path

    return result
  }
  /**
   * DATA LA SIGLA DELLA NAZIONE TORNA LA SUA BANDIERA IN EMOJI UNICODE
   * @param {*} country SIGLA IN ISO3066 NAZIONE
   * @returns {String} UNICODE EMOJI FLAG
   */
  getFlag(country) {
    if (!country) {
      country = 'US'
    }
    const codePoints = country.split('').map((char) => 127397 + char.charCodeAt())
    // console.log(codePoints)
    return String.fromCodePoint(...codePoints)
  }
  /**
   *
   * @param {*} genre ID DEL GENERE
   * @returns {{ results: Object [], title: genre.name }} Ritorna ogetto con i titoli del genere selezionato
   */
  async getByCategory(genre) {
    this.addQuery({ with_genres: genre })
    let call = await this.makeCall('discover', this.type)
    let info = await this.moreInformationAllMulti(call)
    return info
  }
  /**
   *
   * @param {Number} id Movie/film ID
   * @param {string[]} [path] OPZIONALE- endpoint
   * @returns {Object[]} Ritorna l'id con più informazioni
   */
  async getMoreInformation(id, path) {
    let type = ''
    if (path) type = path
    else type = this.type

    // console.log(path, type)
    let { data } = await axios.get(`${this.baseURL}/${type}/${id}`, this.Params)
    return data
  }

  async getCredits(id, path) {
    let type = ''
    if (path) type = path
    else type = this.type

    // console.log(path, type)
    let response = await axios
      .get(`${this.baseURL}/${type}/${id}/credits`, this.Params)
      .then(({ data }) => {
        data = data.cast.slice(0, 4).map((actor) => actor.name)
        return data
      })
      .catch((err) => {
        console.log('porco')
      })
    return response
  }
  /**
   * dato un titolo e la path, ritorna un array di oggetti contenenti i risultati con il more information aggiunto
   * @param {string} title Title of carousel
   * @param  {...string} path TMDB callback
   * @returns {Object {
   * title: string
   * results: Array}}
   */
  async getArrayTitle(title, ...path) {
    let call = await this.makeCall(...path)
    let { results } = await this.moreInformationAllMulti(call)
    return { results, title }
  }
}
let count = 0
export default Call
