import React, { useState } from "react";
import NotesDataService from "../services/notes.service";

function CreateArea(props) {
  const [note, setNote] = useState({
    id: "",
    title: "",
    imageURL: "",
    ingredient: "",
    amount: "",
    ingredientList: [],
    instruction: "",
    instructionList: []
  });



  function handleChange(event) {
    const { name, value } = event.target;
    console.log(value)
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }



  function handleAddIngredient(event) {
    const curIngredient = note.ingredient;
    const curAmount = note.amount;
    setNote(prevNote => {
      return {
        ...prevNote,
        ingredientList: [...note.ingredientList, [curIngredient, curAmount]],
        ingredient: "",
        amount: ""
      };
    })
  }


  function handleAddInstruction(event) {
    var curInstruction = note.instruction;
    var curInstructionList = note.instructionList
    console.log(curInstruction)
    setNote(prevNote => {
      return {
        ...prevNote,
        instructionList: [...curInstructionList, curInstruction],
        instruction: ""
      };
    })
    console.log(note.instructionList)


  }


  function deleteIngredient(event) {
    const id = (event.target.id)
    var newList = note.ingredientList
    newList.splice(id, 1);
    setNote(prevNote => {
      return {
        ...prevNote,
        ingredientList: newList

      };
    })
    event.preventDefault();
  }

  function deleteInstruction(event) {
    const id = (event.target.id)
    var newList = note.instructionList
    newList.splice(id, 1);
    setNote(prevNote => {
      return {
        ...prevNote,
        instructionList: newList

      };
    })
    event.preventDefault();
    console.log(note.instructionList)
  }
  function submitNote(event) {
    console.log("submitted")
    setTimeout(() => {console.log("Waiting...")}, 5000 )
    NotesDataService.create(note)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    setNote({
      title: "",
      imageURL: "",
      ingredient: "",
      instruction: "",
      amount: "",
      ingredientList: [],
      instructionList: [],
    });
    props.onAdd();
    event.preventDefault();
  }


  //Render CreateArea here
  return (
    <div>
      <form>
        <p class="h2 center green" id="createTitle">Create your recipe!</p>
        <p class="h5 center green">Info</p>
        <input
          class="form-control mb-2 mr-sm-2"
          type="text"
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Enter Title"
        />
        <input
          type="text"
          class="form-control mb-2 mr-sm-2"
          name="imageURL"
          onChange={handleChange}
          value={note.imageURL}
          placeholder="Enter imageURL"
        />
        <br />
        <p class="h5 center green">Ingredients</p>
        <table id="ingredientTable" className="table table-bordered">
          <tbody>
            <tr>
              {/* <th >Ingredients</th>
              <th>Amount</th>
              <th></th> */}

            </tr>
            {
              (note.ingredientList).map((item, index) => {
                return (<tr key={index}>
                  <td >{item[0]}</td>
                  <td >{item[1]}</td>
                  <td >
                    <button class="deleteButton" id={index} onClick={deleteIngredient}>
                      <i class="fas fa-trash-alt grey"></i>
                    </button>
                  </td>
                </tr>
                )
              })
            }
          </tbody>
        </table>


        <input

          type="text"
          class="form-control mb-2 mr-sm-2"
          id="ingredient"
          name="ingredient"
          onChange={handleChange}
          value={note.ingredient}
          placeholder="Enter ingredient here"
        />
        <input
          class="form-control mb-2 mr-sm-2"
          type="text"
          id="amount"
          name="amount"
          onChange={handleChange}
          value={note.amount}
          placeholder="Enter amount here"
        />

        <button
          type="button"
          class="btn"
          id="addIngredientButton"
          onClick={handleAddIngredient}>
          Add Ingredient
        </button>

        <p class="h5 center green">Instructions</p>
        <table id="instructionTable" className="table table-bordered instructionTable">
          <tbody>
            <tr>
              {/* <th>Instructions</th>
            
              <th></th> */}

            </tr>
            {
              (note.instructionList).map((item, index) => {
                return (<tr key={index}>
                  <td id="instructiontd">{index + 1}. {item}</td>

                  <td>
                    <button class="deleteButton" id={index} onClick={deleteInstruction}>
                      <i class="fas fa-trash-alt grey"></i>
                    </button>
                  </td>
                </tr>
                )
              })
            }
          </tbody>


        </table>
        <textarea
          type="text"
          class="form-control mb-2 mr-sm-2"
          name="instruction"
          onChange={handleChange}
          value={note.instruction}
          placeholder="Enter instruction here"
          rows="3"
        />
        <button class="btn" type="button" id="addInstructionButton" onClick={handleAddInstruction}>Add Instruction</button>
        <button id="createButton" onClick={submitNote}><i class="fas fa-plus"></i></button>
      </form>
    </div>
  );
}

export default CreateArea;
