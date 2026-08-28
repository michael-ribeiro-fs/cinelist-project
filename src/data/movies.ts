import type { Movie } from "../types/movie";

export const moviesData: { movies: Movie[] } = {
  movies: [
    {
      id: 1,
      title: "Oppenheimer",
      year: 2023,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQets6BFW8f7YPnEmnFg0zbkDhysng-Z1m-H9o5-0jVvIeqsoRgcZ4D5Xa6&s=10",
      description:
        "A história do físico J. Robert Oppenheimer e seu papel no desenvolvimento da bomba atômica durante a Segunda Guerra Mundial.",
      genre: "Drama • História",
      rating: 8.3,
      duration: "3h",
    },
    {
      id: 2,
      title: "Interestelar",
      year: 2014,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6USmoABueI2Z2G9EteTTJIQNORO43Az6udJfkVgB3j3zMKXpOxUuq8mDn&s=10",
      description:
        "Um grupo de exploradores embarca em uma missão através do espaço em busca de um novo lar para a humanidade.",
      genre: "Ficção científica • Drama",
      rating: 8.7,
      duration: "2h 49min",
    },
    {
      id: 3,
      title: "Duna: Parte Dois",
      year: 2024,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTvxMJtLxbCNXpxYeCNrbL6WKgztC9jwMTMfDs6XclbZVv9VSZvyAI3t8&s=10",
      description:
        "Paul Atreides une forças com Chani e os Fremen enquanto enfrenta uma guerra que decidirá o futuro do universo.",
      genre: "Ficção científica • Aventura",
      rating: 8.5,
      duration: "2h 46min",
    },
    {
      id: 4,
      title: "The Batman",
      year: 2022,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyOGgdYVmLBp7dXPSstps_kESskjJcb8DiwWkp8zZnpI2y5Hr4EIvcYksk&s=10",
      description:
        "Batman investiga uma série de crimes enquanto descobre uma complexa rede de corrupção em Gotham.",
      genre: "Ação • Crime",
      rating: 7.8,
      duration: "2h 56min",
    },
    {
      id: 5,
      title: "Blade Runner 2049",
      year: 2017,
      image:
        "https://m.media-amazon.com/images/S/pv-target-images/24ddd432723e134531db1a3881ad05c86ee6f48780a2aa104d610e023d420c24.jpg",
      description:
        "Um novo blade runner descobre um segredo que pode mudar completamente o futuro da humanidade.",
      genre: "Ficção científica • Thriller",
      rating: 8.0,
      duration: "2h 44min",
    },
  ],
};