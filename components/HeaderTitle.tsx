import React from 'react'

type Props = {
    title? : string
}

export default function HeaderTitle({title}: Props) {
  return (
    <h2 className='font-bold text-2xl mb-4'>{title|| 'Header'} </h2>
  )
}