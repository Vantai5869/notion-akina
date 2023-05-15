import React, { Component, useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import DetailPage from "./components/DetailPage";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import Header from "./components/Header";

const App = () => {
  const [enterCount, setEnterCount] = useState(0);
console.log("sssss")
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        setEnterCount((prevCount) => prevCount + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (enterCount === 3) {
      console.log('Enter key pressed 3 times!');
    }
  }, [enterCount]);

  const handleReset = () => {
    setEnterCount(0);
  };
  if(enterCount<3){
    return <></>
  }

  return (
    <BrowserRouter>
      <div className="container">
      <p>Enter count: {enterCount}</p>
        <Header />
        <Route path="/" exact component={LandingPage} />
        <Route path="/posts/:id" component={DetailPage} />
        <Route path="/add" component={CreatePost} />
        <Route path="/edit/:id" component={EditPost} />
      </div>
    </BrowserRouter>
  );
};

export default App;
