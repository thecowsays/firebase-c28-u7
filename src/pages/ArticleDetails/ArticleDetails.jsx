import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

import Likes from "../../components/Likes/Likes";

import "./ArticleDetails.css";

const ArticleDetails = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    // setup a reference to the document with the id
    const articleRef = doc(db, "Articles", articleId);

    getDoc(articleRef)
      .then((res) => {
        setArticle(res.data());
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="details-container">
      <h1>{article?.title}</h1>
      <h2>{article?.summary}</h2>
      <div className="details-info-container">
        <p>Category: {article?.category}</p>
        <p>
          <span className="article-span">Author: </span>
          {article?.writtenBy?.toUpperCase()}
        </p>
        <p>
          <span className="article-span published">Published: </span>
          {article?.written?.toDate()?.toDateString()}
        </p>
        <Likes articleId={{ articleId }} />
      </div>
      <div className="details-content">
        <img src={article?.imageUrl} className="details-img" />
        <p className="article-description">{article?.paragraphOne}</p>
        <p className="article-description">{article?.paragraphTwo}</p>
        <p className="article-description">{article?.paragraphThree}</p>
      </div>
    </div>
  );
};

export default ArticleDetails;
