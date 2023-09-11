import { useEffect, useState } from "react";

import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

import "./Banner.css";

const Banner = () => {
  const [mainArticle, setMainArticle] = useState([]);
  const [otherArticles, setOtherArticles] = useState([]);

  // get data when Banner loads
  useEffect(() => {
    // create var to reference the articles
    const articleRef = collection(db, "Articles");

    // setup query to filter responses
    // sort and then get 5 latest articles
    const q = query(articleRef, orderBy("written", "desc"), limit(5));

    // get articles from db
    getDocs(q, articleRef)
      .then((res) => {
        //   console.log(res.docs[0].data());
        const articles = res.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        }));
        //   console.log("articles: ", articles);
        setMainArticle(articles[0]);
        setOtherArticles(articles.splice(1));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="banner-container">
      <div
        className="main-article-container"
        style={{ backgroundImage: `url(${mainArticle.imageUrl})` }}
      >
        <div className="banner-info">
          <h2>{mainArticle?.title}</h2>
          <div className="main-article-info">
            <p>{mainArticle?.written?.toDate().toDateString()}</p>
          </div>
        </div>
      </div>

      <div className="other-articles-container">
        {otherArticles.map((item) => (
          <div
            className="other-article-item"
            style={{ backgroundImage: `url(${item?.imageUrl})` }}
            key={`_${item.id}`}
          >
            <div className="banner-info">
              <h3>{item?.title}</h3>
              <div className="banner-info">
                <p>{item?.written?.toDate().toDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
