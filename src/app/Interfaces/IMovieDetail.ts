export interface IMovieDetail {
    imdbID: string;
    name: string;
    genre: string;
    imdbRating: string;
    posterUrl: string;
}

export interface IMovieIDs {
    emotionRelated: string[];
    topicRelated: string[];
}