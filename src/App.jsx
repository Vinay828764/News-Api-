import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const API = `https://newsapi.org/v2/everything?q=tesla&from=2024-06-25&sortBy=publishedAt&apiKey=6b995d1051ab4e66942667f8f41810d7`;

  // Api calling using fetch method
  const fetchValue = async () => {
    try {
      const fetchData = await fetch(API);
      const response = await fetchData.json();
      console.log(response);
      setData(response.articles);
    } catch (error) {
      console.log('Error occurred', error);
    }
  };

  useEffect(() => {
    fetchValue();
  }, []);

  // serach query code..
  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const filteredData = data.filter(article => {
    const title = article.title ? article.title.toLowerCase() : "";
    const content = article.content ? article.content.toLowerCase() : "";
    const queryLowerCase = query.toLowerCase();
    return title.includes(queryLowerCase) || content.includes(queryLowerCase);
  });

  return (
    <>
      <section className="container">
        <header>
          <h1 className="heading">Current News</h1>
          <form action="">
          <input 
            type="text" 
            placeholder="Search news..." 
            value={query}
            onChange={handleSearch}
            className="search-input"
          />
          </form>
        </header>

        <div>
          {filteredData.length > 0 ? (
            <main>
              <ul className="card">
              {filteredData.map((i) => (
                <li key={i.url} className="card_item">
                  <h4>{i.title}</h4>
                  <p>{i.content}</p>
                  <span><a href={i.url} target="_blank" className="card-link">Read more</a></span>
                  <p className="author">{i.author}</p>
                  {i.urlToImage && <img src={i.urlToImage} alt={i.title} />}
                </li>
              ))}
            </ul>
            </main>
          ) : (
            <p>Loading News...</p>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
