'use client'
import { Problem } from '@/types'
import { memo } from 'react'

function ProblemPanel({ problem }: { problem: Problem }) {
  return (
    <div className="h-full bg-[#1e1e1e] text-neutral-200 p-4 overflow-y-auto text-sm">
      <h2 className="text-base font-semibold mb-2">{problem.title}</h2>
      <p>{problem.description}</p>
    </div>
  )
}

export default memo(ProblemPanel)