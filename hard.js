const tiles = document.querySelectorAll('.tile')
const startBtn = document.querySelector('.startBtn')
const correctP = document.querySelector('.correct')
const colors = ['red', 'green', 'blue', 'yellow', 'teal']
const refreshBtn = document.querySelector('#reset')
const generateBtn = document.querySelector('.generateBtn')
let correctCounter = 0

const generate = () => {
  for (let i = 0; i < tiles.length; i++) {
    let color = (Math.random() * 4).toFixed(0)
    let correct = (Math.random() * 15).toFixed(0)
    tiles[i].style.backgroundColor = `${colors[color]}`
    tiles[i].setAttribute('color', `${colors[color]}`)
    correctP.innerText = `${tiles[correct].style.backgroundColor}`
  }
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].style.backgroundColor === correctP.innerText) {
      correctCounter++
    }
  }
  startBtn.removeAttribute('hidden')
  generateBtn.setAttribute('hidden', 'true')
}

const start = () => {
  if (correctP.innerText === 'YOU LOST' || correctP.innerText === 'YOU WON') {
    return
  }
  tiles.forEach((el) => {
    el.style.backgroundColor = 'grey'
    correctP.removeAttribute('hidden')
  })
}

const reduceCounter = () => {
  if (correctCounter != 0) {
    correctCounter--
    console.log(correctCounter)
  }
}

const checkWin = () => {
  if (correctCounter === 0) {
    correctP.innerText = 'YOU WON'
    refreshBtn.removeAttribute('hidden')
  }
}

const refresh = () => {
  correctCounter = 0
  correctP.setAttribute('hidden', 'true')
  generate()
}
generateBtn.addEventListener('click', generate)

startBtn.addEventListener('click', start)

tiles.forEach((el) => {
  el.addEventListener('click', () => {
    if (correctP.innerText === 'YOU LOST' || correctP.innerText === 'YOU WON') {
      return
    }
    let tileColor = el.getAttribute('color')
    if (tileColor != correctP.innerText) {
      el.style.backgroundColor = `${tileColor}`

      for (i = 0; i < tiles.length; i++) {
        if (tiles[i].getAttribute('color') === correctP.innerText) {
          tiles[i].style.backgroundColor = `${tiles[i].getAttribute('color')}`
        }
      }
      correctP.innerText = 'YOU LOST'
      generateBtn.removeAttribute('hidden')
    } else {
      el.style.backgroundColor = `${tileColor}`
      reduceCounter()
      checkWin()
    }
  })
})

refreshBtn.addEventListener('click', refresh)
