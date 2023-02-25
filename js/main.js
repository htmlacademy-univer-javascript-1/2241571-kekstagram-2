function getRandomNumber(from, to){
  if (from < 0 || to < 0){
      return 'Введите положительные числа.';
  }

  if (typeof from !== 'number' || typeof to !== 'number'){
      return 'Введите числа.';
  }

  if (from === to){
      return from;
  }

  if (from > to){
      [from, to] = [to, from];
  }

  return Math.round(Math.random() * (to - from) + from);
}

function lineMaxLength(line, maxLength){
  return (line.length < maxLength) ? true : false;
}
