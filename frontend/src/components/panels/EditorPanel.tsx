'use client'
import { Language } from '@/types'

interface Props {
  code: string
  language: Language
  onCodeChange: (v: string) => void
  onLanguageChange: (l: Language) => void
  onRun: () => void
  isRunning: boolean
}

export default function EditorPanel({ code, onCodeChange, onRun, isRunning }: Props) {
  return (
    <div className="h-full bg-[#1e1e1e] flex flex-col">
      <div className="p-2 border-b border-neutral-700">
        <button onClick={onRun} disabled={isRunning}
          className="px-3 py-1 text-xs bg-green-600 hover:bg-green-500 text-white rounded disabled:opacity-50">
          {isRunning ? 'Running...' : '▶ Run'}
        </button>
      </div>
      <textarea value={code} onChange={e => onCodeChange(e.target.value)}
        className="flex-1 bg-transparent text-neutral-200 text-sm font-mono p-4 resize-none outline-none" />
    </div>
  )
}