const LOGIN = 'thelonecheetah';

exports.handler = async function (event, context) {
    // Получение параметров пути
    const params = event.pathParams || event.pathParameters || {};

    // (B) /api/rv/{word} - есть параметр word
    if (params.word !== undefined) {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/plain; charset=UTF-8' },
            body: params.word.split('').reverse().join('')   // инвертируем строку
        };
    }

    // (A) /{date} - есть параметр date
    if (params.date !== undefined) {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date: todayDDMMYYYY(),
                login: LOGIN
            })
        };
    }

    // Сюда не попасть — API Gateway отсекает всё лишнее
    return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'not found', path: event.path })
    };
};

function todayDDMMYYYY() {
    // Получение дня, месяца и года из строковой записи даты
    const [year, month, day] = new Date()
        .toISOString()
        .slice(0, 10)
        .split('-');
    
    // Собираем строку DD-MM-YYYY
    return `${day}-${month}-${year}`;
}