type LogLevel = 'success' | 'error' | 'info' | 'warning';

interface LogMessage {
    id: number;
    text: string;
    type: LogLevel;
}

class UserLogger {
    private logs: LogMessage[] = []
    private nextId = 0
    private container: HTMLDivElement

    constructor() {
        // Створюємо контейнер для сповіщень у кутку екрана
        this.container = document.createElement('div')
        this.container.id = 'user-logs-container'
        this.container.style.cssText = `
      position: fixed;
      top: 300px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `
        document.body.appendChild(this.container)
    }

    show(text: string, type: LogLevel = 'info', duration = 7000) {
        const id = this.nextId++
        const log: LogMessage = { id, text, type }
        this.logs.push(log)

        this.render(log, duration)
    }

    private render(log: LogMessage, duration: number) {
        const el = document.createElement('div')
        el.className = `toast toast-${log.type}`
        el.innerText = log.text

        // Стилізація через JS (можна винести в CSS)
        el.style.cssText = `
      padding: 12px 20px;
      border-radius: 8px;
      color: white;
      font-family: sans-serif;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      background: ${this.getColor(log.type)};
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `

        this.container.appendChild(el)

        // Анімація появи
        setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = 'translateX(0)'
        }, 10)

        // Анімація зникнення
        setTimeout(() => {
            el.style.opacity = '0'
            el.style.transform = 'translateX(100%)'
            setTimeout(() => el.remove(), 7000)
            this.logs = this.logs.filter(l => l.id !== log.id)
        }, duration)
    }

    private getColor(type: LogLevel): string {
        const colors = {
            success: '#2ecc71',
            error: '#e74c3c',
            info: '#3498db',
            warning: '#f1c40f'
        }
        return colors[type]
    }
}

export const userLogger = new UserLogger()