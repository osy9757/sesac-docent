import React, { useState, useEffect } from 'react';
import PageSizeSelector from './components/PageSizeSelector';
import Pagination from './components/Pagination';

const PostsTable = () => {
  const [posts, setPosts] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8080/posts/list/1/${pageSize}/${currentPage}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {

        console.log('Fetched data:', data); 
        setPosts(data);
        setTotalPages(Math.ceil(data.length / pageSize)); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [pageSize, currentPage]);

  return (
    <div>
      <PageSizeSelector pageSize={pageSize} setPageSize={setPageSize} />
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>ID</th>
            <th>Title</th>
            <th>Views</th>
            <th>Updated At</th>
            <th>User ID</th>
            <th>User Name</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={index}>
              <td>{post.v_post_rank}</td>
              <td>{post.v_post_id}</td>
              <td>{post.v_post_title}</td>
              <td>{post.v_post_views}</td>
              <td>{new Date(post.v_post_updated_at).toLocaleDateString()}</td>
              <td>{post.v_user_id}</td>
              <td>{post.v_user_name}</td>
              <td>{post.v_post_likes}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </div>
  );
};

export default PostsTable;