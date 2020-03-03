//// Delgetstei ajillah controller

var uiController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expensesList: ".expenses__list",
    tusuvLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expeseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    containerDiv: ".container",
    expensePercentageLabel: ".item__percentage",
    dateLabel: ".budget__title--month"
  };

  var nodeListForeach = function(list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };
  var formatMoney = function(too) {};
  return {
    displayDate: function() {
      var unuudur = new Date();
      document.querySelector(DOMstrings.dateLabel).textContent =
        unuudur.getMonth() + " сарын өрхийн төсөв";
    },
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value)
      };
    },
    displayPercentages: function(allPercentages) {
      //// Zarlagiin NodeList-iig olgoh
      var elements = document.querySelectorAll(
        DOMstrings.expensePercentageLabel
      );
      //// Element bolgonii hubid zarlagiin hubiig massive-ees abch shivj oruulna
      nodeListForeach(elements, function(el, index) {
        el.textContent = allPercentages[index];
      });
    },
    getDOMstrings: function() {
      return DOMstrings;
    },
    clearFields: function() {
      var fields = document.querySelectorAll(
        DOMstrings.inputDescription + "," + DOMstrings.inputValue
      );
      //// Convert list to array
      var fieldsArr = Array.prototype.slice.call(fields);
      // for (var i = 0; i < fieldsArr.length; i++) {
      //   fieldsArr[i].value = "";
      // }
      fieldsArr.forEach(function(el, index, array) {
        el.value = "";
      });
      fieldsArr[0].focus();
    },
    tusviigUzuuleh: function(tusuv) {
      document.querySelector(DOMstrings.tusuvLabel).textContent = tusuv.tusuv;
      document.querySelector(DOMstrings.incomeLabel).textContent =
        tusuv.totalInc;
      document.querySelector(DOMstrings.expeseLabel).textContent =
        tusuv.totalExp;
      if (tusuv.huvi !== 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          tusuv.huvi + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          tusuv.huvi;
      }
    },
    deletListItem: function(id) {
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },
    addListItem: function(item, type) {
      //// 1. Orlogo zarlagiin element aguulsan HTML-iig beltgene
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = DOMstrings.expensesList;
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
    this.percentage = -1;
  };
  Expense.prototype.calcPercentage = function(totalInc) {
    if (totalInc > 0)
      this.percentage = Math.round((this.value / totalInc) * 100);
    else this.percentage = 0;
  };
  Expense.prototype.getPercentage = function() {
    return this.percentage;
  };
  //// tosob tootsooloh function
  var calculateTotal = function(type) {
    var sum = 0;
    data.items[type].forEach(function(el) {
      sum = sum + el.value;
    });

    data.totals[type] = sum;
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
    },
    tusuv: 0,
    huvi: 0
  };
  return {
    tusuvTootsooloh: function() {
      //// Niit orlogo , zarlagiin niilberiig tootsoolno
      calculateTotal("inc");
      calculateTotal("exp");
      ////Tosov bodoj bn
      data.tusuv = data.totals.inc - data.totals.exp;
      ////Orlogo, zarlagiin huv-iig tootsoolj bn
      if (data.totals.inc > 0)
        data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
      else data.huvi = 0;
    },
    calculatePercentages: function() {
      data.items.exp.forEach(function(el) {
        el.calcPercentage(data.totals.inc);
      });
    },
    getPercentages: function() {
      var allPercentages = data.items.exp.map(function(el) {
        return el.getPercentage();
      });
      return allPercentages;
    },
    tusviigAvah: function() {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp
      };
    },
    deleteItem: function(type, id) {
      var ids = data.items[type].map(function(el) {
        return el.id;
      });
      var index = ids.indexOf(id);
      if (index !== -1) {
        data.items[type].splice(index, 1);
      }
    },
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
    },
    seeData: function() {
      return data;
    }
  };
})();
//// holboj ajillah controller
var appController = (function(uiController, financeController) {
  var ctrlAddItem = function() {
    //// 1. Oruulah ogogdoliig beldetsees olj abna
    var input = uiController.getInput();
    if (input.description !== "" && input.value !== "") {
      //// 2. Olj absan ogogdoloo sanhuugiin controller ruu damjuulj hadgalna
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );
      //// 3. Olj absan ogogdoliig tohiroh hesegt gargana
      uiController.addListItem(item, input.type);
      uiController.clearFields();
      //// Tosobiig shineer tootsooolood delgetsend gargana.
      updateTusuv();
    }
  };
  var updateTusuv = function() {
    //// 4. Tosobiig tootsoolno
    financeController.tusuvTootsooloh();
    //// 5. Uldegdel tootsoog  gargana
    var tusuv = financeController.tusviigAvah();
    //// 6. delgetsend gargana

    uiController.tusviigUzuuleh(tusuv);
    //// 7. Elementuudiin hubiig tootsoolno
    financeController.calculatePercentages();
    //// 8. Elementuudiin hubiig huleej abn
    var allPercentages = financeController.getPercentages();
    //// 9. Edgeeriig delgetsend garnaa
    uiController.displayPercentages(allPercentages);
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
    document
      .querySelector(DOM.containerDiv)
      .addEventListener("click", function(event) {
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (id) {
          var arr = id.split("-");
          var type = arr[0];
          var itemId = parseInt(arr[1]);
          //// 1. Sanhuugiin modelu-aas type , id ashiglaad ustgana
          financeController.deleteItem(type, itemId);
          //// 2. Delgets deerees ustgana
          uiController.deletListItem(id);
          //// 3. Uldegdel tootsoog shinechilj haruulna
          //// Tosobiig shineer tootsooolood delgetsend gargana.
          updateTusuv();
        }
      });
  };
  return {
    //// Application start function
    init: function() {
      console.log("Application start ....");
      uiController.displayDate();
      uiController.tusviigUzuuleh({
        tusuv: 0,
        huvi: 0,
        totalInc: 0,
        totalExp: 0
      });
      setupEventListeners();
    }
  };
})(uiController, financeController);
//// Application start function-iig duudaj bn
appController.init();
