// var paging = require('../src/pagination');

init({
    amountList: '#amount',
    placehodler: '#placehodler',
    tabBar: '#tabBar',
    pagination: '#pagination',
    pageNum: '#pageNum',
    firstPage: '#firstPage',
    lastPage: '#lastPage',
    prePage: '#previousPage',
    nextPage: '#nextPage',
    pageAmount: '#totalPage',
    amount: 200,
    limit: 8,
    page: 1,
    maxPageBtn: 9,
    onClick: function (page, e) {
        alert('您当前处理的是第' + page + '页');
        // searchUsers(keyword, page, limit, onSuccess, onFail);
    },
});