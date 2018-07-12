'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var asyncAwaitIsYourNewBestFriend = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var api, user, friends, photo;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        api = new Api();
                        _context.next = 3;
                        return api.getUser();

                    case 3:
                        user = _context.sent;
                        _context.next = 6;
                        return api.getFriends(user.id);

                    case 6:
                        friends = _context.sent;
                        _context.next = 9;
                        return api.getPhoto(user.id);

                    case 9:
                        photo = _context.sent;

                        console.log('asyncAwaitIsYourNewBestFriend', { user: user, friends: friends, photo: photo });

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function asyncAwaitIsYourNewBestFriend() {
        return _ref.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Api = function () {
    function Api() {
        _classCallCheck(this, Api);

        this.user = { id: 1, name: 'test' };
        this.friends = [this.user, this.user, this.user];
        this.photo = 'not a real photo';
    }

    _createClass(Api, [{
        key: 'getUser',
        value: function getUser() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    return resolve(_this.user);
                }, 200);
            });
        }
    }, {
        key: 'getFriends',
        value: function getFriends(userId) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    return resolve(_this2.friends.slice());
                }, 200);
            });
        }
    }, {
        key: 'getPhoto',
        value: function getPhoto(userId) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    return resolve(_this3.photo);
                }, 200);
            });
        }
    }, {
        key: 'throwError',
        value: function throwError() {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    return reject(new Error('Intentional Error'));
                }, 200);
            });
        }
    }]);

    return Api;
}();

asyncAwaitIsYourNewBestFriend();
//# sourceMappingURL=async.js.map