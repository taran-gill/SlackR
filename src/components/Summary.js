import React from 'react';

import './Summary.css';

class Summary extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            displayTxt: null,
            name: null,
            changeName: false,
        }
    }


    
    componentDidMount(){       
        this.props.firebase.firestore().collection("summaries").onSnapshot(qSnapshot => {
            qSnapshot.docChanges().forEach( change => {
                console.log("===============================")
                console.log("change.doc", change.doc)
                console.log("change.doc.data()", change.doc.data())
                console.log("change.doc.data().summaries", change.doc.data().summary)
                if(change.type == "modified" || change.type=="added"){
                    this.setState({
                        displayTxt: change.doc.data().summary
                    })
                }

            })
        })
        
    }

    setName = () =>{
        var name = document.getElementById("nameInput").value

        this.setState({
            name: name,
            changeName: true,
        })
        document.getElementById("nameInput").disabled = true
    }

    changeName = () => {
        document.getElementById("nameInput").disabled = false
        this.setState({
            changeName: false,
        })
    }

    render() {
        const summary = 'This is a summary of what people said before. It was very, very interesting; bLah blah blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blahblah, blah, blah, blah, blah. The end.';

        var summaryItems = null
        if(this.state.displayTxt != null){
            summaryItems = this.state.displayTxt

        }
        var btnArr = (<button onClick={this.setName}>Set Name</button>)
        if(this.state.changeName == true){
            btnArr = (
                <button onClick={this.changeName}>Change Name</button>
            )
        }

        var intro = (<p className="HI">Hi! What's Your Name?</p>)
        if(this.state.name != null){
            intro = (<p className="HI">Hi {this.state.name}!</p>)
        }


        return (
            <>
                <div class="verticleBlock">
                    {intro}

                    <input id="nameInput" type="text" placeholder="Name..."/>
                    {btnArr}
                </div>
                <div class="summaryBlock">
                    <p>
                        {summaryItems}
                    </p>
                </div>

            </>

        );
    }
}

export { Summary as default, Summary };