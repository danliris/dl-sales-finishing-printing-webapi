 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/sales-contracts",
     model: require("dl-models").sales.FinishingPrintingSalesContract,
     validate: require("dl-models").validator.sales.finishingPrintingSalesContract,
     util: require("dl-module").test.data.sales.finishingPrintingSalesContract,
     keyword: null
 });