export function GetOperationId(model: string, operation: string) {
    const modelLocal = ToTitleCase(model).replace(/\s/g, '');
    const operationLocal = ToTitleCase(operation).replace(/\s/g, '');
    return {
        title: '',
        operationId: `${modelLocal}_${operationLocal}`,
    };
}

function ToTitleCase(str: string): string {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.replace(word[0], word[0].toUpperCase()))
        .join(' ');
}
