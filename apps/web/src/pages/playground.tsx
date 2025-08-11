import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Play, Settings, Share2, Code, Eye, ChevronDown, FlaskConical } from 'lucide-react'

import LoadingSpinner from '@/components/ui/loading-spinner'

const languages = [
  { name: 'Python', value: 'python' },
  { name: 'JavaScript', value: 'javascript' },
  { name: 'TypeScript', value: 'typescript' },
]

const models = [
  { name: 'GPT-4', value: 'gpt-4' },
  { name: 'GPT-3.5 Turbo', value: 'gpt-3.5-turbo' },
  { name: 'Claude 3 Sonnet', value: 'claude-3-sonnet' },
  { name: 'DALL-E 3', value: 'dall-e-3' },
]

export default function PlaygroundPage() {
  const { t } = useTranslation()
  const [code, setCode] = useState('# Write your code here')
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [view, setView] = useState('split') // split, code, result

  const handleRun = async () => {
    setIsLoading(true)
    setResult('')
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setResult(`Mock Result:\n----------------\nThis is a placeholder for the AI model's output based on your code:\n\n${code}`)
    setIsLoading(false)
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <header className="flex-shrink-0 bg-background border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {t('playground.title')}
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1.5 text-sm font-medium flex items-center space-x-2 border rounded-md hover:bg-accent">
                <Share2 className="w-4 h-4" />
                <span>{t('playground.share')}</span>
              </button>
              
              <button className="px-3 py-1.5 text-sm font-medium flex items-center space-x-2 border rounded-md hover:bg-accent">
                <Settings className="w-4 h-4" />
                <span>{t('playground.settings')}</span>
              </button>
              
              <button 
                onClick={handleRun}
                disabled={isLoading}
                className="px-4 py-1.5 text-sm font-medium flex items-center space-x-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                <span>{isLoading ? t('playground.running') : t('playground.run')}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Editor Panel */}
        <motion.div 
          layout
          className={cn(
            "flex flex-col",
            view === 'split' && "md:w-1/2",
            view === 'code' && "w-full",
            view === 'result' && "hidden md:flex md:w-0"
          )}
        >
          <div className="flex items-center justify-between p-2 border-b bg-muted/30">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 px-2 py-1 border rounded-md text-sm">
                <Code className="w-4 h-4 text-muted-foreground" />
                <select className="bg-transparent focus:outline-none">
                  {languages.map(lang => (
                    <option key={lang.value} value={lang.value}>{lang.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-1 px-2 py-1 border rounded-md text-sm">
                <FlaskConical className="w-4 h-4 text-muted-foreground" />
                <select className="bg-transparent focus:outline-none">
                  {models.map(model => (
                    <option key={model.value} value={model.value}>{model.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex md:hidden items-center space-x-1">
              <button onClick={() => setView('code')} className={cn("p-1.5 rounded-md", view === 'code' && "bg-background shadow-sm")}><Code className="w-4 h-4" /></button>
              <button onClick={() => setView('result')} className={cn("p-1.5 rounded-md", view === 'result' && "bg-background shadow-sm")}><Eye className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="flex-1 bg-[#0d1117] text-white p-4 font-mono text-sm overflow-auto">
            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-transparent resize-none focus:outline-none"
              placeholder="Enter your code or prompt..."
            />
          </div>
        </motion.div>

        {/* Result Panel */}
        <motion.div 
          layout
          className={cn(
            "flex flex-col border-l",
            view === 'split' && "md:w-1/2",
            view === 'result' && "w-full",
            view === 'code' && "hidden md:flex md:w-0"
          )}
        >
          <div className="flex items-center justify-between p-2 border-b bg-muted/30">
            <h3 className="text-sm font-medium">{t('playground.result')}</h3>
          </div>
          <div className="flex-1 p-4 overflow-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <LoadingSpinner />
              </div>
            ) : result ? (
              <pre className="whitespace-pre-wrap text-sm">{result}</pre>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                {t('playground.noResult')}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
