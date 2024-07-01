import express from 'express'
import cors from 'cors'
import config from './app/config'
const app = express()
const port = 3000

// parsers 
app.use(express.json())
app.use(cors())




app.get('/', (req, res) => {
  res.send('Hello World!')
})

console.log('app is run')

export default app 