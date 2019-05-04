import React, {Component} from 'react';

class NoteForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newNoteContent: '',
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeNote = this.writeNote.bind(this);
    }

    handleUserInput(e) {
        this.setState({
            newNoteContent: e.target.value,
        })
    }

    //Set new note content to empty string
    writeNote(e){

        e.preventDefault();

        this.props.addNote(this.state.newNoteContent);

        this.setState({
            newNoteContent: '',
        })
    }

    render() {
        return(
            <form className="formWrapper" onSubmit={this.writeNote}>
                <input className="noteInput"
                placeholder="Write a new note..."
                required
                value={this.state.newNoteContent}
                onChange={this.handleUserInput}/>
                <button className="noteButton">Add Note</button>
            </form>
        )
    }
}

export default NoteForm;