export const show = {
    id: 123,
    name: 'Example show',
    url: 'https://www.tvmaze.com/shows/123/example',
    genres: ['Drama'],
    posterUrl: null,
    rating: 8.5,
    premiered: '2024-01-01',
    status: 'Ended',
    type: 'Scripted',
    language: 'English',
    channel: 'Example channel',
    summary: null,
};
const {posterUrl, channel, rating, ...tvMazeFields} = show;
export const tvMazeShow = {...tvMazeFields, image: posterUrl, network: {name: channel}, rating: {average: rating}};
