"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Игорь on 12.04.2017.
 */
var Section = function () {
    function Section() {
        _classCallCheck(this, Section);
    }

    _createClass(Section, null, [{
        key: "getParentSection",
        value: function getParentSection(sections, sectionUrl, id) {
            //console.log(sectionUrl)
            if (!sections) return null;
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
    }]);

    return Section;
}();
//# sourceMappingURL=Section.js.map