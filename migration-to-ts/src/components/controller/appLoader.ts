import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'bb4e99cf222c467ebdbf93a336c399c0', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
