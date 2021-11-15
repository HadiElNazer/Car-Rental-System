import errorMessage from './errorMessage.js';

class carException extends Error {
    constructor(status, mess) {
        super();
        if (mess && typeof (mess) === 'string' && mess in errorMessage) {
            this.message = errorMessage[mess].message;
            this.statusCode = status;
        }
        else {
            this.message = mess;
            this.statusCode = status;
        }
    }
}
export default carException;