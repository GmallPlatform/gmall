'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    var designQuery = function () {
        function designQuery(brands, brandTags, filters, sections, categories) {
            _classCallCheck(this, designQuery);

            this.brands = brands;
            this.brandTags = brandTags;
            this.filterTags = filters.reduce(function (a, item) {
                return a.concat(item.tags);
            }, []);
            this.sections = sections;
            this.categories = sections.reduce(function (a, s) {
                if (s.categories) {
                    a.concat(s.categories);
                }
                if (s.child) {
                    s.child.forEach(function (c) {
                        if (c.categories) {
                            a.concat(c.categories);
                        }
                    });
                }
                return a;
            }, []);
            console.log(this.categories);
            this.queryCategory = queryCategory;
        }

        _createClass(designQuery, [{
            key: 'getQueryString',
            value: function getQueryString(params, query, queryCategory) {
                this.queryCategory = queryCategory;
                var group = params.group,
                    category = params.category;
                var brand = query.brand,
                    brandTag = query.brandTag,
                    queryTag = query.queryTag;
                /*console.log(params,query)
                console.log(group,category,brand,brandTag,queryTag);*/

                var q = {},
                    b = this.brands.getOFA('url', brand);
                if (brand && b) {
                    q.brand = b._id;
                }
                if (brandTag) {
                    var bt = void 0;
                    if (b) {
                        var _bt = b.tags.getOFA('url', brandTag);
                        if (_bt) {
                            q.brandTag = _bt._id;
                        }
                    } else {
                        for (var i = 0; i < this.brands.length; i++) {
                            bt = this.brands[i].tags.getOFA('url', brandTag);
                            if (bt) {
                                q.brandTag = bt._id;break;
                            }
                        }
                    }
                }
                // анализ url на наличие тегов*************
                if (queryTag) {
                    q.tags = {};
                    var filterTags = this.filterTags;
                    queryTag.split('+').map(function (url) {
                        //console.log(url)
                        return filterTags.getOFA('url', url);
                    }).filter(function (t) {
                        return t;
                    }).forEach(function (t) {
                        //console.log(t)
                        if (!q.tags[t.filter]) {
                            q.tags[t.filter] = [];
                        }
                        //console.log(q.tags)
                        q.tags[t.filter].push(t._id);
                    });
                }

                //console.log(q,this.queryCategory)
                if (this.queryCategory && this.queryCategory.category) {
                    q.category = this.queryCategory.category;
                }
                //console.log(_prepareQueryForRequest(q))
                return _prepareQueryForRequest(q);
            }
        }]);

        return designQuery;
    }();

    function _prepareQueryForRequest(queryStart) {
        //console.log(queryStart)
        // формирование строки запроса для выбора  товаров из БД
        var query = [];
        var arr_id;
        for (var key in queryStart) {
            if (queryStart[key]) {
                //console.log(queryStart[key],key);
                if (key == "tags") {
                    var qu = [];
                    for (var key2 in queryStart[key]) {
                        var obj = queryStart[key][key2];
                        var q = [];
                        if (obj && obj.length) {
                            obj.forEach(function (objT) {
                                q.push({ tags: objT });
                            });

                            if (q.length > 1) {
                                q = { $or: q };
                                qu.push(q);
                            } else {
                                q = q[0];
                                qu.push(q);
                            }
                        }
                    }
                    if (qu.length) {
                        if (qu.length == 1) {
                            query.push(qu[0]);
                        } else {
                            query.push({ $and: qu });
                        }
                    }
                } else if (key == "brandTag") {
                    //console.log(key,queryStart[key])
                    // это если запрос на список со страницы акции.
                    // в акции могут быть товары из нестольких коллекций
                    if (queryStart[key].length) {
                        var obj = {};
                        obj[key] = { $in: queryStart[key] };
                        query.push(obj);
                        //console.log(key,obj)
                    } /*else {
                        var obj={};
                      obj[key]=queryStart[key];
                      query.push(obj);
                        }*/
                    //console.log(obj[key])
                } else if (key == "_id") {
                    // это если запрос на список со страницы акции.
                    // в акции могут быть просто товары
                    if (queryStart[key].length) {
                        arr_id = {};
                        arr_id[key] = { $in: queryStart[key] };
                    }
                } else {
                    var obj = {};
                    obj[key] = queryStart[key];
                    query.push(obj);
                }
            }
        }
        if (query.length == 1) {
            if (arr_id) {
                query = JSON.stringify({ $or: [query[0], arr_id] });
            } else {
                query = JSON.stringify(query[0]);
            }
        } else if (query.length > 1) {
            if (arr_id) {
                query = JSON.stringify({ $or: [{ $and: query }, arr_id] });
            } else {
                query = JSON.stringify({ $and: query });
            }
        } else {
            if (arr_id) {
                query = JSON.stringify(arr_id);
            } else {
                query = {};
            }
        }
        return query;
    }

    if (typeof window === 'undefined') {
        exports.init = designQuery;
    }
})();
//# sourceMappingURL=designQuery.js.map