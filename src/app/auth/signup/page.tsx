import Signup from '@/components/auth/Signup'
import React from 'react'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-items-start items-center">
        <div>Register</div>
        <Signup />
    </div>
  )
}
