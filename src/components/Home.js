import React from 'react';
import "../styles/Home.css";

function Home(){

  return (
    <div className='home'>
      <h1 className='home-title text-center'>Bienvenu sur PlaniFood</h1>
      <div className='sections'>
        <div className='section'>
          <h3>
            Laissez vos idées s'exprimer et faites le plein de recettes grace a nos suggestion
          </h3>
        </div>
        <div className='section'>
          <h3>
            Planifiez vos repas de la semaine et simplifiez vous la tache
          </h3>
        </div>
      </div>
    </div>
  )
}

export default Home;