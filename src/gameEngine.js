export function generatePattern(size) {
    let winPattern = Array(size**2).fill(false);
    for (let i = 0; i < size**2; i++) {
        winPattern[i] = (Math.random() < 0.5 ? true : false);
    }
    return winPattern;
}

export function checkWin(lightSatus, winningPattern) {
  for (let i = 0; i < winningPattern.length; i++) {
    if(lightSatus[i] !== winningPattern[i]) {
      return false;
    }
  }
  return true;
}

export function startTimer(reactComp) {
  if (reactComp.state.timer === 0) {
    reactComp.state.timer = setInterval(countSec.bind(this, reactComp), 1000);
  }
}

export function stopTimer(reactComp) {
  clearInterval(reactComp.state.timer);
}

export function countSec(reactComp){
  let seconds = reactComp.state.seconds + 1;
  reactComp.setState({
    seconds: seconds
  })
}