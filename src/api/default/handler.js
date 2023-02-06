class DefaultHandler {
    constructor() {
        this.message = 'API is running';
        this.getApiStatusHandler = this.getApiStatusHandler.bind(this);
    }

    getApiStatusHandler() {
        return {
            status: 'success',
            message: this.message,
        };
    }
}

module.exports = DefaultHandler;