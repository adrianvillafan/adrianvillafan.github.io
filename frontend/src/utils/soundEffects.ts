// Audio sintético ultra-liviano mediante Web Audio API (cero dependencias externas)
class SoundEffectsManager {
  private ctx: AudioContext | null = null
  private enabled: boolean = false

  constructor() {
    // Cargar preferencia guardada
    if (typeof window !== 'undefined') {
      this.enabled = localStorage.getItem('adrian_portfolio_sfx') === 'true'
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  public toggle(): boolean {
    this.enabled = !this.enabled
    if (typeof window !== 'undefined') {
      localStorage.setItem('adrian_portfolio_sfx', String(this.enabled))
    }
    if (this.enabled) {
      this.initCtx()
      this.playBeep(520, 0.08, 'sine', 0.12)
    }
    return this.enabled
  }

  // Sonido de clic sutil y mecánico (para botones, atajos, pestañas)
  public playClick() {
    if (!this.enabled) return
    this.initCtx()
    if (!this.ctx) return

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    const now = this.ctx.currentTime

    osc.type = 'sine'
    osc.frequency.setValueAtTime(650, now)
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.04)

    gain.gain.setValueAtTime(0.08, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start(now)
    osc.stop(now + 0.04)
  }

  // Sonido de apertura o cambio de estado (ej: abrir terminal, cambio de tema)
  public playPop() {
    if (!this.enabled) return
    this.initCtx()
    if (!this.ctx) return

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    const now = this.ctx.currentTime

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(440, now)
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.07)

    gain.gain.setValueAtTime(0.09, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start(now)
    osc.stop(now + 0.07)
  }

  // Sonido de éxito al ejecutar simulador o copiar
  public playSuccess() {
    if (!this.enabled) return
    this.initCtx()
    if (!this.ctx) return

    const now = this.ctx.currentTime
    const notes = [523.25, 659.25, 783.99] // C5, E5, G5

    notes.forEach((freq, idx) => {
      if (!this.ctx) return
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const time = now + idx * 0.05

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, time)

      gain.gain.setValueAtTime(0.07, time)
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(time)
      osc.stop(time + 0.12)
    })
  }

  private playBeep(freq: number, duration: number, type: OscillatorType, vol: number) {
    if (!this.ctx) return
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    const now = this.ctx.currentTime

    osc.type = type
    osc.frequency.setValueAtTime(freq, now)

    gain.gain.setValueAtTime(vol, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start(now)
    osc.stop(now + duration)
  }
}

export const soundFX = new SoundEffectsManager()
