exports.handler = async function (event, context) {
     // Заголовки приходят в разном регистре, приводим к нижнему
    const headers = event.headers || {};
    const headersLower = {};
    for (const key of Object.keys(headers)) {
        headersLower[key.toLowerCase()] = headers[key];
    }

    // Попытка прочитать заголовок x-test
    const xTestValue = headersLower['x-test'] || '';

    // Тело запроса, приведение к utf-8
    let requestBody = event.body || '';
    if (event.isBase64Encoded) {
        requestBody = Buffer.from(requestBody, 'base64').toString('utf-8');
    }

    // Иначе JSON с отзеркаливанием x-test -> x-result и body -> x-body
    const responseBody = {
        message: 'thelonecheetah',
        'x-result': xTestValue,
        'x-body': requestBody
    };

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },   // явное указание JSON
        body: JSON.stringify(responseBody)
    };
};