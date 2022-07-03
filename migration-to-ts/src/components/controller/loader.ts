import { TCallbackVoid, HTTPStatusCode, IQuery, TOptions } from '../../types/types';

class Loader {
    constructor(private readonly baseLink: string, private readonly options: TOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        query: IQuery,
        callback: TCallbackVoid<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load(query, callback);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === HTTPStatusCode.Unauthorized || res.status === HTTPStatusCode.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(query: Partial<IQuery>): string {
        const urlOptions: TOptions = { ...this.options, ...query.options };
        let url = `${this.baseLink}${query.endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<T>(query: IQuery, callback: TCallbackVoid<T>): void {
        fetch(this.makeUrl(query), { method: query.method })
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
