module.exports.options = {
    'request-on-steroids': {
        request: {
            headers: {
                'Accept-Language': 'de'
            }
        }
    }
}

module.exports.authorize = (tinder) => new Promise((resolve, reject) => {
    tinder.authorize(process.env.FB_ACCESS_TOKEN, process.env.FB_USER_TOKEN).then(resolve).catch(reject);
});