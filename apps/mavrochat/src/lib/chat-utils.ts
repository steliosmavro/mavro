export function getChatHeaders(
    model: string,
    apiToken?: string,
): Record<string, string> {
    const headers: Record<string, string> = { 'x-model': model };
    if (apiToken) {
        headers['x-api-key'] = apiToken;
    }
    return headers;
}
