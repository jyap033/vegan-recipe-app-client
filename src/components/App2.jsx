import React, {  Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Note from "./Note";
import CreateArea from "./CreateArea";
import NotesDataService from "../services/notes.service";

export default class App2 extends Component {
  constructor(props) {
    super(props);
    this.retrieveNotes = this.retrieveNotes.bind(this);
    this.deleteNote = this.deleteNote.bind(this);


    this.state = {
      notes: []

    };
  }


  componentDidMount() {
    this.retrieveNotes();
    console.log(this.state.notes)
  
  }

  retrieveNotes() {
    NotesDataService.getAll()
      .then(response => {
        this.setState({
          notes: response.data
        });

      })
      .catch(e => {
        console.log(e);
      });
  }


  deleteNote(id) {
    NotesDataService.delete(id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/notes')
      })
      .catch(e => {
        console.log(e);
      });


  }

  render() {
    const {  notes ,retrieveNotes} = this.state;

    return (<div>
      {/* <Header /> */}
      <CreateArea onAdd={retrieveNotes}/>
      {(notes).map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            ingredient={noteItem.ingredient}
            instruction={noteItem.instruction}
            imageURL={noteItem.imageURL}
            ingredientList={noteItem.ingredientList} 
            instructionList = {noteItem.instructionList}

          />
        );
      })}

    </div>
    )

  }




}

