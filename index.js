const fs = require("fs");
const readLine = require("readline");

const writeStream = fs.createWriteStream('outputfile.txt')

const file = readLine.createInterface({
    input : fs.createReadStream('input.txt')
    }
)

var finalData = [];

file.on('line', (line) => {
    const myArray = line.split(",");
    for(const element of myArray) {
        const data = (element.substring(0,1).toUpperCase()).
        concat((element.substring(1)).toLowerCase());
        finalData.push(data);
    }

    writeStream.write(finalData.toString()+'\n');
    finalData = [];

})

