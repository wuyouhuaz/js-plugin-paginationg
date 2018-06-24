;
'use strict';
let totalPage, page, limit, maxPageBtn, amount;
const MAXLIST = 1000; //服务器限制list数量

// const output = {
//     init,
// };

function init(config) {
    amountList = document.querySelector(config.amountList);
    placeholer = document.querySelector(config.placeholer);
    tabBar = document.querySelector(config.tabBar);
    pagination = document.querySelector(config.pagination);
    pageNum = document.querySelector(config.pageNum);
    firstPage = document.querySelector(config.firstPage);
    lastPage = document.querySelector(config.lastPage);
    prePage = document.querySelector(config.prePage);
    nextPage = document.querySelector(config.nextPage);
    pageAmount = document.querySelector(config.pageAmount);
    amount = config.amount;
    page = config.page;
    limit = config.limit;
    maxPageBtn = config.maxPageBtn;
    onClick = config.onClick;
    getTotalPage();
    // noMoreData();
    btnDisabled();
    clickPagingBtn();
    backToPage();
}

function getTotalPage() {
    if (amount < MAXLIST) {
        totalPage = Math.ceil(amount / limit);
        // amountList.innerHTML = `共有${amount}条结果`;
    } else {
        totalPage = Math.ceil(1000 / limit);
        // amountList.innerHTML = `共有1000条结果`;
    }
}

function setPagingBtn() {
    let start, end, middle = Math.ceil(maxPageBtn / 2),
        nearLeft = page <= middle,
        nearRight = page >= totalPage - middle;
    if (nearLeft) {
        start = 1;
        end = maxPageBtn;
    } else if (nearRight) {
        start = totalPage - maxPageBtn;
        end = totalPage;
    } else {
        start = page - middle + 1;
        end = page + middle - 1;
    }
    if (start < 1) {
        start = 1;
    }
    if (end > totalPage) {
        end = totalPage;
    }
    return [start, end];
}

// function noMoreData() {
//     let noMore = page * limit >= amount;
//     noMore ? placeholer.hidden = false : placeholer.hidden = true;
// }

function btnDisabled() {
    if (totalPage == 1) {
        firstPage.disabled = true;
        lastPage.disabled = true;
        prePage.disabled = true;
        nextPage.disabled = true;
    }
    if (totalPage > 1) {
        if (page == 1) {
            firstPage.disabled = true;
            lastPage.disabled = false;
            prePage.disabled = true;
            nextPage.disabled = false;
        } else if (page > 1 && page < totalPage) {
            firstPage.disabled = false;
            lastPage.disabled = false;
            prePage.disabled = false;
            nextPage.disabled = false;
        } else if (page == totalPage) {
            firstPage.disabled = false;
            lastPage.disabled = true;
            prePage.disabled = false;
            nextPage.disabled = true;
        }
    }
}

function clearPagingBtn() {
    pagination.innerHTML = '';
}

function clickPagingBtn() {
    clearPagingBtn();
    let startEnd = setPagingBtn();
    pageAmount.innerHTML = `共有${totalPage}页`;
    pageNum.innerHTML = `第${page}页`;
    for (let i = startEnd[0]; i <= startEnd[1]; i++) {
        var btn = document.createElement('button');
        btn.innerText = i;
        btn.dataset.page = i;
        btn.classList.add('pager');
        if (i == page)
            btn.classList.add('active');
        pagination.appendChild(btn);
        btn.addEventListener('click', function (e) {
            page = parseInt(e.currentTarget.dataset.page);
            clickPagingBtn();
            btnDisabled();
            onClick(page);
        });
    }
}

function backToPage() {
    //返回首页
    firstPage.addEventListener('click', function (e) {
        page = 1;
        clickPagingBtn();
        btnDisabled();
        if (onClick)
            onClick(page);
    });
    //返回尾页
    lastPage.addEventListener('click', function (e) {
        page = totalPage;
        clickPagingBtn();
        btnDisabled();
        if (onClick)
            onClick(page);
    });
    //返回上一页
    prePage.addEventListener('click', function (e) {
        page = page - 1;
        clickPagingBtn();
        btnDisabled();
        if (onClick)
            onClick(page);
    });
    //返回下一页
    nextPage.addEventListener('click', function (e) {
        page = page + 1;
        clickPagingBtn();
        btnDisabled();
        if (onClick)
            onClick(page);
    });
}

// module.exports = output;