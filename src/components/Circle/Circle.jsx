import React from 'react'
import cssModule from './Circle.module.css'

const Circle = () => {
  const style = {
    sphere:`bg-gradient-to-b from-[#F4EEFF] via-[#DCD6F7] to-[#A6B1E1] w-[100px] h-[100px] rounded-full mt-5 cursor-pointer relative 
    before:content-[""] before:bg-[#424874] before:absolute before:w-[86px] before:cursor-default before:h-[86px] before:top-[7px] before:left-[7px] before:rounded-full caret-transparent `
  }

  return (
    <>
      <div className={style.sphere + cssModule.sphere}>
      </div>
    </>
  )
}

export default Circle