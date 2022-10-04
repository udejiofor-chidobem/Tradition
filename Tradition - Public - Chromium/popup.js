function dodge(){
    console.log("New Array Sequence");
    chrome.storage.sync.get({names: []}, function(result){
        var nams = result.names;
        var className = nams.pop();
        console.log(nams + "Names");
        Array.from(nams).forEach(element => {
            var row = document.createElement("tr");
            var dat = document.createElement("td");
            row.appendChild(dat);
            var lab = document.createElement("label");
            lab.style ="font-family: Sans-serif, Helvetica; font-size: 20px;";
            lab.innerHTML = element;
            dat.appendChild(lab);
            var dat = document.createElement("td");
            var labo = document.createElement("input");
            labo.type = "text";
            labo.classList.add("in");
            row.appendChild(labo);
            console.log("Element Made");
            document.getElementById("fort").appendChild(row);
        });
        document.getElementById("set").onclick = function(){
            var weights = [];
            Array.from(document.getElementsByClassName("in")).forEach(element => {
                weights.push((+element.value)/100);
                console.log("value pushed");
            });
            var arr = [className];
            for(var i = 1; i <= nams.length; i++){
                arr[i] = [nams[i-1],weights[i-1]];
            }
            console.log(arr);
            chrome.storage.sync.set({classes: [[],arr]},function() {
                chrome.storage.sync.get('classes', function(result){
                    console.log("Result");
                    var out = result.classes;
                    console.log(out);
                });
            });
            setTimeout(() => {window.close()},500);
        }
    });
};
chrome.storage.sync.getBytesInUse(['classes'], function(bytes){
    console.log(bytes);
    if(bytes != 0){
        console.log("Old Array");
        chrome.storage.sync.get({classes: []}, function(result){
            var inh = result.classes;
            console.log(inh);
            if(!Array.isArray(inh)){
                console.log("Skipping");
                dodge(inh);
            } else {
                chrome.storage.sync.get({names: []}, function(result){
                    var nams = result.names;
                    var className = nams.pop();
                    console.log("Names");
                    console.log(nams);
                    Array.from(nams).forEach(element => {
                        var row = document.createElement("tr");
                        var dat = document.createElement("td");
                        row.appendChild(dat);
                        var lab = document.createElement("label");
                        lab.style ="font-family: Sans-serif, Helvetica; font-size: 20px;";
                        lab.innerHTML = element;
                        dat.appendChild(lab);
                        var dat = document.createElement("td");
                        var labo = document.createElement("input");
                        labo.type = "text";
                        labo.classList.add("in");
                        row.appendChild(labo);
                        console.log("Element Made");
                        document.getElementById("fort").appendChild(row);
                    });
                    
                    document.getElementById("set").onclick = function(){
                        //Identify whether array is new
                        var replace = false;
                        var inx = 0;
                        for(var i = 0; i < inh.length; i++) {
                            if(inh[i][0] == className){
                                replace = true;
                                inx = i;
                                console.log("Old");
                                break;
                            }
                        }
                        var weights = [];
                        Array.from(document.getElementsByClassName("in")).forEach(element => {
                            weights.push((+element.value)/100);
                            console.log("value pushed");
                        });
                        var arr = [className];
                        for(var i = 1; i < weights.length; i++){
                            arr[i] = [nams[i-1],weights[i-1]];
                        }
                        console.log("New Array");
                        console.log(arr);
                        if(replace){
                            inh[inx] = arr;
                        } else {
                        inh.push(arr);
                        }
                        chrome.storage.sync.set({classes: inh},function() {
                            chrome.storage.sync.get('classes', function(result){
                                console.log("Result");
                                var out = result.classes;
                                console.log(out);
                            });
                        });
                        setTimeout(() => {window.close()},500);
                    }
                });
            }
        });
    }
    else {
        dodge();
    }
});