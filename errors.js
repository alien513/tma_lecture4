export class CustomError extends Error {
    constructor(name, message, stack) {
        super(message);
        this.name = name;
        this.message = message;
        this.fullinfo = stack;
    }
}


export function ErrorHandler(event) {
    console.log("Error:", event);
    alert(event.reason.name + ": " + event.reason.message);
}
