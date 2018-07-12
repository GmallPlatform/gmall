/**
 * Created by Игорь on 17.04.2018.
 */
exports.to = function to(promise) {
    return promise.then(data => {
        return [null, data];
    })
        .catch(err => [err]);
}