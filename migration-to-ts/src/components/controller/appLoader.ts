import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: 'bb4e99cf222c467ebdbf93a336c399c00', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
