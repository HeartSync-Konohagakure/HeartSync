const HomePage = () => {
  return (
    <>
      <div className="mt-10">
        <h2 className="text-4xl text-center font-bold mb-20">
          Meet Your Match
        </h2>
        <div className="flex justify-center">
          <div className="card card-side bg-base-100 shadow-xl">
            <figure>
              <img src="https://upload.wikimedia.org/wikipedia/id/f/f5/Nami_faace.jpg" alt="Card" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Nami</h2>
              <p>Navigator</p>
              <p>I'm navigating the seas with the Straw Hat Pirates</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Like</button>
                <button className="btn btn-primary">Skip</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
