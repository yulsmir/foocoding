import { parseArgs } from 'node:util'

const options = {
  'color': { type: 'boolean', short: 'C' },
  'no-color': { type: 'boolean' },
  'logfile': { type: 'string', default: 'default-logfile.txt' },
  'no-logfile': { type: 'boolean' },
}
const { values, tokens } = parseArgs({
  options,
  tokens: true,
  strict: false
})

Object.entries(values).forEach(([param, value]) => {
  switch (param) {
    case 'color':
      console.log(`The value for param 'color' is ${value}`)

      break

    case 'logfile':
      console.log(`The value for param 'logfile' is ${value}`)

      break

    default:
      console.log(`Parameter '${param}' is unknown, try node.js cli --help`)

      break
  }
})

// console.log(values)
// console.log(tokens)