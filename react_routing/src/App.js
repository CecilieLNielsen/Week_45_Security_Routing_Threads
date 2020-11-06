import './App.css';
import React, { useState } from "react";
import { Route, NavLink, Switch } from "react-router-dom";

const Header = () => {
  return (
    <ul className="header">
      <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
      <li><NavLink activeClassName="active" to="/products">Products</NavLink></li>
      <li><NavLink activeClassName="active" to="/add-book">Add Book</NavLink></li>
      <li><NavLink activeClassName="active" to="/find-book">Find Book</NavLink></li>
      <li><NavLink activeClassName="active" to="/company">Company</NavLink></li>
    </ul>

  );
};

const Home = () => {
  return (
    <h1>Hello! Just testing home!</h1>
  );
};
const Products = (props) => {
  return (
    <h1>Hello! Just testing products! {props.bookFacade.getBooks().map(element => <li>{element.title}</li>)}</h1>
  );
};
const Company = () => {
  return (
    <h1>Hello! Just testing company!</h1>
  );
};

const NoMatch = () => {
  return (
    <h1>Hello! Just testing nomatch!</h1>
  );
};

const FindBook = (props) => {
  const initialValue1 = {
    id: ""
  }
  const initialValue2 = {
    id: "",
    title: "",
    info: ""
  };
  const [id, setId] = useState(initialValue1);
  const [book, setBook] = useState(initialValue2);

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setId({ ...id, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const book = props.bookFacade.findBook(id.id);
    setBook(book);
  }

  const handleDelete = (event) => {
    event.preventDefault();
    props.bookFacade.deleteBook(book.id);
    setBook(initialValue2);
  }

  return (
    <div>
      <h1>Find book</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="BookId"
          name="id"
          placeholder="Book ID"
          onChange={handleChange} />
        <input
          type="submit"
          value="Find" />
      </form>
      <h3>Extended book information</h3>
      <p>ID: {book.id}</p>
      <p>Title: {book.title}</p>
      <p>Info: {book.info}</p>
      <form onSubmit={handleDelete}>
        <input
          type="submit"
          value="Delete" />
      </form>
    </div>
  );
};

const AddBook = (props) => {
  const initialValue = {
    title: "",
    info: ""
  };
  const [book, setBook] = useState(initialValue);

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setBook({ ...book, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.bookFacade.addBook(book);
  }

  return (
    <div>
      <h1>Add book</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="BookTitle"
          name="title"
          placeholder="Add title"
          onChange={handleChange} />
        <br />
        <input
          type="text"
          id="BookInfo"
          name="info"
          placeholder="Add info"
          onChange={handleChange} />
        <br />
        <br />
        <input
          type="submit"
          value="Save" />
      </form>
    </div>
  );
};

function App(props) {
  return (<div>
    <Header />
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/products">
        <Products bookFacade={props.bookFacade} />
      </Route>
      <Route path="/add-book">
        <AddBook bookFacade={props.bookFacade} />
      </Route>
      <Route path="/find-book">
        <FindBook bookFacade={props.bookFacade} />
      </Route>
      <Route path="/company">
        <Company />
      </Route>
      <Route>
        <NoMatch />
      </Route>
    </Switch>
  </div>

  );
}

export default App;
