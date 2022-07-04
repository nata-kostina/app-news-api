class Message {
    draw(data: string): void {
        if (data) {
            const errorMessageTemp = document.querySelector('#errorMessageTemp') as HTMLTemplateElement;
            const errorMessageClone = errorMessageTemp.content.cloneNode(true) as HTMLElement;
            (errorMessageClone.querySelector('.message-text') as HTMLElement).innerHTML = data;
            (document.querySelector('.info') as HTMLElement).appendChild(errorMessageClone);
        }
    }
    clear(): void {
        (document.querySelector('.info') as HTMLElement).innerHTML = '';
    }
}

export default Message;
