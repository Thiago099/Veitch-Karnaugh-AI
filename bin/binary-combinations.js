export function generate_binary_combinations(n) {
    n = Math.floor(n);
    if (n === 0) {
      return [''];
    } else {
      const prev = generate_binary_combinations(n - 1);
      const result = [];
      var reverse = false
      for (const str of prev) {
          if(reverse)
          {
              result.push([...str, 1]);
              result.push([...str, 0]);
          }
          else
          {
            result.push([...str, 0]);
            result.push([...str, 1]);
          }
          reverse = !reverse
      }
      return result;
    }
  }