import { TCallbackVoid, HTTPStatusCode, IQuery, TOptions } from '../../types/types';
import state from './../state/state';

class Loader {
    constructor(private readonly baseLink: string, private readonly options: TOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        query: IQuery,
        callback: TCallbackVoid<T> = () => {
            console.error('No callback for GET response');
        },
        handleError: TCallbackVoid<Error>
    ): void {
        this.load(query, callback, handleError);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            let errorMessage = '';
            switch (res.status) {
                case HTTPStatusCode.Unauthorized:
                    errorMessage = 'You are not authorized. Check your API key.';
                    state.setIsAuth(false);
                    break;
                case HTTPStatusCode.NotFound:
                    errorMessage = 'The page was not found';
                    break;
                case HTTPStatusCode.TooManyRequests:
                    errorMessage = 'You did too many requests.';
                    break;
                default:
                    errorMessage = res.status
                        ? res.statusText
                            ? `There is ${res.status} error: ${res.statusText}`
                            : `There is ${res.status} error.`
                        : 'There is unexpected error';
            }
            throw Error(errorMessage);
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

    load<T>(query: IQuery, callback: TCallbackVoid<T>, handleError: TCallbackVoid<Error>): void {
        fetch(this.makeUrl(query), { method: query.method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: T) => {
                callback(data);
                state.setIsAuth(true);
            })
            .catch((err: Error) => handleError(err));
    }
}

export default Loader;
