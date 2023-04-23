

export const getArgs = (args) => {
  const res = {}

  const [, , ...rest] = args

  rest.forEach((arg, idx, arr) => {
    if (!isArgument(arg)) return

    const nextArg = arr[idx + 1]

    if (nextArg && !isArgument(nextArg)) {
      res[arg.substring(1)] = arr[idx + 1]
      return
    }

    res[arg.substring(1)] = true
  });

  return res;
}


const isArgument = (string) => {
  return string?.startsWith('-') || false
}