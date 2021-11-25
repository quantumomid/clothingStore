import React from "react";
import { ErrorImageContainer, ErrorImageOverlay, ErrorImageText } from "./errorBoundaryStyles";

export default class ErrorBoundary extends React.Component{
    
    constructor(){
        super()
        this.state = {
            hasError: false
        };
    }

    // invoked after an error has been thrown by a descendant component
    // recieves the error as a parameter
    // should return a value to update the state i.e. to indicate error thrown
    static getDerivedStateFromError(error){
        return { hasError: true };
    }

    // invoked after an error has been thrown by a descendant component
    // two parameters: error (that was thrown) and an info object (with info on which
    // component threw the error)
    componentDidCatch(error, info){
        console.log(error);
    }

    render(){
        if(this.state.hasError) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl="https://i.imgur.com/A040Lxr.png" />
                    <ErrorImageText>Something got lost in space .......... </ErrorImageText>
                </ErrorImageOverlay>
            )
        }
        return this.props.children;
    }
}