import React, { Component } from 'react';
import VideoPlayerLayout from '../components/video-player-layout'
import Video from '../components/video'
import Title from '../components/title';
import PlayPause from '../components/play-pause';
import Timer from '../components/timer';
import Controls from '../components/video-player-controls';
import { formatTime } from '../../libs/utils';
import ProgressBar from '../components/progress-bar';
import Spinner from '../components/spinner';
import Volume from '../components/volume';
import FullScreen from '../components/full-screen';

//Redux
import { connect } from 'react-redux';

class VideoPlayer extends Component {
    state = {
        pause: false,
        duration: 0,
        formatedDuration: 0,
        currentTime: 0,
        formatedTime: 0,
        loading: false,
        volume: 1,
        lastVolume: 0
    }

    togglePlay = (event) => {
        this.setState({
            pause: !this.state.pause
        })
    }
    componentDidMount(){
        this.setState({
            pause: (!this.props.autoplay)
        })
    }
    handleLoadedMetadata = event => {
        this.video = event.target;
        this.setState({
            duration: this.video.duration,
            formatedDuration: formatTime(this.video.duration),
        })
    }
    handleTimeUpdate = event => {
        this.setState({
            currentTime: this.video.currentTime,
            formatedTime: formatTime(this.video.currentTime)
        })
    }
    handleProgressChange = event => {
        this.video.currentTime = event.target.value;
    }
    handleSeeking = event => { 
        this.setState({
            loading: true
        })
    }
    handleSeeked = event => { 
        this.setState({
            loading: false
        })
    }
    handleVolumeChange = event => {
        this.video.volume = event.target.value;  
        this.setState({
            lastVolume: this.video.volume,
            volume: this.video.volume
        })
    }
    handleVolumeToggle = event => {
        this.setState({
            lastVolume: this.video.volume,
            volume: this.state.volume === 0 ? this.state.lastVolume : 0
        })
        //this.video.volume = this.state.volume;
        this.video.volume = this.video.volume === 0 ? this.state.volume : 0;
    }
    handleFullScreenClick = event => {
        if (!document.webkitIsFullScreen) { //only work in chrome
            // mando a full screen
            this.player.webkitRequestFullscreen()
          } else {
            document.webkitExitFullscreen();
            // salgo del full screen
      }
    }
    setRef = element => {
        this.player = element;
    }
    render() {
        return(
            <VideoPlayerLayout
                setRef = {this.setRef}
            >
                <Title 
                    title = {this.props.media.get('title')}
                />
                <Controls>
                    <PlayPause 
                        pause = {this.state.pause}
                        handleClick = { this.togglePlay }                   
                        />
                    <Timer 
                        duration = { this.state.formatedDuration }
                        currentTime = { this.state.formatedTime }
                    />
                    <ProgressBar 
                        duration = { this.state.duration }
                        value = { this.state.currentTime }
                        handleProgressChange = { this.handleProgressChange }
                    /> 
                    <Volume 
                        value = { this.state.volume }
                        handleVolumeChange = { this.handleVolumeChange }
                        handleVolumeToggle = { this.handleVolumeToggle }
                    />
                    <FullScreen 
                        handleFullScreenClick = { this.handleFullScreenClick }
                    />
                </Controls>
                <Spinner 
                    active = { this.state.loading }
                />
                <Video 
                    autoplay = { this.props.autoplay }
                    pause = { this.state.pause }
                    handleLoadedMetadata = { this.handleLoadedMetadata }
                    handleTimeUpdate = { this.handleTimeUpdate }
                    handleSeeking = { this.handleSeeking }
                    handleSeeked = { this.handleSeeked}
                    src = { this.props.media.get('src') }//"http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4"
                />
            </VideoPlayerLayout>
        )
    }
} 

function mapStateToProps(state, props) {
    return {
        media: state.get('data').get('entities').get('media').get(props.id)
    }
}

export default connect(mapStateToProps)(VideoPlayer);