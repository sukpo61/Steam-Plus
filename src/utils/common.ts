export const shouldNotForwardProp = (...args: string[]) => ({
  shouldForwardProp: (propName: string) => !args.includes(propName),
});
