'use client'
import { SubmissionResult } from '@/types'
import { memo } from 'react'

function OutputPanel({ result }: { result: SubmissionResult | null }) {
  const hasTestResults = Array.isArray(result?.testResult) && result.testResult.length > 0
  const overallStatus = hasTestResults
    ? result?.testResult?.every((item) => item.passed)
      ? 'Accepted'
      : 'Wrong Answer'
    : result?.status

  return (
    <div className="h-full bg-[#1e1e1e] text-neutral-200 p-4 text-sm font-mono overflow-y-auto">
      {!result && <p className="text-neutral-500">Run your code to see output.</p>}
      {result && (
        <div>
          <p className={`mb-2 ${overallStatus === 'Accepted' ? 'text-green-400' : overallStatus === 'Running' ? 'text-blue-400' : 'text-yellow-400'}`}>
            Status: {overallStatus}
          </p>
          {result.error && (
            <div className="text-red-400 mb-3 whitespace-pre-wrap">
              Error: {result.error}
            </div>
          )}
          {hasTestResults && (
            <div className="space-y-3">
              {result.testResult?.map((item, index) => (
                <div key={`${item.input}-${index}`} className="rounded-lg border border-neutral-700 bg-[#262626] p-3">
                  <div className={`font-semibold ${item.passed ? 'text-green-400' : 'text-red-400'}`}>
                    {item.passed ? '✓ Correct' : '✗ Wrong'}
                  </div>
                  <div className="mt-2 text-neutral-400">Case {index + 1}</div>
                  <div className="mt-1 text-neutral-500">Input:</div>
                  <pre className="whitespace-pre-wrap break-words text-neutral-300">{item.input}</pre>
                  <div className="mt-2 text-neutral-500">Expected:</div>
                  <pre className="whitespace-pre-wrap break-words text-neutral-300">{item.expected}</pre>
                  <div className="mt-2 text-neutral-500">Actual:</div>
                  <pre className="whitespace-pre-wrap break-words text-neutral-300">{item.actual}</pre>
                </div>
              ))}
            </div>
          )}
          {!hasTestResults && (result.output !== undefined ? (
            result.output ? (
              <div className="whitespace-pre-wrap text-neutral-300">
                {result.output}
              </div>
            ) : (
              <div className="text-neutral-500 italic">
                (No output produced)
              </div>
            )
          ) : null)}
        </div>
      )}
    </div>
  )
}

export default memo(OutputPanel)