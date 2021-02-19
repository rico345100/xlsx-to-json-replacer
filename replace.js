const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const Excel = require('exceljs');

function print() {
    console.log.apply(null, arguments);
}

(async function main() {
    print("Starting Replacing...");

    const { i: inputJsonDir } = argv;
    const { x: inputXlsxDir } = argv;
    const { o: outputDir = 'result.json' } = argv;

    try {
        if (typeof argv.i === "undefined") {
            throw new Error("Input Source JSON is missing.");
        }
        else if (typeof argv.x === "undefined") {
            throw new Error("Input Source XLSX is missing.");
        }

        const sourceBuffer = await fs.promises.readFile(inputJsonDir);
        const sourceText = sourceBuffer.toString();
        const outputJson = JSON.parse(sourceText);
        print("Source JSON Loaded.");

        const sourceWorkbook = new Excel.Workbook();
        await sourceWorkbook.xlsx.readFile(inputXlsxDir);
        print("Source XLSX Loaded.");

        const worksheet = sourceWorkbook.worksheets[0];

        print("Found Rows: " + worksheet.rowCount);

        let rowIndex = 1;

        while (rowIndex <= worksheet.rowCount) {
            const row = worksheet.getRow(rowIndex);
            const targetKey = row.getCell(1).value;

            if (targetKey == null) {
                print("Found Null Value. Exit iteration.");
                break;
            }

            const targetValue = row.getCell(2).value;
            const separatedKeys = targetKey.split(".");

            let cursor = outputJson;

            for (let i = 0; i < separatedKeys.length - 1; i += 1) {
                cursor = outputJson[separatedKeys[i]];
            }

            // print("ORIG: " + cursor[separatedKeys[separatedKeys.length - 1]]);
            cursor[separatedKeys[separatedKeys.length - 1]] = targetValue;
            // print("NEW: " + cursor[separatedKeys[separatedKeys.length - 1]]);

            rowIndex += 1;
        }

        await fs.promises.writeFile(outputDir, JSON.stringify(outputJson, null, 4));

        print("Replacement completed. Please check your output directory.");
        print("Written as: " + outputDir);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
})();