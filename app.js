//// Delgetstei ajillah controller

var uiController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn"
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();
//// Finance ajillah controller
var financeController = (function() {
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  //// Orlogo zarlagiig hadgaldag hubisagch
  var data = {
    allItems: {
      inc: [],
      exp: []
    },
    totals: {
      inc: 0,
      exp: 0
    }
  };
})();
//// holboj ajillah controller
var appController = (function(uiController, financeController) {
  var ctrlAddItem = function() {
    //// 1. Oruulah ogogdoliig beldetsees olj abna
    console.log("Enter darlaa");
    //// 2. Olj absan ogogdoloo sanhuugiin controller ruu damjuulj hadgalna
    //// 3. Olj absan ogogdoliig tohiroh hesegt gargana
    //// 4. Tosobiig tootsoolno
    //// 5. Uldegdel tootsoog delgetsend gargana
  };
  var setupEventListeners = function() {
    //// getDOMstrings-ees tobch bolon class ruu handah bolomjiig olgoj bn
    var DOM = uiController.getDOMstrings();
    document.querySelector(DOM.addBtn).addEventListener("click", function() {
      ctrlAddItem();
    });
    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  return {
    //// Application start function
    init: function() {
      console.log("Application start ....");
      setupEventListeners();
    }
  };
})(uiController, financeController);
//// Application start function-iig duudaj bn
appController.init();
