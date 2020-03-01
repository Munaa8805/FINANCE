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
    },
    addListItem: function(item, type) {
      //// 1. Orlogo zarlagiin element aguulsan HTML-iig beltgene
      var html, list;
      if (type === "inc") {
        list = ".income__list";
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = ".expenses__list";
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">                <i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //// 2. Ter HTML dotoroo orlogo zarlagiin utguudiig replace ashiglaj oorchilno
      html = html.replace("%id%", item.id);
      html = html.replace("$$DESCRIPTION$$", item.description);
      html = html.replace("$$VALUE$$", item.value);

      //// 3. Beltgesen HTML-ee delgetse
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
    }
  };
})();
//// Finance ajillah controller
//// private function
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
    items: {
      inc: [],
      exp: []
    },
    totals: {
      inc: 0,
      exp: 0
    }
  };
  return {
    addItem: function(type, desc, val) {
      var item, id;
      //// ID shine id uusgej bn
      if (data.items[type].length === 0) {
        id = 1;
      } else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }
      //// Orlogo zarlagiin nohtsol shalgaj bn
      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }
      data.items[type].push(item);
      return item;
    }
  };
})();
//// holboj ajillah controller
var appController = (function(uiController, financeController) {
  var ctrlAddItem = function() {
    //// 1. Oruulah ogogdoliig beldetsees olj abna
    var input = uiController.getInput();
    //// 2. Olj absan ogogdoloo sanhuugiin controller ruu damjuulj hadgalna
    var item = financeController.addItem(
      input.type,
      input.description,
      input.value
    );
    //// 3. Olj absan ogogdoliig tohiroh hesegt gargana
    uiController.addListItem(item, input.type);
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
