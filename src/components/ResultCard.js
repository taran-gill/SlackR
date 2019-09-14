import React from 'react';

import { Card } from '@rmwc/card';
import { Typography } from '@rmwc/typography'

class ResultCard extends React.Component {
    render() {
        const { content } = this.props;

        return (
            <Card className='result_card'>
                <img src={content.image} />
                <Typography use="headline6">{content.name}</Typography>           
            </Card>
        );
    }
}

export { ResultCard as default, ResultCard };