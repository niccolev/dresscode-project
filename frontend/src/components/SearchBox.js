import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
        navigate(`/?keyword=${keyword}&page=1`)
    }else {
        navigate(navigate(location.pathname))
    }
  };

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <FormControl
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5"
      ></FormControl>

      <Button type="submit" variant="outline-success" className="p-2">
        Submit
      </Button>
    </Form>
  );
}

export default SearchBox;
