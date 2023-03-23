import bridge from '@vkontakte/vk-bridge'
import { createRoot } from 'react-dom/client'
import App from './App'
import './assets/style/override.css'

// Init VK  Mini App
bridge.send('VKWebAppInit')

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<App />)

if (process.env.NODE_ENV === 'development') {
  import('./shared/extlibs/eruda').then(({ default: eruda }) => {}) //runtime download
}
