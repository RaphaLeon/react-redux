import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './media.css';

class Media extends PureComponent {
    //ES6 mode
    /*constructor(props) {
        super(props)
        this.state = {
            author: props.author
        }
    } */
    //ES7 mode 
    state = {
        author: this.props.author
    }

    //ES6 mode
    /*constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }*/

    //ES7 mode
    handleClick = (event) =>{ 
        this.props.openModal(this.props.id);
    }
    render() {
        const styles = {
            container: {
                fontSize: 14,
                backgroundColor: '#44546b',
                cursor: 'pointer',
                width: 260,
                border: '1px solid red'
            }
        }
        return (
            <div className="Media" onClick={ this.handleClick }>
                <div className="Media-cover">
                    <img className="Media-image"
                        src={this.props.cover}
                        alt=""
                        width={260}
                        height={160}
                    />
                    <h3 className="Media-title">{this.props.title}</h3>
                    <p className="Media-author">{this.props.author}</p>
                </div>
            </div>
        )
    }
}

Media.propTypes = {
    cover: PropTypes.string,
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    type: PropTypes.oneOf(['video', 'audio']),
}

export default Media;