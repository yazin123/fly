import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'

const SuccessMessage = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="text-center bg-gray-800 p-8 rounded-lg shadow-lg">
        <FaCheckCircle className="mx-auto text-6xl text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-white">Registration Successful!</h2>
        <p className="mt-2 text-gray-300">Thank you for completing the quiz.</p>
      </div>
    </div>
  )
}

export default SuccessMessage