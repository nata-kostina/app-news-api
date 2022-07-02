import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '662f05a6990b40f59fae29ce1c8ecd80', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
