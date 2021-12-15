import React, {Component} from 'react';
import Header from "../../common/header/Header";
import {GridList, GridListTile, GridListTileBar, Typography} from '@material-ui/core';
import './Details.css'
import {Link} from "react-router-dom";
import {StarBorder} from '@material-ui/icons';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {},
            rating: 0,
        };
    }

    componentDidMount() {
        const movieId = window.location.pathname.substring(7);
        fetch(`http://localhost:8085/api/v1/movies/${movieId}`)
            .then(res => res.json())
            .then(data => this.setState({movie: data}))
            .catch(err => err)
    }

    onRatingChange(value) {
        this.setState({rating: value});
    }

    render() {
        const {movie, rating: myRating} = this.state;
        const {
            poster_url,
            title,
            genres,
            duration,
            release_date,
            rating,
            storyline,
            wiki_url,
            trailer_url,
            artists
        } = movie;
        const stars = [1, 2, 3, 4, 5];
        if (!title) return <div></div>;
        return (
            <div>
                <Header showBookShow={true} bookShowId={window.location.pathname.substring(7)} {...this.props}/>
                <div style={{display: 'flex'}}>
                    <div style={{flex: 1, padding: '10px'}}>
                        <Link to={"/"}>
                            <Typography className={"back-to-home"} variant={"button"}
                                        component={"span"}>{'< Back to Home'}</Typography>
                        </Link>
                        <img src={poster_url}/>
                    </div>
                    <div style={{flex: 3, padding: '10px'}}>
                        <Typography variant={"headline"} component={"h2"}>{title}</Typography>
                        <div><b>Genres: </b><span>{genres.join()}</span></div>
                        <div><b>Duration: </b><span>{duration}</span></div>
                        <div><b>Release Date: </b><span>{new Date(release_date).toDateString()}</span></div>
                        <div><b>Rating: </b><span>{rating}</span></div>
                        <div style={{marginTop: '16px'}}><b>Plot: </b><span><a
                            href={wiki_url}>(Wiki Link)</a>{storyline}</span></div>
                        <div style={{marginTop: '16px'}}>
                            <b>Trailer: </b>
                            <div>
                                <iframe src={trailer_url} width={"100%"}></iframe>
                            </div>
                        </div>
                    </div>
                    <div style={{flex: 1, padding: '10px'}}>
                        <div>
                            <b>Rate this movie:</b>
                            <div style={{margin: '10px 0'}}>
                                {
                                    stars.map((star) => {
                                        return <StarBorder onClick={() => this.onRatingChange(star)} style={{
                                            cursor: 'pointer',
                                            color: (star <= myRating) ? 'yellow' : 'black'
                                        }}/>
                                    })

                                }
                            </div>
                        </div>
                        <div>
                            <div style={{margin: '10px 0'}}><b>Artists: </b></div>
                            <GridList cols={2}>
                                {
                                    artists.map((artist) => {
                                        const {profile_url, first_name, last_name} = artist;
                                        return (
                                            <GridListTile>
                                                <img src={profile_url} height={"100%"}/>
                                                <GridListTileBar title={`${first_name} ${last_name}`}/>
                                            </GridListTile>
                                        );
                                    })
                                }
                            </GridList>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Details;