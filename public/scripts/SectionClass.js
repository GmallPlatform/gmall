'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    var Section = function () {
        function Section(sections) {
            _classCallCheck(this, Section);

            this.sections = sections;
            this.categories = sections.reduce(function (a, s) {
                s.categoriesO = {};
                if (s.categories) {
                    s.categories.forEach(function (cat) {
                        a[cat.url] = cat;
                        s.categoriesO[cat.url] = cat;
                    });
                }
                if (s.child) {
                    s.child.forEach(function (c) {
                        c.categoriesO = {};
                        if (c.categories) {
                            c.categories.forEach(function (cat) {
                                a[cat.url] = cat;
                                c.categoriesO[cat.url] = cat;
                            });
                        }
                    });
                }
                return a;
            }, {});
        }

        _createClass(Section, [{
            key: 'getSections',
            value: function getSections() {
                return this.sections;
            }
        }, {
            key: 'getCategories',
            value: function getCategories() {
                return this.categories;
            }
        }, {
            key: 'getSection',
            value: function getSection(sectionUrl) {
                //console.log('sectionUrl',sectionUrl)
                if (!this.sections) return null;
                var sections = this.sections;
                for (var i = 0, l = sections.length; i < l; i++) {
                    //console.log('sections[i].url',sections[i].url)
                    if (sections[i].url && sections[i].url == sectionUrl) {
                        return sections[i];
                        break;
                    }
                    if (sections[i].child && sections[i].child.length) {
                        for (var j = 0, ll = sections[i].child.length; j < ll; j++) {
                            if (sections[i].child[j].url && sections[i].child[j].url == sectionUrl) {
                                return sections[i].child[j];
                                break;
                            }
                        }
                    }
                }
                return null;
            }
        }, {
            key: 'getParentSection',
            value: function getParentSection(sectionUrl, id) {
                //console.log(sectionUrl)
                if (!this.sections) return null;
                var sections = this.sections;
                for (var i = 0, l = sections.length; i < l; i++) {
                    if (id) {
                        if (sections[i]._id == sectionUrl) {
                            return sections[i];
                            break;
                        }
                    } else {
                        if (sections[i].url && sections[i].url == sectionUrl) {
                            return sections[i];
                            break;
                        }
                    }

                    if (sections[i].child && sections[i].child.length) {
                        var categories;
                        if (categories = _getParentSection(sections[i].child, sectionUrl, id)) {
                            return categories;
                            break;
                        }
                    }
                }
                return null;
            }
        }, {
            key: 'getEmbededCategories',
            value: function getEmbededCategories(section, arr) {
                if (section.categories && section.categories.length) {
                    arr.push.apply(arr, section.categories);
                }
                if (section.child && section.child.length) {
                    section.child.forEach(function (child, i) {
                        arr.push.apply(arr, section.child[i].categories);
                    });
                }
                return arr;
            }
        }, {
            key: 'getListType',
            value: function getListType(params) {
                if (!params.group) {
                    return 'good';
                }
                for (var i = 0; i < this.sections.length; i++) {
                    if (this.sections[i].url == params.group) {
                        if (this.sections[i].type) {
                            return this.sections[i].type;
                            break;
                        }
                    }
                    if (this.sections[i].child && this.sections[i].child.length) {
                        for (var j = 0; j < this.sections[i].child.length; j++) {
                            if (this.sections[i].child[j].url == params.group) {
                                if (this.sections[i].type) {
                                    return this.sections[i].type;
                                    break;
                                }
                            }
                        }
                    }
                }
                return 'good';
            }
        }]);

        return Section;
    }();

    if (typeof window !== 'undefined') {
        window.SectionClass = Section;
    } else {
        exports.init = Section;
    }
})();
//# sourceMappingURL=SectionClass.js.map