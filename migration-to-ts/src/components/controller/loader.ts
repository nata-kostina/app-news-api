import { TCallbackVoid, HTTPStatusCode, IQuery, TOptions } from '../../types/types';

class Loader {
    constructor(private readonly baseLink: string, private readonly options: TOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        { endpoint, options = {} }: IQuery,
        callback: TCallbackVoid<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', { endpoint, options }, callback);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === HTTPStatusCode.Unauthorized || res.status === HTTPStatusCode.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: TOptions, endpoint: string): string {
        const urlOptions: TOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<T>(method: string, query: IQuery, callback: TCallbackVoid<T>): void {
        fetch(this.makeUrl(query.options || {}, query.endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: T) => callback(data))
            .catch((err: unknown) => {
                if (typeof err === 'string') {
                    console.error(err);
                }
            });
    }
}

export default Loader;
