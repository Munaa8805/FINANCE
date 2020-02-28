//// Delgetstei ajillah controller

var uiController = (function() {
  var x = 100;

  function add(y) {
    return x + y;
  }

  return {
    publicAdd: function(a) {
      a = add(a);
      console.log("Боловсруулсан утга : " + a);
    }
  };
})();
//// Finance ajillah controller
var financeController = (function() {})();
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
  document.querySelector(".add__btn").addEventListener("click", function() {
    ctrlAddItem();
  });
  document.addEventListener("keypress", function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
  uiController.publicAdd(150);
})(uiController, financeController);
