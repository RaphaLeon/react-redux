import React, {Component} from 'react';
import RegularError from '../components/regular-error';

class HandleError extends Component {
    state = {
        handleError: false
    }
    componentDidCatch(error, info) {
        this.setState({
            handleError: true,
        });
    }

    render(){
        if(this.state.handleError){
           return (
               //<p>Ooops something is wrong... :(</p>
               <RegularError />
           ) 
        }
        return this.props.children
    }
}

export default HandleError