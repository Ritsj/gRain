// functions for rolling dice/stats
export function statRoller (method) {
  // should have switch for different ways of rolling stats
  // & default for normal rolls
  let result = [];
  switch (method) {
    // roll 4d6, drop 1, add sums * 6
    case '4drop1':
      for (let x = 0; x < 6; x++) {
        let curRes = diceRoller(4, 6);
        // find lowest value, find position of lowest value, remove lowest value
        curRes.splice(curRes.indexOf(Math.min(...curRes)), 1);
        // add roles
        let sumRes = curRes.reduce((pre, cur) => pre + cur);
        result.push(sumRes);
      }
      break;
    case '6d20':
      let curRes = diceRoller(6, 20);
      curRes.map(item => result.push(item));
      break;
  }
  return result;
}

export function diceRoller (amount, dieValue) {
  let result = [];
  for (let x = 0; x < amount; x++) {
    let curRes = Math.floor(Math.random() * dieValue) + 1;
    result.push(curRes);
  }
  return result;
}
