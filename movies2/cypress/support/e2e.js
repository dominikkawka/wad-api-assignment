export const filterByTitle = (movieList, string) =>
  movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);

export const filterByGenre = (movieList, genreId) =>
  movieList.filter((m) => m.genre_ids.includes(genreId));

export const filterByYear = (movieList, year) =>
  movieList.filter((m) => m.release_date.search(year) !== -1  )

export const filterByRating = (movieList, rating) =>
  movieList.filter((m) => m.vote_average >= rating)

export const sortDefault = (movieList) =>
  movieList

export const sortAtoZ = (movieList) =>
  movieList.sort((a,b) => (a.title > b.title ? 1 : -1))

export const sortZtoA = (movieList) => 
  movieList.sort((a,b) => (a.title > b.title ? -1 : 1))

export const sortLowestRated = (movieList) => 
  movieList.sort((a,b) => (a.vote_average - b.vote_average))

export const sortHighestRated = (movieList) => 
  movieList.sort((a,b) => (b.vote_average - a.vote_average))

export const getRevenue = (revenue) => {
  let rev = revenue.match(/.{1,3}/g);
  let r = rev.join(",");
  return r
}

export const randomString = () => {
  let res = Math.floor(Math.random() * 10000)
  return res
}