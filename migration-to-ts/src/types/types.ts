export type TOptions = {
    [key: string]: string;
};

export type TCallbackVoid<T> = (data: T) => void;

export interface IQuery {
    endpoint: string;
    options?: TOptions;
    method?: string;
}

export interface ISourceItem {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}
type TNewsSource = Pick<ISourceItem, 'id' | 'name'>;

export interface INewsItem {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: TNewsSource;
    title: string;
    url: string;
    urlToImage: string;
}

export interface IGetNewsResponse {
    articles: INewsItem[];
    status: string;
    totalResults: number;
}

export interface IGetSourcesResponse {
    sources: ISourceItem[];
    status: string;
}

export interface IFilter {
    category: string;
    language: string;
}

export const enum HTTPStatusCode {
    Continue = 100,
    SwitchingProtocols = 101,
    Processing = 102,

    /**
     * Some `1xx` status codes.
     */
    InformationalResponses = Continue | SwitchingProtocols | Processing,

    OK = 200,
    Created = 201,
    Accepted = 202,
    NonAuthoritativeInformation = 203,

    /**
     * Some `2xx` status codes.
     */
    Success = OK | Created | Accepted | NonAuthoritativeInformation,

    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,

    /**
     * Some `4xx` error codes.
     */
    ClientErrors = BadRequest |
        Unauthorized |
        PaymentRequired |
        Forbidden |
        NotFound |
        MethodNotAllowed |
        NotAcceptable,

    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,

    /**
     * Some `5xx` error codes.
     */
    ServerErrors = InternalServerError | NotImplemented | BadGateway | ServiceUnavailable,
}
