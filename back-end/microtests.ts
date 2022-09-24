import { faker } from "@faker-js/faker"

const urlStart:string = "https://www.youtube.com/" 
const youtubeLink:string = urlStart + faker.random.alphaNumeric(10)
console.log(youtubeLink)