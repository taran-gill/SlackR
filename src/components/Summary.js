import React from 'react';

import './Summary.css';

class Summary extends React.Component {
    render() {
        // const { summary } = this.props;

        const summary = 'This is a summary of what people said before. It was very, very interesting; bLah blah blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blahblah, blah, blah, blah, blah. The end.';

        const summaryItems = summary.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");

        return (
            <div class="summaryBlock">
                <ul class="list1">
                    {
                        summaryItems.map(item => <li>{item}</li>)
                    }
                </ul>
            </div>
        );
    }
}

export { Summary as default, Summary };