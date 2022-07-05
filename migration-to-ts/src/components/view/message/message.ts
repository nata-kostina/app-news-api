class Message {
    draw(data: string): void {
        if (data) {
            const errorMessageTemp = document.querySelector('#errorMessageTemp') as HTMLTemplateElement;
            const errorMessageClone = errorMessageTemp.content.cloneNode(true) as DocumentFragment;
            (errorMessageClone.querySelector('.message-text') as HTMLSpanElement).innerHTML = data;
            (document.querySelector('.info') as HTMLDivElement).appendChild(errorMessageClone);
        }
    }
    clear(): void {
        (document.querySelector('.info') as HTMLDivElement).innerHTML = '';
    }
}

export default Message;
