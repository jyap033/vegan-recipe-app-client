import React, { Component } from "react";
import NotesDataService from "../services/notes.service";

export default class EditNote extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleAddIngredient = this.handleAddIngredient.bind(this);
        this.handleAddInstruction = this.handleAddInstruction.bind(this);
        this.deleteIngredient = this.deleteIngredient.bind(this);
        this.deleteInstruction = this.deleteInstruction.bind(this);
        this.updateNote = this.updateNote.bind(this);
        this.getNote = this.getNote.bind(this);

        this.state = {
            note: {
                id: "",
                title: "",
                imageURL: "",
                ingredient: "",
                amount: "",
                ingredientList: [],
                instruction: "",
                instructionList: []
            },
            message: ""
        };
    }



    componentDidMount() {
        this.getNote(this.props.match.params.id);
    }

    getNote(id) {
        NotesDataService.get(id)
            .then(response => {
                this.setState({
                    note: response.data
                });
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    handleChange(event) {
        const { name, value } = event.target;
        console.log(value)
        this.setState(prevState => ({
            note: {
                ...prevState.note,
                [name]: value
            }
        }));


    }



    handleAddIngredient(event) {
        console.log("add ingredient presed")
        const curIngredient = this.state.note.ingredient;
        const curAmount = this.state.note.amount;


        this.setState(prevState => ({
            note: {
                ...prevState.note,
                ingredientList: [...this.state.note.ingredientList, [curIngredient, curAmount]],
                ingredient: "",
                amount: ""
            }
        }));

    }


    handleAddInstruction(event) {
        var curInstruction = this.state.note.instruction;
        var curInstructionList = this.state.note.instructionList


        this.setState(prevState => ({
            note: {
                ...prevState.note,
                instructionList: [...curInstructionList, curInstruction],
                instruction: ""
            }
        }));


    }


    deleteIngredient(event) {
        const id = (event.target.id)
        var newList = this.state.note.ingredientList
        newList.splice(id, 1);
        this.setState(prevNote => {
            return {
                ...prevNote,
                ingredientList: newList

            };
        })
        event.preventDefault();
    }

    deleteInstruction(event) {
        const id = (event.target.id)
        var newList = this.state.note.instructionList
        newList.splice(id, 1);
        this.setState(prevNote => {
            return {
                ...prevNote,
                instructionList: newList

            };
        })
        event.preventDefault();
    }

    // Demo () {
    //     let history = useHistory();

    //         history.goBack()
    //     }
    updateNote(event) {
        NotesDataService.update(this.state.note._id, this.state.note)
            .then(response => {
                console.log(response.data);
                console.log("updated")
            })
            .catch(e => {
                console.log(e.response.data);
            });


        this.props.history.push('/')
        window.location.reload(false);
        // this.setState(prevState => ({
        //     note: {
        //     title: "",
        //     imageURL: "",
        //     ingredient: "",
        //     instruction: "",
        //     amount: "",
        //     ingredientList: [],
        //     instructionList: [],
        //     }
        // }));




        // props.onAdd();


        // event.preventDefault();
    }

    //    demo () {
    //         let history = useHistory();
    //         const goToPreviousPath = () => {
    //             history.goBack()
    //         }}
    render() {

        return (
            <div>
                <form>
                    <p class="h2 center green" id="createTitle">Update your recipe!</p>

                    <p class="h5 center green">Info</p>
                    <input
                        class="form-control mb-2 mr-sm-2"
                        type="text"
                        name="title"
                        value={this.state.note.title}
                        onChange={this.handleChange}

                        placeholder="Enter Title"
                    />
                    <input
                        class="form-control mb-2 mr-sm-2"
                        type="text"
                        name="imageURL"
                        value={this.state.note.imageURL}
                        onChange={this.handleChange}

                        placeholder="Enter imageURL"
                    />
                    <br />
                    <p class="h5 center green">Ingredients</p>


                    <table id="ingredientTable" className="table table-bordered">
                        <tbody>
                            {/* <tr> */}
                            {/* <th>Ingredients</th>
                                <th>Amount</th>
                                <th></th> */}

                            {/* </tr> */}
                            {
                                (this.state.note.ingredientList).map((item, index) => {
                                    return (<tr key={index}>
                                        <td >{item[0]}</td>
                                        <td >{item[1]}</td>
                                        <td>
                                            <button class="deleteButton" type="button" id={index} onClick={this.deleteIngredient}>
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
                        class="form-control mb-2 mr-sm-2"
                        type="text"
                        id="ingredient"
                        name="ingredient"
                        value={this.state.note.ingredient}
                        onChange={this.handleChange}
                        placeholder="Enter ingredient here"
                    />
                    <input
                        class="form-control mb-2 mr-sm-2"
                        type="text"
                        id="amount"
                        name="amount"
                        value={this.state.note.amount}
                        onChange={this.handleChange}
                        placeholder="Enter amount here"
                    />

                    <button class="btn" type="button" id="addIngredientButton" onClick={this.handleAddIngredient}>Add Ingredient</button>

                    <p class="h5 center green">Instructions</p>

                    <table id="instructionsTable" className="table table-bordered instructionTable">
                        <tbody>
                            <tr>
                                {/* <th>Instructions</th> */}

                                {/* <th></th> */}

                            </tr>
                            {
                                (this.state.note.instructionList).map((item, index) => {
                                    return (<tr key={index}>
                                        <td id="instructiontd">{index + 1}. {item}</td>

                                        <td>
                                            <button class="deleteButton" type="button" id={index} onClick={this.deleteInstruction}>
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
                        onChange={this.handleChange}
                        value={this.state.note.instruction}
                        placeholder="Enter instruction here"
                        rows="3"
                    />
                    <button class="btn" type="button" id="addInstructionButton" onClick={this.handleAddInstruction}>Add Instruction</button>
                    <button type="button" id="createButton" onClick={this.updateNote}><i class="far fa-save"></i></button>
                </form>
            </div>
        );
    }
}