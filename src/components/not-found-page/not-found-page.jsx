import React from "react";
import {Link} from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import "./not-found-page.css";


const NotFoundPage = () => {
  return (
    <div className="page">
      <Header />
      <main className="page__main">
        <div className="not-found-page__wrapper">
          <h1 className="not-found-page__title">404. Page not found</h1>
          <p className="not-found-page__description">The page you were looking for does not exist.
          Go to the <Link className="not-found-page__link" to="/">main page</Link></p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
