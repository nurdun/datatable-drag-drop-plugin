#### get start
import drag-drop.js file to your page
```javascript
const testData = [
  {
    "MONTH": "2",
    "TIME": "15:00",
    "TEXT": "Blah",
    "category": "A"
  },
  {
    "MONTH": "1",
    "TIME": "14:21",
    "TEXT": "Blah",
    "category": "B"
  },
  {
    "MONTH": "1",
    "TIME": "14:21",
    "TEXT": "Blah",
    "category": "B"
  },
  {
    "MONTH": "4",
    "TIME": "13:00",
    "TEXT": "Blah2",
    "category": "A"
  },
  {
    "MONTH": "6",
    "TIME": "10:00",
    "TEXT": "Blah3",
    "category": "B"
  },
  {
    "MONTH": "7",
    "TIME": "10:00",
    "TEXT": "Blah3",
    "category": "B"
  },
  {
    "MONTH": "4",
    "TIME": "13:00",
    "TEXT": "Blah4",
    "category": "A"
  },
  {
    "MONTH": "6",
    "TIME": "10:00",
    "TEXT": "Blah4",
    "category": "B"
  },
  {
    "MONTH": "7",
    "TIME": "10:00",
    "TEXT": "Blah5",
    "category": "A"
  },
  {
    "MONTH": null,
    "TIME": null,
    "TEXT": null,
    "category": "A"
  }
]
let table = $('#tableId').DataTable({
  'createdRow': function (row, data, dataIndex) {
    $(row).attr('category', data.category);
    if (data.category == "A") {
      $(row).attr('draggable', true);
    }
  },
  data: testData,
  serverSide: false,
  ordering: false,
  columns: [{
    data: 'MONTH',
  }, {
    data: 'TIME',
  }, {
    data: 'TEXT',
  }]
});

let selector = '#tableId';
let dragDroppable = new TableDragAndDrop(selector, testData, table);
```



#### Drag-drop-datatable
This is drag-drop plugin for datatable <br/>
We can to drog and drop siggle row or more rows on datatable <br/>
There is one point we should to pay more attentions <br/>
```javascript
'createdRow': function (row, data, dataIndex) {
     $(row).attr('category', data.category);
         if (data.category == "A") {
             $(row).attr('draggable', true);
          }
      }
```
As the code writed ,drag-drap single row or more rows is based on category properties <br/>
IF all of the rows are same category, we only can drag-drop single row <br/>
IF some rows category properties are "A" and some rows category properties are "B",so we think category "B" rows Are belong to category "A" rows,so we can drag-drop more rows <br/>
