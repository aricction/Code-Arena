'use client'
import { Problem } from '@/types'

export default function AssistantPanel({ problem, code }: { problem: Problem, code: string }) {
  return (
    <div className="h-full bg-[#252526] text-neutral-200 p-4 text-sm">
      <p className="text-neutral-400">AI Assistant coming soon...</p>
    </div>
  )
}