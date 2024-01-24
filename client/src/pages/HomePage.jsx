import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';

const HomePage = () => {

  const [userData, setUserData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  async function showUser() {
    try {
      let { data } = await axios({
        method: 'get',
        url: "http://localhost:3000/users",
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token,
        },
      });
      setUserData(data.data);
    
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data.message}`,
      });
    }
  }

  const handleAction = async (action, username) => {
    try {
      if (action === "skip") {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % userData.length);
      } else {
        await axios.post(
          `http://localhost:3000/users/${action}/${userData[currentIndex].id}`,
          {},
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.access_token,
            },
          }
        );
        Swal.fire({
          icon: 'success',
          text: `You ${action} ${username}`,
        });
        setCurrentIndex((prevIndex) => (prevIndex + 1) % userData.length);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data.message}`,
      });
      setCurrentIndex((prevIndex) => (prevIndex + 1) % userData.length);
    }
  };

  useEffect(() => {
    showUser();
  }, []);

  return (
    <>
      <div className="mt-10">
        <h2 className="text-4xl text-center font-bold mb-20">
          Meet Your Match
        </h2>
        <div className="flex justify-center">
          <div className="card card-side bg-base-100 shadow-xl">
            <figure className="w-60 h-80 overflow-hidden">
              <img
                src={userData[currentIndex]?.UserProfile?.profilePicture}
                alt={userData[currentIndex]?.username} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{userData[currentIndex]?.UserProfile?.fullname}</h2>
              <p>{userData[currentIndex]?.UserProfile?.occupation}</p>
              <p>{userData[currentIndex]?.UserProfile?.bio}</p>
              <div className="card-actions justify-end">
                <button onClick={() => handleAction('unlike', userData[currentIndex]?.username)}
                  className="btn btn-primary">UnLike</button>
                <button onClick={() => handleAction('like', userData[currentIndex]?.username)}
                  className="btn btn-primary">Like</button>
                <button onClick={() => handleAction('skip')}
                  className="btn btn-primary">Skip</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
