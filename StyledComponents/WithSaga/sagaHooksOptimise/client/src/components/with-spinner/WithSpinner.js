import Spinner from "../spinner/Spinner";

// This is a HOC taking in a component and returning another 
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps  }) => (
    isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />
);

export default WithSpinner;