import React, { useEffect, useState } from "react";
import {useAuth} from '../auth/AuthContext'
import Header from "../components/Header";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [topArticle, setTopArticle] = useState(null);
  const [ad, setAd] = useState(null);
  const auth = useAuth();
  const user = auth.currentUser;

  useEffect(() => {
    fetch("http://localhost:5050/api/articles")
      .then((response) => response.json())
      .then(setArticles);

    fetch("http://localhost:5050/api/top-article")
      .then((response) => response.json())
      .then(setTopArticle);

    fetch("http://localhost:5050/api/advertisement")
      .then((response) => response.json())
      .then(setAd);
  }, []);

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-12 px-6 w-screen h-[100%]">
      <Header user={user} />
      <main className="py-2">
        <article
          id="top-article"
          className="bg-gray-700 rounded-b-md grid grid-cols-[40%_60%] mb-5"
        >
          {topArticle && (
            <>
              <div className="p-4">
                <h2 className="text-xl font-bold">{topArticle.title}</h2>
                <p className="py-5 font-medium text-gray-400">
                  {topArticle.teaser}
                </p>
                <a
                  href={`/article/${topArticle._id}`}
                  className="bg-slate-900 text-white px-4 py-2 rounded-md hover:font-bold"
                >
                  Read More
                </a>
              </div>
              <img
                src={topArticle.img_src}
                alt="Top Article"
                className="rounded-b-md h-auto w-auto"
              />
            </>
          )}
        </article>
        <div className="grid grid-cols-[60%_40%] gap-2">
          <div id="articles">
            {articles.map((article) => (
              <div key={article._id} className="bg-gray-700 p-6 rounded-md my-3">
                <div className="p-2">
                  <h2 className="text-xl font-bold">{article.title}</h2>
                  <p className="py-5 font-medium text-gray-400">
                    {article.teaser}
                  </p>
                  <a
                    href={`/article/${article._id}`}
                    className="bg-gray-900 text-white px-4 py-2 rounded-md hover:font-bold"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div
            id="advertisement"
            className="bg-gray-900/50 p-10 rounded-lg shadow-xl w-full max-w-md mx-auto h-fit my-3"
          >
            {ad  && (
              <>
                <h3 className="text-xl font-semibold mb-5 text-center">
                  Advertisement
                </h3>
                <img
                  src={ad[0].img_src}
                  alt="Advertisement"
                  className="w-full h-64 object-cover rounded mb-5"
                />
                <p className="mb-5">{ad[0].advertisement}</p>
                <a
                  href={ad[0].link}
                  className="w-full p-2 bg-blue-500 hover:bg-blue-700 rounded text-white"
                >
                  Shop Now
                </a>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
