'use client'
import { SubmissionResult } from '@/types'
import { memo } from 'react'

function OutputPanel({ result }: { result: SubmissionResult | null }) {
  return (
    <div className="h-full bg-[#1e1e1e] text-neutral-200 p-4 text-sm font-mono overflow-y-auto">
      {!result && <p className="text-neutral-500">Run your code to see output.</p>}
      {result && <p>{result.status}</p>}
    </div>
  )
}

export default memo(OutputPanel)