const iat = 234234;
const exp = 324324;

const dataIat = new Date(iat * 1000).toLocaleString();
const dataExp = new Date(exp * 1000).toLocaleString();

console.log(`Data de emissão (iat): ${dataIat}\n Data da expiração (exp): ${dataExp}`)