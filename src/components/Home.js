import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = ({ token }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://authv1.lifeforcode.net/v1/protected', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <h2>Home Page</h2>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
  );
};

export default Home;
