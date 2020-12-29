

export class CreateReferenceNumber {

    get generateRefernceNumber() {
        return Math.floor(Math.random() * 1000000000);
    }
}
