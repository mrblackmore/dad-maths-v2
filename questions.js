// Dad Maths question and lesson content.
// Keep this file focused on content so new topics can be added without editing the app logic.
const dadMathsTopics = [
  {
    id: "number-place-value-rounding",
    name: "Number, Place Value & Rounding",
    icon: "1",
    accent: "#0b7d2b",
    imagePath: "assets/number-place-value-rounding.png",
    progress: 0,
    isReady: true,
    lesson: {
      title: "Rounding Numbers",
      text: "Rounding makes numbers simpler while keeping their value close. Look at the digit to the right of the place value, then decide whether to round up or down.",
      example: "Round 347 to the nearest 100\n\nLook at the tens digit: 4\n4 is less than 5, so round down.\n\n347 rounds to 300."
    },
    questions: [
      { id: 1, question: "Round 46 to the nearest 10", answer: 50, level: "bronze", hint: "46 is between 40 and 50.", explanation: "The ones digit is 6, so we round up to 50." },
      { id: 2, question: "Round 73 to the nearest 10", answer: 70, level: "bronze", hint: "Look at the ones digit.", explanation: "The ones digit is 3, so 73 rounds down to 70." },
      { id: 3, question: "Round 245 to the nearest 100", answer: 200, level: "silver", hint: "Look at the tens digit.", explanation: "The tens digit is 4, so 245 rounds down to 200." },
      { id: 4, question: "Round 672 to the nearest 100", answer: 700, level: "silver", hint: "672 is between 600 and 700.", explanation: "672 is closer to 700 than 600." },
      { id: 5, question: "Round 3,467 to the nearest 1,000", answer: 3000, level: "gold", hint: "Look at the hundreds digit.", explanation: "The hundreds digit is 4, so 3,467 rounds down to 3,000." },
      { id: 6, question: "Round 6,781 to the nearest 1,000", answer: 7000, level: "gold", hint: "Look at the hundreds digit.", explanation: "The hundreds digit is 7, so 6,781 rounds up to 7,000." }
    ]
  },
  {
    id: "addition-subtraction",
    name: "Addition & Subtraction",
    icon: "+",
    accent: "#6d2b8a",
    imagePath: "assets/addition-subtraction-calculations.png",
    progress: 0,
    isReady: true,
    lesson: {
      title: "Column Addition and Subtraction",
      text: "Column methods help you line up place values. Add or subtract from the right, and regroup when you need to exchange tens or hundreds.",
      example: "346 + 278\n\nOnes: 6 + 8 = 14, write 4 and carry 1\nTens: 4 + 7 + 1 = 12, write 2 and carry 1\nHundreds: 3 + 2 + 1 = 6\n\nAnswer: 624"
    },
    questions: [
      { id: 1, question: "45 + 23", answer: 68, level: "bronze", hint: "Add the tens first, then the ones.", explanation: "40 + 20 = 60, then 5 + 3 = 8. 60 + 8 = 68." },
      { id: 2, question: "67 - 21", answer: 46, level: "bronze", hint: "Take away the tens, then take away the ones.", explanation: "67 - 20 = 47, then 47 - 1 = 46." },
      { id: 3, question: "80 + 15", answer: 95, level: "bronze", hint: "80 plus 10 gets you close.", explanation: "80 + 10 = 90, then add 5 more to make 95." },
      { id: 4, question: "346 + 278", answer: 624, level: "silver", hint: "Use column addition and remember to carry.", explanation: "6 + 8 = 14, carry 1. 4 + 7 + 1 = 12, carry 1. 3 + 2 + 1 = 6. The answer is 624." },
      { id: 5, question: "512 - 189", answer: 323, level: "silver", hint: "Try counting up from 189 to 512.", explanation: "189 to 200 is 11, 200 to 500 is 300, and 500 to 512 is 12. 11 + 300 + 12 = 323." },
      { id: 6, question: "Lauren has £20 and spends £7.50. How much is left?", answer: 12.5, level: "gold", hint: "Think of £20.00 - £7.50.", explanation: "£20.00 - £7.00 = £13.00, then take away 50p to get £12.50." },
      { id: 7, question: "245 + 378 - 129", answer: 494, level: "gold", hint: "Do it in two calm steps.", explanation: "245 + 378 = 623. Then 623 - 129 = 494." }
    ]
  },
  {
    id: "multiplication-division",
    name: "Multiplication & Division",
    icon: "×",
    accent: "#f05a1a",
    imagePath: "assets/multiplication-division.png",
    progress: 0,
    isReady: true,
    lesson: {
      title: "Times Tables and Division Facts",
      text: "Multiplication is equal groups. Division shares a number into equal groups. Knowing related facts helps you move between them confidently.",
      example: "8 x 9 = 72\n\nThis means 8 groups of 9 make 72.\nSo the related division fact is 72 ÷ 8 = 9."
    },
    questions: [
      { id: 1, question: "3 x 8", answer: 24, level: "bronze", hint: "Think 3 groups of 8.", explanation: "8 + 8 + 8 = 24." },
      { id: 2, question: "42 ÷ 7", answer: 6, level: "bronze", hint: "Which 7 times table fact makes 42?", explanation: "7 x 6 = 42, so 42 ÷ 7 = 6." },
      { id: 3, question: "8 x 12", answer: 96, level: "silver", hint: "8 x 10 plus 8 x 2.", explanation: "8 x 10 = 80 and 8 x 2 = 16. 80 + 16 = 96." },
      { id: 4, question: "81 ÷ 9", answer: 9, level: "silver", hint: "Think of the 9 times table.", explanation: "9 x 9 = 81, so 81 ÷ 9 = 9." },
      { id: 5, question: "6 x 7 + 18", answer: 60, level: "gold", hint: "Multiply first, then add.", explanation: "6 x 7 = 42. 42 + 18 = 60." },
      { id: 6, question: "72 ÷ 8 + 15", answer: 24, level: "gold", hint: "Divide first, then add.", explanation: "72 ÷ 8 = 9. 9 + 15 = 24." }
    ]
  },
  {
    id: "fractions",
    name: "Fractions",
    icon: "½",
    accent: "#e3a600",
    imagePath: "assets/fractions.png",
    progress: 0,
    isReady: true,
    lesson: {
      title: "Fractions of Amounts",
      text: "A fraction shows equal parts of a whole or a set. To find a fraction of an amount, divide by the denominator, then multiply by the numerator.",
      example: "Find 3/4 of 80\n\n80 ÷ 4 = 20\n20 x 3 = 60\n\nSo 3/4 of 80 = 60."
    },
    questions: [
      { id: 1, question: "1/2 of 24", answer: 12, level: "bronze", hint: "Half means divide by 2.", explanation: "24 ÷ 2 = 12." },
      { id: 2, question: "1/4 of 28", answer: 7, level: "bronze", hint: "Quarter means divide by 4.", explanation: "28 ÷ 4 = 7." },
      { id: 3, question: "3/4 of 60", answer: 45, level: "silver", hint: "Divide by 4, then multiply by 3.", explanation: "60 ÷ 4 = 15. 15 x 3 = 45." },
      { id: 4, question: "3/5 of 75", answer: 45, level: "silver", hint: "Divide by 5, then multiply by 3.", explanation: "75 ÷ 5 = 15. 15 x 3 = 45." },
      { id: 5, question: "Sarah has 48 sweets. She gives away 1/2, then 1/4 of the rest. How many did she give away in total?", answer: 30, level: "gold", hint: "Find half first, then a quarter of what is left.", explanation: "Half of 48 is 24, leaving 24. A quarter of 24 is 6. 24 + 6 = 30." },
      { id: 6, question: "2 + 1/3 + 2/3", answer: 3, level: "gold", hint: "The fractions make one whole.", explanation: "1/3 + 2/3 = 3/3 = 1. 2 + 1 = 3." }
    ]
  },
  {
    id: "measurement-time",
    name: "Measurement & Time",
    icon: "⏱",
    accent: "#0b62c4",
    imagePath: "assets/measurement-time.png",
    progress: 0,
    isReady: true,
    lesson: {
      title: "Measurement and Time",
      text: "Use the right units and convert when you need to. For time problems, count on in sensible steps: minutes first, then hours.",
      example: "From 09:15 to 11:45\n\n09:15 to 10:45 = 1 hour 30 minutes\n10:45 to 11:45 = 1 hour\n\nTotal = 2 hours 30 minutes."
    },
    questions: [
      { id: 1, question: "120 seconds = how many minutes?", answer: 2, level: "bronze", hint: "60 seconds make 1 minute.", explanation: "120 ÷ 60 = 2 minutes." },
      { id: 2, question: "3 hours = how many minutes?", answer: 180, level: "bronze", hint: "Each hour has 60 minutes.", explanation: "3 x 60 = 180 minutes." },
      { id: 3, question: "3 m 25 cm + 2 m 89 cm = how many cm?", answer: 614, level: "silver", hint: "Change both measurements into centimetres first.", explanation: "325 cm + 289 cm = 614 cm." },
      { id: 4, question: "1 m 67 cm + 3 m 48 cm = how many cm?", answer: 515, level: "silver", hint: "100 cm equals 1 metre.", explanation: "167 cm + 348 cm = 515 cm." },
      { id: 5, question: "A bus leaves at 09:15 and arrives at 11:45. How many minutes is the journey?", answer: 150, level: "gold", hint: "2 hours 30 minutes is how many minutes?", explanation: "2 hours is 120 minutes. 120 + 30 = 150 minutes." },
      { id: 6, question: "School starts at 08:45 and lunch is at 12:30. How many minutes between them?", answer: 225, level: "gold", hint: "Count to 11:45, then to 12:30.", explanation: "08:45 to 11:45 is 180 minutes, then 45 more minutes makes 225 minutes." }
    ]
  },
  {
    id: "geometry-measure-perimeter",
    name: "Geometry & Measure: Perimeter",
    icon: "▭",
    accent: "#0f8a3a",
    imagePath: "assets/geometry-measure-perimeter.png",
    progress: 0,
    isReady: true,
    lesson: {
      title: "All About Perimeter",
      text: "Perimeter is the total distance around the outside of a shape. Add all the side lengths and remember to include the units.",
      example: "Rectangle: length 12 cm, width 7 cm\n\nPerimeter = 12 + 7 + 12 + 7\nPerimeter = 38 cm."
    },
    questions: [
      { id: 1, question: "A rectangle is 8 cm long and 5 cm wide. What is the perimeter?", answer: 26, level: "bronze", hint: "Add all four sides.", explanation: "8 + 5 + 8 + 5 = 26 cm." },
      { id: 2, question: "A square has sides of 4 cm. What is the perimeter?", answer: 16, level: "bronze", hint: "A square has 4 equal sides.", explanation: "4 + 4 + 4 + 4 = 16 cm." },
      { id: 3, question: "A rectangle has perimeter 34 cm and length 12 cm. What is the width?", answer: 5, level: "silver", hint: "Two lengths make 24 cm.", explanation: "34 - 24 = 10. The two widths share 10 cm, so each width is 5 cm." },
      { id: 4, question: "A rectangle has perimeter 50 m and length 20 m. What is the width?", answer: 5, level: "silver", hint: "Subtract the two lengths first.", explanation: "20 + 20 = 40. 50 - 40 = 10. Each width is 5 m." },
      { id: 5, question: "A rectangular garden is 15 m long and 9 m wide. What is the perimeter?", answer: 48, level: "gold", hint: "Use 2 x (length + width).", explanation: "15 + 9 = 24. 24 x 2 = 48 m." },
      { id: 6, question: "A picture frame is 8 cm long and 6 cm wide. What is the perimeter?", answer: 28, level: "gold", hint: "Add the four sides.", explanation: "8 + 6 + 8 + 6 = 28 cm." }
    ]
  },
  {
    id: "ratio-proportion-money",
    name: "Ratio, Proportion & Money",
    icon: "£",
    accent: "#d83b6a",
    imagePath: "assets/ratio-proportion-money.png",
    progress: 0,
    isReady: true,
    lesson: {
      title: "The Unitary Method",
      text: "The unitary method means finding the value of one item first, then using it to find the total. One step at a time is the secret.",
      example: "6 pencils cost £1.80\n\n1 pencil costs £1.80 ÷ 6 = £0.30\n9 pencils cost £0.30 x 9 = £2.70."
    },
    questions: [
      { id: 1, question: "6 pencils cost £1.80. How much does 1 pencil cost? Answer in pence.", answer: 30, level: "bronze", hint: "Divide 180p by 6.", explanation: "180p ÷ 6 = 30p." },
      { id: 2, question: "3 pens cost £2.25. How much does 1 pen cost? Answer in pence.", answer: 75, level: "bronze", hint: "Divide 225p by 3.", explanation: "225p ÷ 3 = 75p." },
      { id: 3, question: "4 tickets cost £9.20. How much do 10 tickets cost? Answer in pounds.", answer: 23, level: "silver", hint: "Find the cost of one ticket first.", explanation: "£9.20 ÷ 4 = £2.30. £2.30 x 10 = £23." },
      { id: 4, question: "8 books cost £16. How much do 20 books cost? Answer in pounds.", answer: 40, level: "silver", hint: "Find one book, then multiply by 20.", explanation: "£16 ÷ 8 = £2. £2 x 20 = £40." },
      { id: 5, question: "5 notebooks cost £6.75. How much do 12 notebooks cost? Answer in pounds.", answer: 16.2, level: "gold", hint: "Find one notebook first.", explanation: "£6.75 ÷ 5 = £1.35. £1.35 x 12 = £16.20." },
      { id: 6, question: "10 kg of apples costs £24.50. How much would 17 kg cost? Answer in pounds.", answer: 41.65, level: "gold", hint: "Find 1 kg first.", explanation: "£24.50 ÷ 10 = £2.45. £2.45 x 17 = £41.65." }
    ]
  }
];
