import { SpinnerContainer, SpinnerOverlay } from "./withSpinnerStyles"

// This is a HOC taking in a component and returning another 
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps  }) => {
    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>
    ) : (
        <WrappedComponent {...otherProps} />
    )
}

// Another way to write the above is:
// const WithSpinner = WrappedComponent => {
    
//     const Spinner = ({ isLoading, ...otherProps }) => {
//         return isLoading ? (
//             <SpinnerOverlay>
//                 <SpinnerContainer />
//             </SpinnerOverlay>
//         ) : (
//             <WrappedComponent {...otherProps} />
//         );
//     };

//     return Spinner;
// };


export default WithSpinner;