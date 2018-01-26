$('#demo').pagination({
    dataSource: 'https://min-api.cryptocompare.com/data/all/coinlist',
    locator: 'items',
    totalNumberLocator: function(response) {
        // you can return totalNumber by analyzing response content
        return Math.floor(Math.random() * (1000 - 100)) + 100;
    },
    pageSize: 8,
    ajax: {
        beforeSend: function() {
            dataContainer.html('Loading data from aaa.com ...');
        }
    },
    callback: function(data, pagination) {
        // template method of yourself
        var html = template(data);
        dataContainer.html(html);
    }
});




// $('#demo').pagination({
//     dataSource: [1, 2, 3, 4, 5, 6, 7, ..., 195],
//     callback: function(data, pagination) {
//         // template method of yourself
//         var html = template(data);
//         dataContainer.html(html);
//     }
// })

