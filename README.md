# Drag-drop-datatable
# This is drag-drop plugin for datatable 
# We can to drog and drop siggle row or more rows on datatable
# There is one point we should to pay more attentions
```javascript
'createdRow': function (row, data, dataIndex) {
     $(row).attr('category', data.category);
         if (data.category == "A") {
             $(row).attr('draggable', true);
          }
      }
```
# As the code writed ,drag-drap siggle row or more rows is based on category
# IF all of the rows are seem category, we only can drag-drop siggle row
# IF some rows category properties are "A" and some rows category properties are "B",So we think category "B" rows Are Blong to category "A" rows,so we can drag-drop more rows
