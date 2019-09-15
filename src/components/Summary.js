import React from 'react';

class Summary extends React.Component {
    render() {
        // const { summary } = this.props;

        const summary = 'This is a summary of what people said before. It was very, very interesting. The end.';

        const summaryItems = summary.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");

        return (
            <ul>
                {
                    summaryItems.map(item => <li>{item}</li>)
                }
            </ul>
        );
    }
}

export { Summary as default, Summary };