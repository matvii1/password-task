export function getStrength(query) {
  const inputQuery = query.trim();
  let stringCounter = 0;
  let digitCounter = 0;
  let symbolCounter = 0;

  for (let i = 0; i < inputQuery.length; i++) {
    const ch = inputQuery[i];
    
    if ('!@#$%^&*()_+-=/.,~`][{}|'.includes(ch)) {
      if (symbolCounter === 1) {
        continue;
      }

      symbolCounter++;
      continue;
    }

    if (isNaN(ch)) {
      if (stringCounter === 1) {
        continue;
      }

      stringCounter += 1;  
      continue;
    }
    

    if (!isNaN(ch)) {
      if (digitCounter === 1) {
        continue;
      }

      digitCounter++;
      continue;
    }
  }

  const sum = stringCounter + digitCounter + symbolCounter;

  if (sum === 0) {
    return 'empty';
  }

  if (sum === 1) {
    return 'easy';
  }

  if (sum === 2) {
    return 'medium';
  }

  if (sum === 3) {
    return 'strong'
  }
}
