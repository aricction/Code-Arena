'use client'

import * as FlexLayout from 'flexlayout-react'
import { useCallback, useState } from 'react'
import { AssistantPanel, EditorPanel, OutputPanel, ProblemPanel } from '@/components/panels'
import type { Language, Problem, SubmissionResult } from '@/types'
import defaultModel from './defaultLayout'

type Props = {
  problem: Problem
  layout?: FlexLayout.IJsonModel
  setLayout?: (layout: FlexLayout.IJsonModel) => void
}

export default function PlaygroundLayout({ problem, layout, setLayout }: Props) {
  const model = FlexLayout.Model.fromJson(layout ?? defaultModel)

  const [language, setLanguage] = useState<Language>('typescript')
  const [code, setCode] = useState(() => problem.starterCode[language] ?? '')
  const [result, setResult] = useState<SubmissionResult | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const onLanguageChange = useCallback(
    (l: Language) => {
      setLanguage(l)
      setCode(problem.starterCode[l] ?? '')
    },
    [problem.starterCode],
  )

  const onRun = useCallback(() => {
    // Placeholder runner until execution backend is wired.
    setIsRunning(true)
    setResult({ status: 'Pending' })
    setTimeout(() => {
      setResult({ status: 'Accepted', output: 'Runner not implemented yet.' })
      setIsRunning(false)
    }, 300)
  }, [])

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
      if (component === 'assistant') return <AssistantPanel problem={problem} code={code} />

      return null
    },
    [code, isRunning, language, onLanguageChange, onRun, problem, result],
  )

  const onModelChange = useCallback(() => {
    if (!setLayout) return
    setLayout(model.toJson())
  }, [model, setLayout])

  return <FlexLayout.Layout model={model} factory={factory} onModelChange={onModelChange} />
}