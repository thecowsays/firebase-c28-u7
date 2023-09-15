import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { db } from "../../config/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

import ArticleCard from "../../components/ArticleCard/ArticleCard";

import "./CategoryArticle.css";

const CategoryArticle = () => {
  const { categoryName } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // create reference to firebase db collection / firestore
    const articleRef = collection(db, "Articles");

    // now create query
    const q = query(articleRef, where("category", "==", categoryName));

    // now get data that matches the query
    getDocs(q, articleRef)
      .then((res) => {
        const articles = res.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        }));
        // console.log(articles);
        setArticles(articles);
      })
      .catch((err) => console.log(err));
  }, [categoryName]); // dependency array, so it only runs once at load

  return (
    <div className="category-articles">
      {articles.map((item) => (
        <ArticleCard article={item} key={item.index} />
      ))}
    </div>
  );
};

export default CategoryArticle;
