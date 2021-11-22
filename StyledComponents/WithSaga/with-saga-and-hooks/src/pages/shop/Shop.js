import React from 'react'
import { connect } from 'react-redux';
import { Route } from 'react-router';
import CollectionsOverviewContainer from '../../components/collections-overview/CollectionsOverviewContainer';
import { fetchCollectionsStart} from '../../redux/shop/shopActons';
import CollectionContainer from '../collection/CollectionContainer';

class Shop extends React.Component{

    async componentDidMount(){
        const { fetchCollectionsStart } = this.props;
        fetchCollectionsStart();
    }

    render(){
        const { match } = this.props;
    // console.log(match);
        return(
            <div className="shop-page">
                <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
                <Route path={`${match.path}/:collectionId`} component={CollectionContainer} />
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(Shop);