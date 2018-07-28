'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    var BookingCLass = function () {
        function BookingCLass(store, date) {
            _classCallCheck(this, BookingCLass);

            if (!date) {
                date = new Date();
            }
            this.store = store;
            this.lang = store.lang;
            this.today = new Date(date);
            this.date = new Date(date);
            moment.locale(this.lang);
            this.currentMonth = moment(this.today).format('MMMM');
            this.datesOfWeeks = this.getDatesForWeek(this.today);
            this.currentDayOfWeek = this.date.getDay();
            if (this.currentDayOfWeek == 0) {
                this.currentDayOfWeek = 7;
            }
            this.currentDayOfWeek--;
            this.query = { date: { $in: this.datesOfWeeks.map(function (item) {
                        return item.date;
                    }) } };

            this.startTimeParts = 36;
            this.endTimeParts = 72;
            this.timeParts = [];
            for (var i = 0; i < 96; i++) {
                this.timeParts.push({ busy: false, i: i });
            };
            this.timeTable = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
            this.timeTable15min = ['00:00', '00:15', '00:30', '00:45', '01:00', '01:15', '01:30', '01:45', '02:00', '02:15', '02:30', '02:45', '03:00', '03:15', '03:30', '03:45', '04:00', '04:15', '04:30', '04:45', '05:00', '05:15', '05:30', '05:45', '06:00', '06:15', '06:30', '06:45', '07:00', '07:15', '07:30', '07:45', '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45', '21:00', '21:15', '21:30', '21:45', '22:00', '22:15', '22:30', '22:45', '23:00', '23:15', '23:30', '23:45'];
            this.minDurationForService = store.seller.minDurationForService || 15;
            var delta = 0;
            //console.log(self.minDurationForService)
            switch (this.minDurationForService) {
                case 30:
                    delta = 1;break;
                case 60:
                    delta = 3;break;
                case 90:
                    delta = 5;break;
                case 120:
                    delta = 7;break;
                default:
                    delta = 0;
            }
            this.timePartsForTable = [];
            this.timePartsI = [];
            for (var i = 0; i < 96; i = i + 1 + delta) {
                this.timePartsForTable.push(this.timeParts[i]);
                this.timePartsI.push(i);
            }

            this.changeStartEndTimeParts();
            this.weeksRange = this.setWeeksRange(this.today);
        }

        _createClass(BookingCLass, [{
            key: 'getDayOfYear',
            value: function getDayOfYear(selectedMonth, day) {
                if (selectedMonth == 1) {
                    return 31 + day;
                } else if (selectedMonth == 2) {
                    return 31 + 29 + day;
                } else if (selectedMonth == 3) {
                    return 31 + 29 + 31 + day;
                } else if (selectedMonth == 4) {
                    return 31 + 29 + 31 + 30 + day;
                } else if (selectedMonth == 5) {
                    return 31 + 29 + 31 + 30 + 31 + day;
                } else if (selectedMonth == 6) {
                    return 31 + 29 + 31 + 30 + 31 + 30 + day;
                } else if (selectedMonth == 7) {
                    return 31 + 29 + 31 + 30 + 31 + 30 + 31 + day;
                } else if (selectedMonth == 8) {
                    return 31 + 29 + 31 + 30 + 31 + 30 + 31 + 31 + day;
                } else if (selectedMonth == 9) {
                    return 31 + 29 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + day;
                } else if (selectedMonth == 10) {
                    return 31 + 29 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + day;
                } else if (selectedMonth == 11) {
                    return 31 + 29 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30 + day;
                } else {
                    return day;
                }
            }
        }, {
            key: 'setWeekDates',
            value: function setWeekDates(week) {
                this.date = new Date(this.today);
                if (week) {
                    this.date.setTime(this.date.getTime() + week * 7 * 86400000);
                    this.date.setHours(0);
                }
                this.currentMonth = moment(this.date).format('MMMM');
                this.datesOfWeeks = this.getDatesForWeek(this.date);
                this.currentDayOfWeek = this.date.getDay();
                if (this.currentDayOfWeek == 0) {
                    this.currentDayOfWeek = 7;
                }
                this.currentDayOfWeek--;
                if (week) {
                    this.currentDayOfWeek == 0;
                }
                this.query = { date: { $in: this.datesOfWeeks.map(function (item) {
                            return item.date;
                        }) } };
            }
        }, {
            key: 'getDatesForWeek',
            value: function getDatesForWeek(date, num) {
                if (!num) {
                    num = 7;
                }
                var ds = [];
                var d = new Date(date);
                var dw = date.getDay();
                if (dw == 0) {
                    dw = 7;
                }
                for (var i = 1; i <= num; i++) {
                    d = new Date(date);
                    d.setTime(d.getTime() + (i - dw) * 86400000);
                    d.setHours(0);
                    var month = d.getMonth(); // + 1; //months from 1-12
                    var day = d.getDate();
                    var year = d.getFullYear();
                    var dayOfYear = this.getDayOfYear(month, day - 1);
                    if (month < 10) {
                        month = '0' + month;
                    }
                    if (day < 10) {
                        day = '0' + day;
                    };
                    var dStr = 'date' + year + month + day;
                    moment.locale(this.lang);
                    var o = {
                        date: dStr,
                        d: d,
                        dayOfYear: dayOfYear,
                        month: moment(d).format('MMMM'),
                        dateField: this.getDateStr(d)
                    };
                    ds.push(o);
                }
                return ds;
            }
        }, {
            key: 'getDateObj',
            value: function getDateObj(dateStr) {
                var year = dateStr.substring(4, 8);
                var month = dateStr.substring(8, 10);
                var day = dateStr.substring(10);
                try {
                    var date = new Date(year, month, day);
                    moment.locale(this.lang);
                    var s = moment(date).format('ddd');
                    return s + '/' + day;
                } catch (err) {
                    console.log(err);return 'error handle date';
                }
            }
        }, {
            key: 'getDateStr',
            value: function getDateStr(date) {
                try {
                    var date = new Date(date);
                    moment.locale(this.lang);
                    var s = moment(date).format('dddd');
                    var d = moment(date).format('DD.MM.YY');
                    return capitalizeFirstLetter(s) + ' (' + d + ')';
                } catch (err) {
                    console.log(err);return 'error handle date';
                }
            }
        }, {
            key: 'changeStartEndTimeParts',
            value: function changeStartEndTimeParts(date) {
                if (!date) {
                    date = this.today;
                }
                var dayOfWeek = date.getDay();
                var month = date.getMonth();
                var day = date.getDate();
                this.currentDayOfYear = this.getDayOfYear(month, day - 1);
                if (this.store.timeTable) {
                    this.storeSchedule = JSON.parse(JSON.stringify(this.store.timeTable));
                    this.dayoff = this.storeSchedule[dayOfWeek] && this.storeSchedule[dayOfWeek].is ? false : true;
                    var start = this.storeSchedule[dayOfWeek] && this.storeSchedule[dayOfWeek].start ? this.storeSchedule[dayOfWeek].start : 6;
                    var end = this.storeSchedule[dayOfWeek] && this.storeSchedule[dayOfWeek].end ? this.storeSchedule[dayOfWeek].end : 20;
                    this.startTimeParts = start * 4;
                    this.endTimeParts = end * 4;
                    for (dayOfWeek in this.store.timeTable) {
                        if (this.store.timeTable[dayOfWeek].start < start) {
                            start = this.store.timeTable[dayOfWeek].start;
                        }
                        if (this.store.timeTable[dayOfWeek].end > end) {
                            end = this.store.timeTable[dayOfWeek].end;
                        }
                    }
                    this.startTimeParts = start * 4;
                    this.endTimeParts = end * 4;
                }
            }
        }, {
            key: 'setWeeksRange',
            value: function setWeeksRange(today) {
                var weeksRange = [{}, {}, {}, {}, {}, {}, {}];
                //var tempFoo=this.getDatesForWeek;
                for (var i = 0; i < 7; i++) {
                    if (!i) {
                        var date = today;
                    } else {
                        var date = new Date(today);
                        date.setTime(date.getTime() + i * 7 * 86400000);
                        date.setHours(0);
                    }
                    var datesOfWeeks = this.getDatesForWeek(date);
                    weeksRange[i].startDate = datesOfWeeks[0].d;
                    weeksRange[i].endDate = datesOfWeeks[6].d;
                    moment.locale(this.lang);
                    weeksRange[i].startDateString = moment(datesOfWeeks[0].d).format('DD MMM');
                    weeksRange[i].endDateString = moment(datesOfWeeks[6].d).format('DD MMM');
                }
                return weeksRange;
            }
        }, {
            key: 'getBookingWeekScheldule',
            value: function getBookingWeekScheldule(data, lang) {
                var datesOfWeeks = this.datesOfWeeks;
                var storeScheduleWeek = JSON.parse(JSON.stringify(this.store.timeTable));
                var selectedWorkplace = { 'week': {} };
                for (var dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
                    var d = datesOfWeeks[dayOfWeek];
                    selectedWorkplace['week'][d.date] = {};
                    selectedWorkplace['week'][d.date].entryTimeTable = JSON.parse(JSON.stringify(this.timeParts));
                    selectedWorkplace['week'][d.date].entryTimeTable.forEach(function (p, i) {
                        p.date = d.date;
                        if (storeScheduleWeek) {
                            // в self.storeSchedule 0 - это воскр у нас 0 - это понедельник
                            var j = dayOfWeek + 1;
                            if (dayOfWeek == 6) {
                                j = 0;
                            }
                            if (!storeScheduleWeek[j].is || p.i < storeScheduleWeek[j].start * 4 || p.i >= storeScheduleWeek[j].end * 4) {
                                p.out = true;
                            }
                        }
                    });
                }
                //console.log(selectedWorkplace)
                var dowArr = datesOfWeeks.map(function (el) {
                    return el.date;
                });
                //console.log(dowArr)
                var workplace = selectedWorkplace;
                for (var j = 0; j < data.length; j++) {
                    var e = data[j];
                    var serviseLink = null;

                    if (!workplace.week[e.date]) {
                        continue;
                    }
                    for (var i = e.start; i < e.start + e.qty; i++) {
                        workplace.week[e.date].entryTimeTable[i].busy = true;
                        if (i == e.start) {

                            workplace.week[e.date].entryTimeTable[i].usedTime = this.getUsedTime(e.start, e.qty);
                            workplace.week[e.date].entryTimeTable[i].userId = e.user._id;
                            workplace.week[e.date].entryTimeTable[i].service = e.stuffNameL && e.stuffNameL[lang] ? e.stuffNameL[lang] : e.stuffName;
                            workplace.week[e.date].entryTimeTable[i].serviceLink = e.stuffLink;
                            workplace.week[e.date].entryTimeTable[i].masterLink = '/master/' + e.masterUrl;
                            workplace.week[e.date].entryTimeTable[i].masterName = e.masterNameL && e.masterNameL[lang] ? e.masterNameL[lang] : e.masterName;
                            workplace.week[e.date].entryTimeTable[i].masters = e.masters ? e.masters : null;

                            workplace.week[e.date].entryTimeTable[i].new = true;
                            workplace.week[e.date].entryTimeTable[i].qty = e.qty;
                            workplace.week[e.date].entryTimeTable[i].used = e.used;
                            workplace.week[e.date].entryTimeTable[i].confirm = e.confirm;
                            workplace.week[e.date].entryTimeTable[i].comment = e.comment;
                            workplace.week[e.date].entryTimeTable[i].zIndex = 1;
                            e.usedTime = workplace.week[e.date].entryTimeTable[i].usedTime;
                            workplace.week[e.date].entryTimeTable[i].stringify = JSON.stringify(e);
                        }
                        if (e.service.backgroundcolor) {
                            workplace.week[e.date].entryTimeTable[i].backgroundcolor = e.service.backgroundcolor;
                        } else {
                            workplace.week[e.date].entryTimeTable[i].backgroundcolor = null;
                        }

                        if (i != e.start) {
                            workplace.week[e.date].entryTimeTable[i].noBorder = true;
                        }
                        workplace.week[e.date].entryTimeTable[i].entry = e;
                    }
                }
                var startTimeParts = this.startTimeParts;
                var endTimeParts = this.endTimeParts;
                var timePartsI = this.timePartsI;
                for (var d in workplace.week) {
                    workplace.week[d].entryTimeTable = workplace.week[d].entryTimeTable.filter(function (part) {
                        if (timePartsI.indexOf(part.i) < 0) {
                            return;
                        }
                        return part.i >= startTimeParts && part.i < endTimeParts;
                    });
                }

                return workplace.week;
            }
        }, {
            key: 'getUsedTime',
            value: function getUsedTime(start, qty) {
                var end = start + qty;
                var h = Math.floor(start / 4);
                var m = (start - h * 4) * 15 || '00';
                var h1 = Math.floor(end / 4);
                var m1 = (end - h1 * 4) * 15 || '00';
                return h + '.' + m + ' - ' + h1 + '.' + m1;
            }
        }, {
            key: 'getTimePartsForTable',
            value: function getTimePartsForTable() {
                var startTimeParts = this.startTimeParts;
                var endTimeParts = this.endTimeParts;
                var timeTable15min = this.timeTable15min;
                var tempArr = this.timePartsForTable.filter(function (part) {
                    return part.i >= startTimeParts && part.i < endTimeParts;
                });
                return tempArr.map(function (el) {
                    return timeTable15min[el.i];
                });
            }
        }]);

        return BookingCLass;
    }();

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if (typeof window !== 'undefined') {
        window.BookingCLass = BookingCLass;
    } else {
        var moment = require('moment');
        exports.init = BookingCLass;
    }
})();
//# sourceMappingURL=BookingClass.js.map