import React from 'react';

import './Summary.css';

class Summary extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            displayTxt: null,
        }
    }


    
    componentDidMount(){       
        this.props.firebase.firestore().collection("summaries").onSnapshot(qSnapshot => {
            qSnapshot.docChanges().forEach( change => {
                if(change.type == "modified"){
                    this.setState({
                        displayTxt: change.doc.data().summaries
                    })
                }
            })
        })
        
    }

    render() {
        // const { summary } = this.props;

        const summary = 'This is a summary of what people said before. It was very, very interesting; bLah blah blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blahblah, blah, blah, blah, blah. The end.';

        //const summaryItems = summary.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");

        var summaryItems = null
        if(this.state.displayTxt != null){
            summaryItems = this.state.displayTxt

        }

        /*
                <ul class="list1">



                    {
                        summaryItems.map(item => <li>{item}</li>)
                    }
                </ul>

        */

        return (
            <div class="summaryBlock">
                <p>
                    {summaryItems}
                </p>


            </div>
        );
    }
}

export { Summary as default, Summary };