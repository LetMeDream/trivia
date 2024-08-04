import React from 'react'
import MainButtons from '../../components/MainButtons'
import Circle from '../../components/Circle'
import { ErrorBoundary } from 'react-error-boundary'
import { TbFaceIdError } from "react-icons/tb";


const fallbackRender =({ error, resetErrorBoundary }) => {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert" className='flex flex-col items-center px-4 min-h-screen justify-center caret-transparent max-w-4xl mx-auto'>
      <div className='bg-gray-100 py-10 px-20 w-screen '>
        <div className='flex flex-col justify-center items-center gap-4 max-w-lg mx-auto'>
          <TbFaceIdError className='text-[120px]' />
          <p>Something went wrong:</p>
          <div className='text-red-500 border border-red-400 p-2'>{error.message}</div>
          <button
            className='text-gray-900 transition-all hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800' 
            onClick={resetErrorBoundary}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

const Main = () => {
  const style= {
      container: `h-[100vh] bg-[#424874] flex flex-col justify-around items-center`
  }

  const logError = (error, info) => {
    // Do something with the error, e.g. log to an external API
    // console.log(error)
    // console.log(info.componentStack)
  };

  return (
  <> 
    <ErrorBoundary fallbackRender={fallbackRender} onError={logError}>
      <div className={style.container + ``}>         
          <Circle/>
          <MainButtons/>
      </div>
    </ErrorBoundary>
  </>
  )
}

export default Main