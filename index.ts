import { parseContactEmail, saveToCsv, whereNotEmpty } from "./text-utils";
import fs from "fs";

const separator =
    "--------------------------------------------------------------------------------";

var data: string = fs.readFileSync("alltheemails.txt", "utf8");
const eachEmail = data.split(separator);

const parsed = eachEmail.map(parseContactEmail).filter(whereNotEmpty);

saveToCsv(parsed);
