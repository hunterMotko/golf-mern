// (113 / Slope Rating) x (Adjusted Gross Score - Course Rating - PCC adjustment)

const handicap = (ags, courseRat, slope) => {
  return ((ags - courseRat)*113) / slope
}

// console.log(handicap(81, 61, 119));

export const scoreDifferncial = (ags, courseRat, slope) => {
  return ((ags - courseRat)*113) / slope
}

export const avg = (...args) => (args.reduce((a, b)=>a+b,0) / args.length) * 0.96

// ((Adjusted Gross Score - Course Rating) x 113) / Slope Rating = Score Differential.
// Average the lowest score differentials according the USGA Chart
// Multiple this Average by 96% or .96 to find your Handicap.
// course rating -
// slope rating - 55 - 155 113 ia standard
// adjusted gross score -
// (118 - 67.8 * 113) / 119
// 47.6
// At least 5 they check the lowest
// if 10 they look at the 3 lowest ratings
// if 20 they look at the 10 lowest
// add the differencials