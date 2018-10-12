import React, { Component } from 'react';
import HomeLayout from '../components/home-layout';
import Categories from '../../categories/components/categories';
import Related from '../components/related';
import ModalContainer from '../../widgets/containers/modal';
import Modal from '../../widgets/components/modal';
import HandleError from '../../error/containers/handle-error';
import VideoPlayer from '../../player/containers/video-player';
import { List as list } from 'immutable';

//Redux
import { connect } from 'react-redux';

class Home extends Component {
    state = {
        modalVisible: false
    }

    handleOpenModal = (media) =>{
        this.setState({
            modalVisible: true,
            media
        });
    }

    handleCloseModalClick = (event) => { 
        this.setState({
            modalVisible: false,
        });
    }
    render() {
        return(
            <HandleError>
                <HomeLayout>    
                    <Related />
                    <Categories 
                        categories={ this.props.categories }
                        handleOpenModal = { this.handleOpenModal }
                        search={ this.props.search }
                        /> 
                    {
                        this.state.modalVisible &&
                        <ModalContainer> 
                            <Modal handleClick={ this.handleCloseModalClick }>
                            <VideoPlayer 
                                autoplay={true}
                                src={this.state.media.src}
                                title={this.state.media.title}
                            />
                            </Modal>
                        </ModalContainer>
                    }
                </HomeLayout>
            </HandleError>
        );
    }
}

function mapStateToProps(state, props) {
    const categories = state.get('data').get('categories').map((categoryId) => {
        return state.get('data').get('entities').get('categories').get(categoryId);
    });

    let searchResults = list(); 
    const search = state.get('data').get('search');
    if (search) {
        const mediaList = state.get('data').get('entities').get('media');
        searchResults = mediaList.filter((item) => {
            return item.get('author').toUpperCase().includes(search.toUpperCase())
        }).toList();
    }
    return {
        categories,
        search: searchResults
    }
}

export default connect(mapStateToProps)(Home)