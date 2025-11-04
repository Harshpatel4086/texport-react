class Toaster {
    constructor() {
        this.listeners = [];
    }

    addListener(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(listener => listener !== callback);
        };
    }

    success(message) {
        this.show(message, 'success');
    }

    error(message) {
        this.show(message, 'error');
    }

    warning(message) {
        this.show(message, 'warning');
    }

    show(message, type) {
        this.listeners.forEach(callback => {
            callback({ message, type, id: Date.now() + Math.random() });
        });
    }
}

export const toaster = new Toaster();