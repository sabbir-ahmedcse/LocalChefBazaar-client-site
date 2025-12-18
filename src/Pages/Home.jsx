import React from 'react'
import Banner from '../Components/Banner'
import MealsCard from '../Components/MealsCard'
import HomeCard from '../Components/HomeCard'

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <MealsCard></MealsCard>

      <HomeCard></HomeCard>
    </div>
  )
}

export default Home