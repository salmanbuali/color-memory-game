const tiles = document.querySelectorAll('.tile')
const startBtn = document.querySelector('.startBtn')
const correctP = document.querySelector('.correct')
const colors = ['red', '']
const counter = document.querySelector('#counter')
let correctCounter = 0

const generate = () => {
  for (let i = 0; i < tiles.length; i++) {
    let color = Math.random().toFixed(0)
    let correct = 'red'
    tiles[i].style.backgroundColor = `${colors[color]}`
    tiles[i].setAttribute('color', `${colors[color]}`)
    correctP.innerText = correct
  }
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].style.backgroundColor === correctP.innerText) {
      correctCounter++
    }
  }
  startBtn.removeAttribute('hidden')
}

const start = () => {
  // if (correctP.innerText === 'YOU LOST' || correctP.innerText === 'YOU WON') {
  //   return
  // }
  startBtn.disabled = 'true'
  correctCounter = 0
  correctP.setAttribute('hidden', 'true')
  generate()
  let count = 10
  counter.innerText = count
  const timer = setInterval(() => {
    count--
    counter.innerText = count
    if (count === 0) {
      clearInterval(timer)
      tiles.forEach((el) => {
        el.style.backgroundColor = 'grey'
        correctP.removeAttribute('hidden')
        counter.innerHTML = ''
        startBtn.removeAttribute('disabled')
      })
    }
  }, 1000)
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

// refreshBtn.addEventListener('click', refresh)
