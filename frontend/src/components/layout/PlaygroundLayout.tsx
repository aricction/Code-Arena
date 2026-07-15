'use client'

import * as FlexLayout from 'flexlayout-react'
import { useCallback, useState, useRef } from 'react'
import { AssistantPanel, EditorPanel, OutputPanel, ProblemPanel } from '@/components/panels'
import type { Language, Problem, SubmissionResult } from '@/types'
import defaultModel from './defaultLayout'

type Props = {
  problem: Problem
  layout?: FlexLayout.IJsonModel
  setLayout?: (layout: FlexLayout.IJsonModel) => void
}

export default function PlaygroundLayout({ problem, layout, setLayout }: Props) {
  const modelRef = useRef<FlexLayout.Model | null>(null)
  const [language, setLanguage] = useState<Language>('typescript')
  const [code, setCode] = useState(() => problem.starterCode[language] ?? '')
  const [result, setResult] = useState<SubmissionResult | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  // Initialize model once
  if (!modelRef.current) {
    modelRef.current = FlexLayout.Model.fromJson(layout ?? defaultModel)
  }

  const model = modelRef.current

  const onLanguageChange = useCallback(
    (l: Language) => {
      setLanguage(l)
      setCode(problem.starterCode[l] ?? '')
    },
    [problem.starterCode],
  )

  const onRun = useCallback(() => {
    // Execute code via backend
    const executeCode = async () => {
      setIsRunning(true)
      setResult({ status: 'Running' })
      
      try {
        const apiUrl = process.env.NEXT_PUBLIC_ASSISTANT_API_URL
        if (!apiUrl) {
          throw new Error('API URL not configured')
        }
        
        const response = await fetch(
          `${apiUrl}/execute/run`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              code,
              language,
              testCases: problem.testCases,
              harness: problem.executionHarness?.[language],
            }),
          }
        )
        
        let result
        try {
          result = await response.json()
        } catch (parseError) {
          // If response can't be parsed as JSON, show raw text
          const text = await response.text()
          throw new Error(`Invalid response: ${text}`)
        }
        
        if (!response.ok) {
          setResult({
            status: result?.status || 'Runtime Error',
            error: result?.error || 'Request failed',
            output: result?.output || undefined,
          })
          return
        }
        
        setResult(result)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        console.error('Execution error:', errorMessage)
        setResult({
          status: 'Runtime Error',
          error: errorMessage,
        })
      } finally {
        setIsRunning(false)
      }
    }
    
    executeCode()
  }, [code, language])

  // Memoize factory to prevent unnecessary panel re-renders on state changes
  const factory = useCallback(
    (node: FlexLayout.TabNode) => {
      const component = node.getComponent()

      if (component === 'problem') return <ProblemPanel problem={problem} />
      if (component === 'editor')
        return (
          <EditorPanel
            code={code}
            language={language}
            onCodeChange={setCode}
            onLanguageChange={onLanguageChange}
            onRun={onRun}
            isRunning={isRunning}
          />
        )
      if (component === 'output') return <OutputPanel result={result} />
      if (component === 'assistant') return <AssistantPanel problem={problem} code={code} language={language}/>

      return null
    },
    [code, isRunning, language, onLanguageChange, onRun, problem, result],
  )

  // Stable onModelChange callback
  const onModelChange = useCallback(() => {
    if (!setLayout || !modelRef.current) return
    setLayout(modelRef.current.toJson())
  }, [setLayout])

  return (
    <div className="h-full w-full min-h-0 overflow-hidden">
      <FlexLayout.Layout
        model={model}
        factory={factory}
        onModelChange={onModelChange}
      />
    </div>
  )
}