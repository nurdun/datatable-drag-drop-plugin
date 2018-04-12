class TableDragAndDrop{
    constructor(selector,data,table){
        this.arr = [];
        this.dataType = '';
        this.data = data;
        this.datatable = table;
        this.initEvents(selector);
    }
    initEvents(selector){
        this.dragOverEvents(selector);
        this.dragStartEvents(selector);
        this.dropEvents(selector);
    }
    dragOverEvents(selector){
        $(selector + ' tbody').on("dragover","tr", function(event){
            event.originalEvent.preventDefault();
        });
    }
    dragStartEvents(selector){
        let _that = this;
        $(selector + ' tbody').on("dragstart","tr", function(event){
            _that.arr = [];
            let ev = event.originalEvent;    
            let index = _that.datatable.row( this ).index();
            _that.dataType = this.getAttribute('category');
            ev.dataTransfer.setData("index", index);
            let nextDataType;
            do {
                index++;
                nextDataType = _that.datatable.rows(index).nodes()[0].getAttribute('category');
                _that.arr.push(index-1);
            } while (nextDataType != _that.dataType);
        });
    }
    dropEvents(selector){
        let _that = this;
        $(selector + ' tbody').on("drop","tr", function(event){
            let testData = _that.data;
            let newTestData = null;
            let dataType = '';
            let nextArr = [];
            let nextArrObj = [];
            Array.prototype.insert = function (index, item) {
                this.splice(index, 0, item);
            };
            let newArr = [];
            let ev = event.originalEvent;
            ev.preventDefault();

            let index=ev.dataTransfer.getData("index");
            let idx = _that.datatable.row( this ).index();
            dataType = this.getAttribute('category');
            if(dataType == _that.dataType){
                let currentIdx = idx;
                let nextDataType;
                do {
                    currentIdx++;
                    nextDataType = _that.datatable.rows(currentIdx).nodes()[0].getAttribute('category');
                    nextArr.push(currentIdx-1);
                } while (nextDataType != dataType);
                for(let i in _that.arr){
                    newArr.push(testData[_that.arr[i]]);
                }
                for(let i in nextArr){
                    nextArrObj.push(testData[nextArr[i]]);
                }
                testData.splice(_that.arr[0], _that.arr.length);
                for(let i in nextArrObj){
                    if(i<nextArrObj.length-1){
                        testData.insert((Number(index)+Number(i)),nextArrObj[i]);
                    }
                }
                if(idx>=index){
                    testData.splice(idx-(_that.arr.length-nextArr.length), nextArr.length);
                    for(let i in newArr){
                        if(i<newArr.length-1){
                            testData.insert((idx+Number(i)+nextArr.length)-_that.arr.length,newArr[i]);
                        }
                    }
                }else {
                    testData.splice(idx, nextArr.length);
                    for(let i in newArr){
                        if(i<newArr.length-1){
                            testData.insert(idx+Number(i),newArr[i]);
                        }
                    }
                }
                newTestData = testData;
                this.data = newTestData;
                _that.datatable.clear();
                _that.datatable.rows.add(newTestData); // Add new data
                _that.datatable.columns.adjust().draw();
            }
        });
    }
}
