// SALES CONTRACT
var salesContractRouter = require('../src/routers/v1/sales-contract-router');
var salesContractReportRouter = require('../src/routers/v1/reports/sales-contract-report-router');
var salesContractByNumberRouter = require('../src/routers/v1/sales-contract-by-number-router');

// PRODUCTION ORDER
var productionOrderRouter = require('../src/routers/v1/production-order-router');
var productionOrderBySalesContractNumber = require('../src/routers/v1/production-order-by-sales-contract-number-router');
var productionOrderReportRouter = require('../src/routers/v1/reports/production-order-report-router');
var productionOrderDetailReportRouter = require('../src/routers/v1/reports/production-order-detail-report-router');

module.exports = function(server) {
    salesContractRouter().applyRoutes(server,                               "/sales-contracts");
    salesContractReportRouter().applyRoutes(server,                         "/reports/sales-contract-reports");
    salesContractByNumberRouter().applyRoutes(server,                       "/sales-contract-by-number");
    
    productionOrderRouter().applyRoutes(server,                             "/production-orders");
    productionOrderBySalesContractNumber().applyRoutes(server,              "/production-orders-by-sales-contract-number");
    productionOrderReportRouter().applyRoutes(server,                       "/reports/production-order-reports");
    productionOrderDetailReportRouter().applyRoutes(server,                 "/reports/production-order-reports/detail");
};