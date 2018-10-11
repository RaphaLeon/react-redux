import React, { Component } from 'react';
//import Media from './media.js';
import MediaContainer from '../containers/media';
import './playlist.css';

/*class Playlist extends Component {
    render() {
        const playList = this.props.data.categories[0].playlist;
        console.log(this.props.data);
        return (
            <div className="PlayList">
                {
                    playList.map( (item)=>{
                       return <Media {...item} key={item.id} />
                    })
                }
            </div>
        )
    }
}*/


function Playlist(props) {
    return (
        <div className="PlayList">
            {
                props.playlist.map( (mediaId)=>{
                    return <MediaContainer 
                                openModal={props.handleOpenModal} 
                                id={mediaId} key={mediaId} 
                            />
                })
            }
        </div>
    )
}

export default Playlist;