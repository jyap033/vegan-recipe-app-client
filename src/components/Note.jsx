import React from "react";
import NotesDataService from "../services/notes.service";
import { Link } from "react-router-dom";

function Note(props) {
  function handleClick() {
    deleteNote(props.id);
    refreshPage()

  }
  function refreshPage() {
    window.location.reload(false);
  }
  function deleteNote(id) {
    NotesDataService.delete(id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/notes')
      })
      .catch(e => {
        console.log(e);
      });
  }


  return (
    <div className="note">
      <h1 class="display-4 text-center">{props.title}</h1>
      <div class="text-center">
        <img src={props.imageURL} class="rounded" alt="..."></img>
      </div>
      {/* <img src={props.imageURL} alt=""></img> */}
      <p class="h5 center green">Ingredient</p>
      <table className="table table-bordered">
        <tbody>
          <tr>
            {/* <th>Ingredients</th>
            <th>Amount</th> */}
          </tr>

          {
            (props.ingredientList).map((item, index) => {
              return (<tr key={index}>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
              </tr>
              )

            })

          }
        </tbody>


      </table>

      <p class="h5 center green">Instructions</p>

      <table className="table table-bordered">
        <tbody>
          <tr>
            {/* <th>Instructions</th> */}

          </tr>

          {
            (props.instructionList).map((item, index) => {
              return (<tr key={index}>
                <td id="instructiontd">{index + 1}. {item}</td>

              </tr>
              )

            })

          }
        </tbody>


      </table>



      <Link
        to={"/notes/" + props.id}
        className="badge link"
      >
      <h6 className="grey">
      Edit
      </h6>
        
              </Link>
      <button type="button" onClick={handleClick}>
      <i class="fas fa-trash-alt grey round-border"></i>
      </button>
    </div>
  );
}

export default Note;
