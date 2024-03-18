export {};

switch (location.hostname.toLowerCase()) {
    case 'localhost':
    case '127.0.0.1':
        window.env = 'dev';
        break;
    case 'test.com':
        window.env = 'test';
        break;
    default:
        window.env = 'prod';
        break;
}
