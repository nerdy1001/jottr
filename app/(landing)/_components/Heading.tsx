'use client'

import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/clerk-react'
import { useConvexAuth } from 'convex/react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth()
  return (
    <div className='max-w-[850px] space-y-10'>
      <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
        Your ideas, docs and projects on a single  
        <span className='underline ml-3'>platform</span>
      </h1>
      <h3 className='text-base text-center sm:text-xl md:text-2xl font-medium'>
        Jottr is the connected workspace where ideas are <br />
        and work are organized efficiently.
      </h3>
      {isLoading && (
        <div className='w-full flex items-center justify-center'>
          <Spinner size='lg' />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href='/documents'>
            Open Jottr
            <ArrowRight className='h-4 w-4 ml-2' />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode='modal'>
          <Button>
            Open Jottr 
          </Button>
        </SignInButton>
      )}
    </div>
  )
}
