import React, {Component} from 'react';
import Note from './components/Note';
import NoteForm from './components/NoteForm';
import firebase from 'firebase/app';
import { DB_CONFIG } from './Config/config';
import 'firebase/database';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);

    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);

    this.App = firebase.initializeApp(DB_CONFIG);
    this.database = this.App.database().ref().child('notes');

    this.state = {
      notes: [],
    }
  }

  componentWillMount(){
    const previousNotes = this.state.notes;

    //Pass data to database
    this.database.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
      })

      this.setState({
        notes: previousNotes
      })
    })

    this.database.on('child_removed', snap => {
      for(var i=0; i< previousNotes.length; i++) {
        if(previousNotes[i].id === snap.key){
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        notes: previousNotes
      })
    })
  }

  //Push notes to the note array
  //Create 'child_added' event using addNote method
  addNote(note){
    // const previousNote = this.state.notes;
    // this.state.notes.push({id: previousNote.length + 1, noteContent: note});
    // this.setState({
    //   notes: previousNote
    // })
    const catchNote = note.trim();
    if (catchNote !== "" && catchNote.length <= 255) {
      this.database.push().set({ noteContent: note });
    }
  }

  //Create 'child_removed' event using removeNote method
  removeNote(noteId){
    console.log(noteId);
    this.database.child(noteId).remove();
  }

  
  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="heading">To-do list with React & Firebase</div>
        </div>
        
        <div className="notesBody">
        {
          this.state.notes.map((note) => {
            return (
              <Note 
              noteContent={note.noteContent} 
              noteId={note.id} 
              key = {note.id}
              removeNote = {this.removeNote}/>
            )
          })
        }
        </div>
        
        <div className="notesFooter">
          <NoteForm addNote={this.addNote} />
        </div>

      </div>
    );
  }
}

export default App;
