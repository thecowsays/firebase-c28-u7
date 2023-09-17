import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { storage, db, auth } from "../../config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 } from "uuid";
import { toast } from "react-toastify";

import "./AddArticle.css";

function AddArticle() {
  const categories = ["Health", "Food", "Travel", "Technology"];

  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    paragraghOne: "",
    paragraghTwo: "",
    paragraghThree: "",
    category: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // create a reference for the image
    const imageRef = ref(storage, `images/${formData.image.name + v4()}`);
    // now upload the image to the bucket
    uploadBytes(imageRef, formData.image)
      .then((res) => {
        // console.log(res);
        getDownloadURL(res.ref)
          .then((url) => {
            // now we have all data and image url ready
            // create article reference
            const articleRef = collection(db, "Articles");
            // use addDoc to add the article
            addDoc(articleRef, {
              title: formData.title,
              summary: formData.title,
              paragraghOne: formData.paragraghOne,
              paragraghTwo: formData.paragraghTwo,
              paragraghThree: formData.paragraghThree,
              category: formData.category,
              imageUrl: url,
              createdBy: user?.displayName,
              userId: user?.uid,
              createdAt: Timestamp.now().toDate(),
            }).catch((err) => console.log(err));
          })
          .then((res) => {
            // give feedback to the user that they've successfully added an article
            toast("Article saved successfully", {
              type: "info",
              autoClose: 1500,
            });
            // pause before navigating the user to the homepage
            setTimeout(() => {
              navigate("/");
            }, 2000);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="add-article-container">
      <form className="add-article-form" onSubmit={handleSubmit}>
        <h2>Create Article</h2>
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Maximum 100 characters"
            maxLength="100"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="summary">Summary</label>
          <textarea
            id="summary"
            placeholder="Maximum 120 characters"
            maxLength="120"
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="paragraphOne">Paragraph One</label>
          <textarea
            id="paragraphOne"
            placeholder="Maximum 650 characters"
            maxLength="650"
            onChange={(e) =>
              setFormData({ ...formData, paragraghOne: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="paragraphTwo">Paragraph Two</label>
          <textarea
            id="paragraphTwo"
            placeholder="Maximum 650 characters"
            maxLength="650"
            onChange={(e) =>
              setFormData({ ...formData, paragraghTwo: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="paragraphThree">Paragraph Three</label>
          <textarea
            id="paragraphThree"
            placeholder="Maximum 650 characters"
            maxLength="650"
            onChange={(e) =>
              setFormData({ ...formData, paragraghThree: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="">Select</option>
            {categories.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddArticle;
