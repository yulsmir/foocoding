import { createInterface } from 'node:readline/promises'
import { stdin, stdout } from 'node:process'
import { openSync, readSync, writeSync } from 'node:fs'

/**
 * Ask a asynchronous question to the user and get the answer from stdin
 *
 * @param {string} query
 * @returns {Promise.<string>}
 */
const question = async (query) => {
  const readline = createInterface({
    input: stdin,
    output: stdout,
  })

  const answer = await readline.question(query)
  readline.close()

  return answer
}

/**
 * Ask a synchronous question to the user and get the answer from stdin
 *
 * @param {string} query
 * @returns {string}
 */
const questionSync = (query) => {
  let stdin = openSync('/dev/stdin', 'rs')

  writeSync(process.stdout.fd, query)
  const buffer = Buffer.alloc(1)
  readSync(stdin, buffer, 0, 1, null)
  let answer = ''

  while ((buffer[0] != 10) && (buffer[0] != 13)) {
    answer += buffer

    readSync(stdin, buffer, 0, 1, null)
  }

  return answer
}

const name = await question(`What's your name? `)
const answer = questionSync('What do you think of Node.js? ')

console.log(`Hi ${name}, welcome to the system.`)
console.log(`Thanks for your answer ${name} your answer is: ${answer}`)
