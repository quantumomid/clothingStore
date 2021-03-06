import React from 'react'
import { connect } from 'react-redux';
import { Route } from 'react-router';
import CollectionsOverview from '../../components/collections-overview/CollectionsOverview';
import WithSpinner from '../../components/with-spinner/WithSpinner';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shopActons';
import Collection from '../collection/Collection';

// Creates a HOC from Collections overview that shows the spinner while loading 
// and the actual component when not loading
const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(Collection);

class Shop extends React.Component{
    state = {
        loading: true
    }

    unsubscribeFromSnapshot = null;

    async componentDidMount(){
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection("collections");

        // Using Observer pattern 
        // collectionRef.onSnapshot(async snapshot => {
        //     // console.log(snapshot);
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     // console.log(collectionsMap);
        //     updateCollections(collectionsMap);
        //     this.setState({ loading: false });
        // });

        // Using Promise pattern 
        collectionRef.get().then(snapshot => {
            // console.log(snapshot);
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            // console.log(collectionsMap);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        });

        // Promises using async-await 
        // const collectionFetch = await fetch("https://firestore.googleapis.com/v1/projects/clothingstore-db-7b10e/databases/(default)/documents/collections");
        // const response = await collectionFetch.json();
        // console.log(response);
    
        // Promises using .then()
        // fetch("https://firestore.googleapis.com/v1/projects/clothingstore-db-7b10e/databases/(default)/documents/collections")
        // .then(response => response.json())
        // .then(collections => console.log(collections))
    }

    render(){
        const { match } = this.props;
        const { loading } = this.state;
    // console.log(match);
        return(
            <div className="shop-page">
                <Route exact path={`${match.path}`} render={ (props) => <CollectionOverviewWithSpinner isLoading={loading} {...props} />} />
                <Route path={`${match.path}/:collectionId`} render={ (props) => <CollectionPageWithSpinner isLoading={loading} {...props} /> } />
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(Shop);