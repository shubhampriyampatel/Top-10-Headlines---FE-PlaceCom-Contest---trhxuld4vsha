import React, { useState, useEffect } from 'react'
// import '../styles/App.css';

const App = () => {
  const [category, setCategory] = useState("general");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const apikey = "ghdcfjv6687b7856vk98b6754734667bt879bv678"

  useEffect(()=>{
    setLoading(true)
    const fetchDate = async ()=>{
      const data = await fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${apikey}&max=10&lang=en`)
      .then(response=>response.json())
      .then(data=>{
        setNewsData(data.articles)
        setLoading(false)
      })
      .catch(err=>console.log(err))
    }
    fetchDate()
  },[category])
  return (
    <div id="main">
      <h1 className='heading'>Top 10 {category} news.</h1>
      <select value={category} onChange={(e)=>setCategory(e.target.value)}>
        <option value="general">General</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
        <option value="world">World</option>
        <option value="entertainment">Entertainment</option>
        <option value="science">Science</option>
      </select>
      {loading?
      <p className='loader'>Loading...</p>
      :
      <ol>
        {newsData.map((data,idx)=>{
          return(
          <li key={idx}>
            <img className='news-img' src={data.image} alt=""/>
            <section className='new-title-content-author'>
              <h3 className='news-title'>{data.title}</h3>
              <section className='new-content-author'>
                <p className='news-description'>{data.description}</p>
                <p className='news-source'><strong>Source:</strong> {data.source.name}</p>
              </section>
            </section>
          </li>
          )
        })}
      </ol>
    }
    </div>
  )
}


export default App;
