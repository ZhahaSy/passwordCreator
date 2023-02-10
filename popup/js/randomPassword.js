const number = ['1','2','3','4','5','6','7','8','9']
const captail = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z']
const lowercase = ['a','b','c','d','e','f','g','h','i','j','k','m','n','p','Q','r','s','t','u','v','w','x','y','z',]
const specail = ['.', ',', '-', '_' , '/', '@']

const words = {
    lowercase,
    captail,
    number,
    specail
}

export function randomPassword(size, range=[
    'lowercase', 'captail','number', 'specail'
])
{
  var seed = [];//数组

  new Set(range).forEach((item) => {
    seed.push(...(words[item] || []))
  })
  let seedlength = seed.length;//数组长度
  var createPassword = '';
  for (let i=0;i<size;i++) {
    let j = Math.floor(Math.random()*seedlength);
    createPassword += seed[j];
  }
  return createPassword;
}