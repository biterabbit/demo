window.onload = function() {
  var lists = [
    {
      id: "1",
      state: "complete",
      todo: "吃饭"
    },
    { id: "2", state: "uncomplete", todo: "睡觉" },
    { id: "3", state: "complete", todo: "LOL" },
    { id: "4", state: "uncomplete", todo: "约会" }
  ];
  var choseAll = document.querySelector(".add label");
  var add = document.querySelector(".add form");
  var allList = document.querySelector(".alllist ul");
  var all = document.querySelector(".footer .all");
  var uncomplete = document.querySelector(".footer .uncomplete");
  var completed = document.querySelector(".footer .completed");
  var filterLi = document.querySelector(".footer .filter ul");
  var clearComplete = document.querySelector(".footer .clear");
  /**初始渲染 */
  showLists(lists);
  countTodo(lists);
  /**筛选按钮及清空完成项 */
  all.addEventListener("click", function() {
    showLists(lists);
  });

  completed.addEventListener("click", function() {
    clists = lists.filter(function(i) {
      return i.state == "complete";
    });
    showLists(clists);
  });

  uncomplete.addEventListener("click", function() {
    uclists = lists.filter(function(i) {
      return i.state == "uncomplete";
    });
    showLists(uclists);
  });

  clearComplete.addEventListener("click", function() {
    lists = lists.filter(function(i) {
      return i.state !== "complete";
    });
    showLists(lists);
  });
  /**(事件委托)点击改变样式 */
  filterLi.addEventListener("click", function(e) {
    var ev = e || window.event;
    var target = ev.target || ev.srcElement;
    var targetName = target.nodeName.toLowerCase();
    if (targetName == "a") {
      allLi = target.parentNode.parentNode.querySelectorAll("li");
      for (var i = 0; i < allLi.length; i++) {
        allLi[i].classList.remove("active");
      }
      target.parentNode.classList.add("active");
    }
  });
  /**(事件委托)勾选完成及删除按钮 */
  allList.addEventListener("click", function(e) {
    var ev = e || window.event;
    var target = ev.target || ev.srcElement;
    var targetName = target.nodeName.toLowerCase();
    if (targetName == "input" || targetName == "button") {
      lists = changeRecord(target, lists);
      showLists(lists);
      countTodo(lists);
    }
  });

  /**添加todo */
  add.addEventListener("submit", function() {
    if (add.querySelector(".addText").value == "") {
      alert("输入不能为空");
    } else {
      var maxId = 0;
      for (var i = 0, len = lists.length; i < len; i++) {
        if (lists[i].id > maxId) {
          maxId = lists[i].id;
        }
      }
      lists.push({
        id: (maxId + 1).toString(),
        state: "uncomplete",
        todo: add.querySelector(".addText").value
      });
      showLists(lists);
      countTodo(lists);
      add.querySelector(".addText").value = "";
    }
  });
  /**全选 */
  choseAll.addEventListener("click", function() {
    flag = lists.filter(function(i) {
      return i.state === "uncomplete";
    });
    if (flag.length) {
      lists.forEach(function(i) {
        i.state = "complete";
      });
    } else {
      lists.forEach(function(i) {
        i.state = "uncomplete";
      });
    }
    showLists(lists);
  });
};
/**左下角数字 */
function countTodo(lists) {
  count = lists.filter(function(i) {
    //筛选出未完成项
    return i.state == "uncomplete";
  });
  document.querySelector(".footer .count span").innerHTML = count.length;
}
/**数据渲染 */
function showLists(lists) {
  var allList = document.querySelector(".alllist ul");
  allList.innerHTML = ""; //清空页面数据
  for (var i = 0, len = lists.length; i < len; i++) {
    item = lists[i].todo;
    index = lists[i].id;
    libox = document.createElement("li");
    if (lists[i].state === "complete") {
      //判断数据位置
      libox.classList.add("complete");
      libox.innerHTML =
        "<label>" +
        index +
        '</label><input type="checkbox" checked/> <span>' +
        item +
        "</span><button>删除</button>";
    } else {
      libox.classList.remove("complete");
      libox.innerHTML =
        "<label>" +
        index +
        '</label><input type="checkbox"/> <span>' +
        item +
        "</span><button>删除</button>";
    }
    allList.appendChild(libox);
  }
}
/**数据修改 */
function changeRecord(target, lists) {
  if (target.nodeName.toLowerCase() == "button") {
    //删除按钮
    var index = target.parentNode.querySelector("label").innerHTML;
    changelist2 = lists.filter(function(i) {
      //筛选出非选中项返回
      return i.id !== index;
    });
    return changelist2;
  }
  if (target.nodeName.toLowerCase() == "input") {
    //勾选框
    var index = target.parentNode.querySelector("label").innerHTML;
    lists.forEach(function(i) {
      if (i.id == index) {
        if (i.state === "complete") {
          i.state = "uncomplete";
        } else {
          i.state = "complete";
        }
      }
    });
    return lists;
  }
}
