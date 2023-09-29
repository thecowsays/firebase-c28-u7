import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import { auth, db } from "../../config/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection } from "firebase/firestore";

import "./Likes.css";

const Likes = ({ articleId }) => {
  const [user] = useAuthState(auth);

  const [isLiked, setIsLiked] = useState(false);

  //   need to add a like for user to like or unlike this article
  // we need another collection that stores the userId and articleId
  const handleLikes = (e) => {
    if (user) {
      // create a ref to likes collection
      // will create collection if it doesn't exist
      const likesRef = collection(db, "Likes");
      // add a document with this articleId and userId
      addDoc(likesRef, {
        userId: user?.uid,
        articleId: articleId,
      })
        .then((res) => {
          // we want to show the full heart to the user
          setIsLiked(true);
        })
        .catch((err) => console.log(err));
    }
  };

  return <>{isLiked ? <FaHeart /> : <FaRegHeart onClick={handleLikes} />}</>;
};

export default Likes;
