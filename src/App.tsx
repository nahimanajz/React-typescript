import { useEffect, useState } from 'react';
import './App.css';
import { IPost } from './models/IPost';


function App() {
  const url: string = "https://jsonplaceholder.typicode.com/posts"
  const defaultPosts: IPost[] = []
  const [posts, setPosts] = useState<IPost[]>(defaultPosts)
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true)
  const [error, setError]: [string, (error: string) => void] = useState("");

  async function getPosts() {
    return await fetch(url,{
      method: 'GET',
      headers:{
        'Content-Type':'applicatio/json'
      }
    }).then((response) => {
        setLoading(false)
        return response.json()
      }).then(response=> setPosts(response))
      .catch((ex) => {
        const error = ex.response.status === 404 ? "Resource not found" : "An unexpected error has occured";
        setError(error)
        setLoading(false)
      })
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
      <div className='App'>
        {loading&&<div>Loading...</div>}
        <ul className='posts'>
          {posts.map(({ id, title, body }) => (
            <li key={id}>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}

        </ul>
        {error && <p className='error'>{error}</p>}
      </div>
    </>

  );
}

export default App;
