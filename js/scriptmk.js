var slistmk = {
    // (A) INITIALIZE SHOPPING LIST
    mkitems : [],   // current shopping list
    hform : null, // html add item <form>
    hitem : null, // html add item <input> field
    hadd : null,  // html add item submit button
    hlist : null, // html <div> shopping list
    init : () => {
      // (A1) GET HTML ELEMENTS
      slistmk.hform = document.getElementById("mk-form");
      slistmk.hitem = document.getElementById("mk-item");
      slistmk.hprice = document.getElementById("mk-price");
      slistmk.hadd = document.getElementById("mk-add");
      slistmk.hlist = document.getElementById("mk-list");
  
      // (A2) "ACTIVATE" HTML ADD ITEM FORM
      slistmk.hitem.setAttribute("autocomplete", "off");
      slistmk.hform.onsubmit = slistmk.add;
      slistmk.hitem.disabled = false;
      slistmk.hadd.disabled = false;
  
      // (A3) RESTORE PREVIOUS SHOPPING LIST
      if (localStorage.mkitems == undefined) { localStorage.mkitems = "[]"; }
      slistmk.mkitems = JSON.parse(localStorage.mkitems);
  
      // (A4) DRAW HTML SHOPPING LIST
      slistmk.draw();
    },
  
    // (B) SAVE SHOPPING LIST INTO LOCAL STORAGE
    save : () => {
      if (localStorage.mkitems == undefined) { localStorage.mkitems = "[]"; }
      localStorage.mkitems = JSON.stringify(slistmk.mkitems);
    },
  
    // (C) ADD NEW ITEM TO THE LIST
    add : (evt) => {
      // (C1) PREVENT FORM SUBMIT
      evt.preventDefault();
  if (slistmk.hprice.value == 0) 
  {
    alert("Prisen må være større enn 0");
  }
  else {
  // (C2) ADD NEW ITEM TO LIST
  slistmk.mkitems.push({
    name : slistmk.hitem.value, // item name
    price : slistmk.hprice.value, // item name
    done : false // true for "got it", false for "not yet"
  });
  slistmk.hitem.value = "";
  slistmk.save();

  // (C3) REDRAW HTML SHOPPING LIST
  slistmk.draw();

  }
        },
  
    // (D) DELETE SELECTED ITEM
    delete : (id) => { if (confirm("Remove this item?")) {
      slistmk.mkitems.splice(id, 1);
      slistmk.save();
      slistmk.draw();
    }},
  
    // (E) TOGGLE ITEM BETWEEN "GOT IT" OR "NOT YET"
    toggle : (id) => {
      slistmk.mkitems[id].done = !slistmk.mkitems[id].done;
      slistmk.save();
      slistmk.draw();
    },
  
    // (F) DRAW THE HTML SHOPPING LIST
    draw : () => {

      let sum = 0;
      // (F1) RESET HTML LIST
      slistmk.hlist.innerHTML = "";
  
      // (F2) NO ITEMS
      if (slistmk.mkitems.length == 0) {
        slistmk.hlist.innerHTML = "<div class='item-row item-name'>No items found.</div>";
      }
  
      // (F3) DRAW ITEMS
      else {
        for (let i in slistmk.mkitems) {
          // ITEM ROW
          let row = document.createElement("div");
          row.className = "item-row";
          slistmk.hlist.appendChild(row);
  
          // ITEM NAME
          let name = document.createElement("div");
          name.innerHTML = slistmk.mkitems[i].name + "Pris: " + slistmk.mkitems[i].price;
          sum = sum + parseInt(slistmk.mkitems[i].price);
          name.className = "item-name";
          if (slistmk.mkitems[i].done) { name.classList.add("item-got"); }
          row.appendChild(name);
  
          // DELETE BUTTON
          let del = document.createElement("input");
          del.className = "item-del";
          del.type = "button";
          del.value = "Delete";;
          del.onclick = () => { slistmk.delete(i); };
          row.appendChild(del);
  
          // COMPLETED/NOT YET BUTTON
          let ok = document.createElement("input");
          ok.className = "item-ok";
          ok.type = "button";
          ok.value = slistmk.mkitems[i].done ? "Not Yet" : "Got It";
          ok.onclick = () => { slistgt.toggle(i); };
          row.appendChild(ok);

        }
      }
      let sumrow = document.createElement("div");
          sumrow.innerHTML = "SUM VARER NÅ: " + sum;
          slistmk.hlist.appendChild(sumrow);
    }
  };

  function welcome() {
    alert('Velkommen til handlelisteappen\nHer kan du organisere innkjøpene dine')

  }

  function isNumber(evt) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode
    if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57)) {
      alert("Kun nummer tillatt i dette feltet"); 
      return false;
      }
    return true;
}

function biggerThanZero() {
  var price = document.getElementById("mk-price");
  alert(price);
}
  
    window.addEventListener("load", slist.init );
    window.addEventListener("load", slistgt.init );
    window.addEventListener("load", slistmk.init );

   