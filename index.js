const tiles = document.querySelectorAll('.tile')
const startBtn = document.querySelector('.startBtn')
const correctP = document.querySelector('.correct')
const colors = ['aqua', 'red', 'green']
const refreshBtn = document.querySelector('#reset')
let correctCounter = 0

const generate = () => {
  for (let i = 0; i < tiles.length; i++) {
    let color = (Math.random() * 2).toFixed(0)
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
  }
}

const refresh = () => {
  correctCounter = 0
  correctP.setAttribute('hidden', 'true')
  generate()
}

generate()

startBtn.addEventListener('click', start)

tiles.forEach((el) => {
  el.addEventListener('click', () => {
    if (
      correctP.innerText === 'YOU LOST' ||
      correctP.innerText === 'YOU WON' ||
      correctP.getAttribute('hidden') === 'true'
    ) {
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
    } else {
      el.style.backgroundColor = `${tileColor}`
      reduceCounter()
      checkWin()
    }
  })
})

refreshBtn.addEventListener('click', refresh)
