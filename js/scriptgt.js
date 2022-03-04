var slistgt = {
    // (A) INITIALIZE SHOPPING LIST
    gtitems : [],   // current shopping list
    hform : null, // html add item <form>
    hitem : null, // html add item <input> field
    hadd : null,  // html add item submit button
    hlist : null, // html <div> shopping list
    init : () => {
      // (A1) GET HTML ELEMENTS
      slistgt.hform = document.getElementById("gt-form");
      slistgt.hitem = document.getElementById("gt-item");
      slistgt.hadd = document.getElementById("gt-add");
      slistgt.hlist = document.getElementById("gt-list");
  
      // (A2) "ACTIVATE" HTML ADD ITEM FORM
      slistgt.hitem.setAttribute("autocomplete", "off");
      slistgt.hform.onsubmit = slistgt.add;
      slistgt.hitem.disabled = false;
      slistgt.hadd.disabled = false;
  
      // (A3) RESTORE PREVIOUS SHOPPING LIST
      if (localStorage.gtitems == undefined) { localStorage.gtitems = "[]"; }
      slistgt.gtitems = JSON.parse(localStorage.gtitems);
  
      // (A4) DRAW HTML SHOPPING LIST
      slistgt.draw();
    },
  
    // (B) SAVE SHOPPING LIST INTO LOCAL STORAGE
    save : () => {
      if (localStorage.gtitems == undefined) { localStorage.gtitems = "[]"; }
      localStorage.gtitems = JSON.stringify(slistgt.gtitems);
    },
  
    // (C) ADD NEW ITEM TO THE LIST
    add : (evt) => {
      // (C1) PREVENT FORM SUBMIT
      evt.preventDefault();
  
      // (C2) ADD NEW ITEM TO LIST
      slistgt.gtitems.push({
        name : slistgt.hitem.value, // item name
        done : false // true for "got it", false for "not yet"
      });
      slistgt.hitem.value = "";
      slistgt.save();
  
      // (C3) REDRAW HTML SHOPPING LIST
      slistgt.draw();
    },
  
    // (D) DELETE SELECTED ITEM
    delete : (id) => { if (confirm("Remove this item?")) {
      slistgt.gtitems.splice(id, 1);
      slistgt.save();
      slistgt.draw();
    }},
  
    // (E) TOGGLE ITEM BETWEEN "GOT IT" OR "NOT YET"
    toggle : (id) => {
      slistgt.gtitems[id].done = !slistgt.gtitems[id].done;
      slistgt.save();
      slistgt.draw();
    },
  
    // (F) DRAW THE HTML SHOPPING LIST
    draw : () => {
      // (F1) RESET HTML LIST
      slistgt.hlist.innerHTML = "";
  
      // (F2) NO ITEMS
      if (slistgt.gtitems.length == 0) {
        slistgt.hlist.innerHTML = "<div class='item-row item-name'>No items found.</div>";
      }
  
      // (F3) DRAW ITEMS
      else {
        for (let i in slistgt.gtitems) {
          // ITEM ROW
          let row = document.createElement("div");
          row.className = "item-row";
          slistgt.hlist.appendChild(row);
  
          // ITEM NAME
          let name = document.createElement("div");
          name.innerHTML = slistgt.gtitems[i].name;
          name.className = "item-name";
          if (slistgt.gtitems[i].done) { name.classList.add("item-got"); }
          row.appendChild(name);
  
          // DELETE BUTTON
          let del = document.createElement("input");
          del.className = "item-del";
          del.type = "button";
          del.value = "Delete";;
          del.onclick = () => { slistgt.delete(i); };
          row.appendChild(del);
  
          // COMPLETED/NOT YET BUTTON
          let ok = document.createElement("input");
          ok.className = "item-ok";
          ok.type = "button";
          ok.value = slistgt.gtitems[i].done ? "Not Yet" : "Got It";
          ok.onclick = () => { slistgt.toggle(i); };
          row.appendChild(ok);
        }
      }
    }
  };
  

  