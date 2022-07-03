import { IGetSourcesResponse, ISourceItem } from './../../types/types';
class State {
    private sourceResponse: IGetSourcesResponse;
    private sources: ISourceItem[];
    private currentSource: ISourceItem;

    setSourceResponse(sources: IGetSourcesResponse | { sources: []; status: 'default' }): void {
        this.sourceResponse = sources;
    }

    getSourceResponse(): IGetSourcesResponse {
        return this.sourceResponse;
    }

    setSources(sources: ISourceItem[]): void {
        this.sources = sources;
    }

    getSources(): ISourceItem[] {
        return this.sources ? this.sources : this.sourceResponse.sources;
    }

    getCurrentSource(): ISourceItem {
        return this.currentSource;
    }

    setCurrentSource(source: ISourceItem) {
        this.currentSource = source;
    }
}

export default State;
