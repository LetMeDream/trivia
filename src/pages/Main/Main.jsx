import React from 'react'
import MainButtons from '../../components/MainButtons'
import Circle from '../../components/Circle'

const Main = () => {
  const style= {
      container: `h-[100vh] bg-[#424874] flex flex-col justify-around items-center`
  }

  return (
  <> 
      <div className={style.container + ``}>         
          <Circle/>
          <MainButtons/>
      </div>
  </>
  )
}

export default Main