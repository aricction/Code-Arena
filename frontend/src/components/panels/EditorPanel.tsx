'use client'
import { Language } from '@/types'
import { memo } from 'react'
import {Editor} from '@monaco-editor/react';
interface Props {
  code: string
  language: Language
  onCodeChange: (v: string) => void
  onLanguageChange: (l: Language) => void
  onRun: () => void
  isRunning: boolean
}

function EditorPanel({ code, language, onCodeChange, onLanguageChange, onRun, isRunning }: Props) {
  return (
    <div className="h-full bg-[#1e1e1e] flex flex-col">
      <div className="p-2 border-b border-neutral-700">
        <select className='text-white text-sm bg-gray-800'  value={language} onChange={e => onLanguageChange(e.target.value as Language)}>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>
        <button onClick={onRun} disabled={isRunning}
          className="ml-12 px-3 py-1 text-xs bg-green-600 hover:bg-green-500 text-white rounded disabled:opacity-50">
          {isRunning ? 'Running...' : '▶ Run'}
        </button>
      </div>
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={(value) => onCodeChange(value ?? '')}
        theme="vs-dark"
        options={{
            fontFamily: "Fira Code",

          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  )
}

export default memo(EditorPanel)