export interface Movie {
  id: number;
  title: string;
  year: number;
  image: string;
  backdropImage: string | null;
  description: string;
  genre: string;
  rating: number;
  duration: string | null;
}
