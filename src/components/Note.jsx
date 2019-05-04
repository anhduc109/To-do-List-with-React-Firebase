import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Note extends Component{

    constructor(props) {
        super(props);
        this.noteContent = props.noteContent;
        this.noteId = props.noteId;

        this.handleRemoveNote = this.handleRemoveNote.bind(this);
    }

    handleRemoveNote(id){
        this.props.removeNote(id);
    }

    render(){
        return(
            <div className = "note fadeIn">
                <p className="noteContent">{this.noteContent}</p>
                <span className="closeButton" onClick={() => this.handleRemoveNote(this.noteId)}>&times;</span>
            </div>
        );
    }
}

 Note.propTypes = {
     noteContent: PropTypes.string
 }

export default Note;