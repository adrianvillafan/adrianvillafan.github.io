import React, { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { soundFX } from '@/utils/soundEffects'
import { FiPlay, FiRefreshCw, FiCheckCircle, FiCpu, FiDatabase, FiClock } from 'react-icons/fi'

interface CodeRunnerSimulationProps {
  isEnglish?: boolean
}

export const CodeRunnerSimulation: React.FC<CodeRunnerSimulationProps> = React.memo(
  ({ isEnglish = false }) => {
    const [isRunning, setIsRunning] = useState(false)
    const [hasRun, setHasRun] = useState(false)
    const [activeStep, setActiveStep] = useState(0)
    const timerRef = useRef<number | null>(null)

    const codeSnippet = `from unmsm_engine import DataPipeline, OCRValidator

async def execute_etl_stream(records: int = 50_000):
    """Pipeline ETL distribuido & validación OCR de comprobantes."""
    pipeline = DataPipeline(workers=8, mode="parallel_async")
    
    # 1. Ingesta masiva & binarización adaptativa OpenCV
    stream = await pipeline.read_stream("bank_transactions", batch_size=2000)
    
    # 2. Extracción OCR (Tesseract) & validación con Pandas
    verified = OCRValidator.process_batch(stream, threshold=0.98)
    
    # 3. Almacenamiento optimizado en PostgreSQL & Redis Cache
    return await pipeline.commit_results(verified)`

    const steps = isEnglish
      ? [
          'Connecting to distributed worker cluster & Redis cache...',
          'Streaming 50,000 transaction records into memory...',
          'Applying OpenCV adaptive binarization & Tesseract OCR...',
          'Batch committing to PostgreSQL engine with zero loss.',
        ]
      : [
          'Conectando al cluster distribuido de workers & Redis caché...',
          'Ingesta masiva de 50,000 registros en streaming a memoria...',
          'Pre-procesamiento OpenCV (binarización) & extracción OCR...',
          'Inserción por lotes optimizada en PostgreSQL con cero pérdidas.',
        ]

    const runSimulation = useCallback(() => {
      if (isRunning) return
      setIsRunning(true)
      setHasRun(false)
      setActiveStep(0)
      soundFX.playClick()

      let current = 0
      if (timerRef.current) clearInterval(timerRef.current)

      timerRef.current = window.setInterval(() => {
        current += 1
        setActiveStep(current)

        if (current >= steps.length) {
          if (timerRef.current) clearInterval(timerRef.current)
          setIsRunning(false)
          setHasRun(true)
          soundFX.playSuccess()
        }
      }, 450)
    }, [isRunning, steps.length])

    return (
      <div
        style={{
          borderRadius: '16px',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-card)',
          overflow: 'hidden',
          fontFamily: 'Consolas, Monaco, "Courier New", monospace',
        }}
      >
        {/* Terminal Window Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1.25rem',
            background: 'var(--pill-bg)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#f87171', display: 'inline-block' }} />
            <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#fbbf24', display: 'inline-block' }} />
            <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
              etl_pipeline_unmsm.py
            </span>
          </div>

          <button
            onClick={runSimulation}
            disabled={isRunning}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.78rem',
              fontWeight: 600,
              background: isRunning ? 'rgba(99, 102, 241, 0.2)' : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              color: '#ffffff',
              border: '1px solid var(--accent-light)',
              cursor: isRunning ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isRunning ? 'none' : '0 0 15px rgba(99, 102, 241, 0.4)',
            }}
          >
            {isRunning ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                  <FiRefreshCw size={12} />
                </motion.div>
                <span>{isEnglish ? 'Executing...' : 'Ejecutando...'}</span>
              </>
            ) : (
              <>
                <FiPlay size={12} />
                <span>{isEnglish ? 'Run Pipeline' : '▶ Ejecutar Pipeline'}</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content Area */}
        <div
          style={{
            padding: '1.25rem',
            fontSize: '0.82rem',
            lineHeight: 1.6,
            background: 'rgba(0, 0, 0, 0.35)',
            color: 'var(--text-secondary)',
            overflowX: 'auto',
          }}
        >
          <pre style={{ margin: 0, fontFamily: 'inherit' }}>
            <code>{codeSnippet}</code>
          </pre>
        </div>

        {/* Live Execution Output Log */}
        <AnimatePresence>
          {(isRunning || hasRun) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                padding: '1.25rem',
                borderTop: '1px solid var(--border-subtle)',
                background: 'rgba(0, 0, 0, 0.55)',
                fontSize: '0.8rem',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1rem' }}>
                {steps.slice(0, activeStep).map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: idx === steps.length - 1 && hasRun ? '#34d399' : '#38bdf8',
                    }}
                  >
                    <span>[{((idx + 1) * 0.012).toFixed(3)}s]</span>
                    <span>{step}</span>
                    <FiCheckCircle size={13} color="#34d399" />
                  </motion.div>
                ))}
              </div>

              {/* Metrics Benchmark Panel */}
              {hasRun && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                    gap: '0.75rem',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    background: 'rgba(99, 102, 241, 0.08)',
                    border: '1px solid rgba(99, 102, 241, 0.25)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <FiClock size={16} color="var(--accent-light)" />
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{isEnglish ? 'Latency' : 'Latencia'}</div>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>45.2 ms</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <FiDatabase size={16} color="#38bdf8" />
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{isEnglish ? 'Throughput' : 'Rendimiento'}</div>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>1.1M ops/sec</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <FiCpu size={16} color="#34d399" />
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{isEnglish ? 'OCR Accuracy' : 'Precisión OCR'}</div>
                      <div style={{ fontWeight: 700, color: '#34d399' }}>99.6%</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

CodeRunnerSimulation.displayName = 'CodeRunnerSimulation'
