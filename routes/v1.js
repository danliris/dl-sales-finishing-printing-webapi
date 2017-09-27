// SALES CONTRACT
var v1SalesContractRouter = require('../src/routers/v1/sales-contract-router');
var v1SalesContractReportRouter = require('../src/routers/v1/reports/sales-contract-report-router');
var v1SalesContractByNumberRouter = require('../src/routers/v1/sales-contract-by-number-router');

// PRODUCTION ORDER
var v1ProductionOrderRouter = require('../src/routers/v1/production-order-router');
var v1ProductionOrderBySalesContractNumber = require('../src/routers/v1/production-order-by-sales-contract-number-router');
var v1ProductionOrderReportRouter = require('../src/routers/v1/reports/production-order-report-router');
var v1ProductionOrderDetailReportRouter = require('../src/routers/v1/reports/production-order-detail-report-router');

module.exports = function(server) {
    v1SalesContractRouter().applyRoutes(server,                             "/v1/sales-contracts");
    v1SalesContractReportRouter().applyRoutes(server,                       "/v1/reports/sales-contract-reports");
    v1SalesContractByNumberRouter().applyRoutes(server,                     "/v1/sales-contract-by-number");

    v1ProductionOrderRouter().applyRoutes(server,                           "/v1/production-orders");
    v1ProductionOrderBySalesContractNumber().applyRoutes(server,            "/v1/production-orders-by-sales-contract-number");
    v1ProductionOrderReportRouter().applyRoutes(server,                     "/v1/reports/production-order-reports");
    v1ProductionOrderDetailReportRouter().applyRoutes(server,               "/v1/reports/production-order-reports/detail");
};