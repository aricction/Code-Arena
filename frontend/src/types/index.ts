
export type Language = 'javascript' | 'typescript' | 'python' | 'cpp' | 'java'
export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export type VerdictStatus = 
| 'Accepted'
| 'Wrong Answer'
| 'Time Limit Exceeded'
| 'Runtime Error'
| 'Compilation Error'
| 'Runtime Error'
| 'Pending'
| 'Running'


export interface TestCase {
    input: string
    expectedOutput: string
}

export interface Problem {
    id: string
    title: string
    difficulty: Difficulty
    description: string
    examples: { input: string; output: string; explanation?: string}[]
    testCases: TestCase[]
    starterCode: Record<Language, string>
}

export interface SubmissionResult {
    status: VerdictStatus
    output?: string
    error?: string
    executionTime?: string
    memoryUsed?: string
    testResult?: {
        passed: boolean
        input: string
        expected: string
        actual: string
    }[]
}

export interface Message {
    role: 'user' | 'assistant'
    content: string
}