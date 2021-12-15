import React, {Component} from 'react';
import Header from "../../common/header/Header";
import './Home.css';
import {
    GridList,
    GridListTile,
    GridListTileBar,
    Card,
    FormControl,
    Input,
    Select,
    MenuItem,
    TextField,
    Button,
    createMuiTheme,
    InputLabel,
} from '@material-ui/core';

const theme = createMuiTheme();

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            publishedMovies: [],
            releasedMovies: [],
            genres: [],
            artists: [],
            movieName: '',

        };
    }

    componentDidMount() {
        fetch('http://localhost:8085/api/v1/movies?status=PUBLISHED')
            .then(res => res.json())
            .then(data => this.setState({publishedMovies: data.movies}))
            .catch(err => err)
        fetch('http://localhost:8085/api/v1/movies?status=RELEASED')
            .then(res => res.json())
            .then(data => this.setState({releasedMovies: data.movies}))
            .catch(err => err)
        fetch('http://localhost:8085/api/v1/genres')
            .then(res => res.json())
            .then(data => this.setState({genres: data.genres}))
            .catch(err => err)
        fetch('http://localhost:8085/api/v1/artists')
            .then(res => res.json())
            .then(data => this.setState({artists: data.artists}))
            .catch(err => err)
    }

    onMovieClick(movieURL) {
        this.props.history.push(movieURL);
    }

    render() {
        const {publishedMovies, releasedMovies, genres, artists, movieName, genreSelected, artistSelected} = this.state;
        return (
            <div>
                <Header/>
                <div className={"home-heading"}>Upcoming Movies</div>
                <div>
                    <GridList style={{flexWrap: 'nowrap', overflowX: 'auto'}} rows={1} cols={6} cellHeight={250}>
                        {
                            publishedMovies.map((movie) => {
                                const {poster_url, title} = movie;
                                return (
                                    <GridListTile>
                                        <img src={poster_url}/>
                                        <GridListTileBar title={title}/>
                                    </GridListTile>
                                );
                            })
                        }
                    </GridList>
                </div>
                <div style={{display: 'flex'}}>
                    <div style={{width: '76%', margin: '20px'}}>
                        <GridList gap={0} cols={4} cellHeight={350}>
                        {
                            releasedMovies.map((movie) => {
                                const {poster_url, title, release_date, id} = movie;
                                return (
                                    <GridListTile onClick={() => this.onMovieClick(`/movie/${id}`)} style={{cursor: 'pointer', padding: '10px'}}>
                                        <img src={poster_url}/>
                                        <GridListTileBar title={title} subtitle={`Release date: ${new Date(release_date).toDateString()}`}/>
                                    </GridListTile>
                                );
                            })
                        }
                        </GridList>
                    </div>
                    <div style={{width: '24%'}}>
                        <Card style={{margin: theme.spacing.unit, padding: '15px', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                            <span style={{color: theme.palette.primary.light}}>FIND MOVIES BY:</span>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="home-movie-name">Movie Name</InputLabel>
                                <Input value={movieName} onChange={(e) => this.setState({movieName: e.target.value})} id="home-movie-name"/>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="home-genres">Genres</InputLabel>
                                <Select
                                    id="home-genres"
                                    label="Genres"
                                    value={genreSelected}
                                    onChange={(value) => this.setState({artistSelected: value})}
                                >
                                    {
                                        genres.map((genre) => {
                                            return <MenuItem value={genre.id}>{genre.genre}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="home-artists">Artists</InputLabel>
                                <Select
                                    id="home-artists"
                                    label="Artists"
                                    value={artistSelected}
                                    onChange={(value) => this.setState({artistSelected: value})}
                                >
                                    {
                                        artists.map((artist) => {
                                            const {first_name, last_name} = artist;
                                            return <MenuItem value={artist.id}>{`${first_name} ${last_name}`}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel shrink={true} htmlFor="home-release-date-start">Release Date Start</InputLabel>
                                <TextField id={"home-release-date-start"} type={"date"} />
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel shrink={true} htmlFor="home-release-date-end">Release Date End</InputLabel>
                                <TextField id={"home-release-date-end"} type={"date"} />
                            </FormControl>
                            <Button variant={"contained"} color={"primary"}>APPLY</Button>
                    </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;