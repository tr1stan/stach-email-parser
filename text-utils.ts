import fs from "fs";

export interface email {
    date: string;
    name: string;
    emailAddress: string;
    contactNumber: string;
    message: string;
}

export const whereNotEmpty = (email: email) =>
    email.date &&
    email.name &&
    (email.message || email.emailAddress || email.contactNumber);

const regExValue = (rema: RegExpMatchArray | null) =>
    rema && rema.length > 1 ? rema[2] : "";

export const parseContactEmail = (email: string): email => {
    const date = email.match(/^(Date: )(.*)$/m);
    const yourName = email.match(/^(Your name: )(.*)$/m);
    const emailAddress = email.match(/^(Email Address: )(.*)$/m);
    const contactNumber = email.match(/^(Contact number: )(.*)$/m);
    const message = email.match(/^(Message: )(.*)/ms);

    const parsed = {
        date: regExValue(date),
        name: regExValue(yourName),
        emailAddress: regExValue(emailAddress),
        contactNumber: regExValue(contactNumber),
        message: regExValue(message),
    };

    return parsed;
};

export const saveToCsv = (items: email[]) => {
    const replacer = (key: string, value: any) => (value === null ? "" : value); // specify how you want to handle null values here
    const header = Object.keys(items[0]);
    let csv = items.map((row: any) =>
        header
            .map((fieldName: any) => JSON.stringify(row[fieldName], replacer))
            .join(",")
    );
    csv.unshift(header.join(","));
    const csvResult = csv.join("\r\n");

    fs.writeFileSync("./alltheemails.csv", csvResult);
};
