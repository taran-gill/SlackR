import React from 'react';

import { Grid, GridCell } from '@rmwc/grid';

import ResultCard from './ResultCard';

import FashionChic from '../assets/mock/fashion-chic.jpg';
import SportsWear from '../assets/mock/sportswear.jpeg';

class ResultGrid extends React.Component {
    render() {
        // const { results } = this.props;

        const results = [
            { name: 'Fashion chic', image: FashionChic },
            { name: 'Sportswear', image: SportsWear }
        ];

        return (
            <Grid>
                {
                    !results 
                        ? null 
                        : results.map(result => (
                            <GridCell span={6}>
                                <ResultCard content={result} />
                            </GridCell>
                        ))
                }
            </Grid>
        );
    }
}

export { ResultGrid as default, ResultGrid };