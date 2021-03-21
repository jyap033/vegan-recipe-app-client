import React, { Component} from "react";
import { Switch, Route} from "react-router-dom";
import Header from "./Header";
import App2 from "./App2"
import EditNote from "./EditNote";
class App extends Component {
  render() {
    return (
     
      <div>
       <Header/>
        
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/"]} component={App2} />
            
            <Route path="/notes/:id" component={EditNote} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;