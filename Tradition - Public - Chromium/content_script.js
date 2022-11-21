// Rebranding Feature
var im1 = document.createElement("img");
im1.src= chrome.runtime.getURL("images/seal.png");
if(document.getElementById("primaryNavToggle").title.startsWith("Expand global navigation")){
  im1.style.height = "54px";
  im1.style.width = "54px";
}
else{
  im1.style.height = "84px";
  im1.style.width = "85px";
}
im1.id = "imgg";
const elem = document.createElement('a');
elem.href = "https://gatech.instructure.com";
elem.style.height = im1.height;
elem.id = 'new1';
elem.appendChild(im1);
var target = document.getElementsByClassName('ic-app-header__logomark')[0]; 
document.getElementsByClassName('ic-app-header__logomark-container')[0].insertBefore(elem, target); 
document.getElementsByClassName('ic-app-header__logomark')[0].remove();
//window.addEventListener("load", function() {
//document.getElementsByClassName('ic-sidebar-logo__image')[0].src = chrome.runtime.getURL("images/long.png");
//});
document.getElementById("primaryNavToggle").onclick = function(){
  if(!document.getElementById("primaryNavToggle").title.startsWith("Expand global navigation")){
    document.getElementById("imgg").style.height = "54px";
    document.getElementById("imgg").style.width = "54px";
  }
  else{
    document.getElementById("imgg").style.height = "84px";
    document.getElementById("imgg").style.width = "85px";
  }
};
/* GaTech Dropped BlueJeans Support, Feature Depricated
//BlueJeans Feature
window.addEventListener("load", function() {
  if(document.getElementsByClassName("hidden-phone")[0].innerHTML == "Dashboard"){
    var bjlButton = document.getElementById("planner-today-btn").cloneNode(true);
    bjlButton.id = "bjl";
    bjlButton.style.background="#0066ff";
    bjlButton.style.color="#ffffff";
    while (bjlButton.firstChild) {
      bjlButton.removeChild(bjlButton.firstChild);
    }
    bjlButton.innerHTML = "BlueJeans";
    document.getElementsByClassName("PlannerHeader-styles__root PlannerHeader")[0].appendChild(bjlButton);
  }
  else{
    var bjlButton = document.getElementById("create_new_event_link").cloneNode(true);
    bjlButton.id = "bjl";
    bjlButton.style.background="#0066ff";
    bjlButton.style.color="#ffffff";
    bjlButton.removeAttribute("href");
    bjlButton.removeAttribute("title");
    while (bjlButton.firstChild) {
      bjlButton.removeChild(bjlButton.firstChild);
    }
    bjlButton.innerHTML = "BlueJeans";
    document.getElementsByClassName("header-bar-right header-right-flex")[0].appendChild(bjlButton);
  }
  var bjlState = 0;
  document.getElementById("bjl").addEventListener("click",function() {
    if(bjlState == 0){
      Array.from(document.getElementsByClassName("fc-event")).filter(lits => lits.title.includes('BlueJeans Meeting:')).forEach(item => item.style.display = "none");
      Array.from(document.getElementsByClassName("agenda-event__item-container")).filter(li => li.getElementsByClassName("agenda-event__title")[0].innerHTML.includes('BlueJeans Meeting:')).forEach(item => item.style.display = "none");
      Array.from(document.getElementsByClassName("PlannerItem-styles__root planner-item")).filter(lits => lits.getElementsByClassName("ergWt_bGBk")[0].innerHTML.includes('BlueJeans Meeting:')).forEach(item => item.style.display = "none");
      bjlState = 1;
    }
    else{
      Array.from(document.getElementsByClassName("fc-event")).filter(lits => lits.title.includes('BlueJeans Meeting:')).forEach(item => item.style.display = "block");
      Array.from(document.getElementsByClassName("agenda-event__item-container")).filter(li => li.getElementsByClassName("agenda-event__title")[0].innerHTML.includes('BlueJeans Meeting:')).forEach(item => item.style.display = "flex");
      Array.from(document.getElementsByClassName("PlannerItem-styles__root planner-item")).filter(lits => lits.getElementsByClassName("ergWt_bGBk")[0].innerHTML.includes('BlueJeans Meeting:')).forEach(item => item.style.display = "flex");
      bjlState = 0;
    }
  });
});
*/

// Optimize Feature
function charlie(){
  try{
    //console.log("Optimizing");
    var wei  = Array.from(document.getElementsByClassName("summary")[0].getElementsByTagName("th")).filter(ini => ini.scope == "row");
    var nams = [];
    var weist = [];
    var tmp = "";
    for(i = 0; i < wei.length-1;i++){
      nams[i] = wei[i].innerHTML;
      tmp = wei[i].nextElementSibling.innerHTML;
      tmp = parseFloat(tmp.split("%")[0])/100;
      weist[i] = tmp;
    }
    var graded = Array.from(document.getElementsByClassName("student_assignment editable")).filter(ini => ini.getElementsByClassName("toggle_final_grade_info tooltip")[0].style.visibility == 'hidden');
    graded.forEach(ini => ini.getElementsByClassName("student_entered_score")[0].innerHTML = "");
    var grades = new Array(nams.length).fill(0);
    //console.log(grades);
    var grades1 = new Array(nams.length).fill(0);
    var j = 0;
    var c = 0.0;
    var q = new Array(nams.length).fill(0);
    for(i=0; i < graded.length; i++){
      q[nams.indexOf(graded[i].getElementsByClassName("context")[0].innerHTML)] = 1;
    }  
    dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
    div = (a, b) => a.map((x, i) => a[i] / b);
    mul = (a, b) => a.map((x, i) => a[i] * b[i])
    var tot = dot(q,weist);
    //console.log(weist);
    weist = div(weist,tot);
    weist = mul(weist,q);
    //console.log(grades1);
    for(i = 0;i < graded.length;i++){
      j = nams.indexOf(graded[i].getElementsByClassName("context")[0].innerHTML);
      c = isNaN(parseFloat(graded[i].getElementsByClassName("original_points")[0].innerHTML)) ? 0 : parseFloat(graded[i].getElementsByClassName("original_points")[0].innerHTML);
      d = isNaN(parseFloat(graded[i].getElementsByClassName("possible points_possible")[0].innerHTML)) ? 0 : parseFloat(graded[i].getElementsByClassName("possible points_possible")[0].innerHTML);
      //console.log(d);
      //console.log(grades1);
      ////console.log(c);
      if(isNaN(c)){  
        grades[j] += 0.0;
        grades1[j] += d;
      } 
      else{
        grades[j] += c;
        grades1[j] += d;
      }
      if(i == graded.length - 1){
        //console.log(grades1);
        for(j = 0;j < grades.length;j++){
          if(grades1[j] != 0){
            grades[j] = grades[j]/grades1[j];
          }
        }
      }
    }
    add = (a, b) => a.map((x, i) => a[i] + b[i]);
    var result = .9 - dot(grades,weist);
    //console.log(nams);
    //console.log(grades1);
    //console.log(weist);
    console.log(result);
    if(result > 0){
      var graded3 = Array.from(document.getElementsByClassName("student_assignment editable")).filter(ini => !ini.classList.contains("assignment_graded")).filter(ini => ini.getElementsByClassName("toggle_final_grade_info tooltip")[0].style.visibility == 'hidden');
      var mat = new Array(nams.length);
      var ma = new Array(nams.length);
      var total = 0;
      var maskT = new Array(nams.length).fill(0);
      for(i = 0;i < graded3.length;i ++){
        j = nams.indexOf(graded3[i].getElementsByClassName("context")[0].innerHTML); 
        possi = isNaN(parseFloat(graded3[i].getElementsByClassName("possible points_possible")[0].innerHTML)) ? 0 : parseFloat(graded3[i].getElementsByClassName("possible points_possible")[0].innerHTML);
        maskT[j] += possi;
        total += possi;
      }
      for(i = 0; i < maskT.length;i++){
        if(weist[i] == 0) {
          maskT[i] = 0;
        } else {
        maskT[i] /= total;
        }
      }
      //console.log(maskT);
      mat.fill(0);
      ma.fill(0);
      var res = 0;
      //console.log(weist);
      if(dot(maskT, weist) != 0){
        while(res < result){
          mat = add(mat, maskT);
          for(j = 0;j < mat.length;j++){
            if(grades1[j] != 0){
              ma[j] = mat[j] / grades1[j];
            }
          }
          res = dot(ma, weist);
          //console.log("Point");
        }
      }
      var flag = true;
      var space = 0;
      console.log(mat);
      for(i = 0;i < mat.length;i++){
        flag = true;
        space = 0;
        for(j = 0;j < graded3.length;j++){
          if(graded3[j].getElementsByClassName("context")[0].innerHTML == nams[i]) {
            space = isNaN(parseFloat(graded3[j].getElementsByClassName("possible points_possible")[0].innerHTML)) ? 0 : parseFloat(graded3[j].getElementsByClassName("possible points_possible")[0].innerHTML);
            if(mat[i] < space){
              graded3[j].getElementsByClassName("student_entered_score")[0].innerHTML = mat[i];
              mat[i] = 0;
            }
            else{
              graded3[j].getElementsByClassName("student_entered_score")[0].innerHTML = space;
              mat[i] = mat[i] - space;
            }
            //console.log("Sent");
          }
        }
      }
    document.getElementsByClassName("btn button-sidebar-wide show_guess_grades_link")[0].click();
    if(document.getElementsByClassName("custom").length == 0){
      //Add total bar implementation
          //if(!!!document.getElementsByClassName){
            var t = document.createElement("tr");
            t.classList.add("student_assignment");
            t.classList.add("hard_coded");
            t.classList.add("final_grade");
            t.classList.add("custom");
            t.id = "submission_final-grade";
            t.innerHTML = `
            <th class="title" scope="row">
                Final Grade Before Optimization
            </th>
            <td class="due">

            </td>
            
            <td class="status" scope="row">
            </td>
            
            <td class="assignment_score" title="">
              <div style="position: relative; height: 100%;" class="score_holder">
                  <span class="assignment_presenter_for_submission" style="display: none;"></span>
                  <span class="react_pill_container"></span>
                <span class="tooltip">
                  <span class="grade">96.88%</span>
                </span>
                <div style="display: none;">
                  <!-- Store the original points so we don't need to parse and guess at locale -->
                  <span class="original_points">

                  </span>
                  <!-- Store the original score so that we can retrieve it after any "What-If" calculations -->
                  <span class="original_score">

                  </span>
                  <!-- Store the current score so that it can persist between multiple "What-If" calculations -->
                  <span class="what_if_score">

                  </span>
                  <!-- Load any previously saved "What-If" scores -->
                  <span class="student_entered_score">

                  </span>
                  <span class="submission_status">
                    none
                  </span>
                  <span class="assignment_group_id"></span>
                  <span class="assignment_id">final-grade</span>
                  <span class="group_weight"></span>
                  <span class="rules"></span>
                </div>
              </div>
            </td>
            <td class="possible points_possible" aria-label=""></td>
            <td class="details">
            </td>
            `;
          //}
          t.getElementsByClassName("tooltip")[0].innerHTML = (dot(grades,weist) * 100).toFixed(2) + "%";
        document.getElementById("assignments").getElementsByTagName("tbody")[0].appendChild(t);
      }
    }
    else{
      alert("Projected Grade Is Already An A");
    }
  }
  catch (err) {
    console.error(err.message);
    //Optimize Part 2
    var run = false;
    chrome.storage.sync.get('classes', function(result) {
      var classData = result.classes;
      var inx = 0;
      var className = document.getElementsByClassName("ellipsible")[1].innerHTML;
      if(Array.isArray(classData)){
        for(var i = 0; i < classData.length; i++) {
          if(classData[i][0] == className){
            run = true;
            inx = i;
            break;  
          }
        } 
      }
      breakme: {
        if(run){
          //console.log(classData);
          //console.log("Optimizing 2");
          var nams = [];
          var weist = [];
          for(var i = 1; i < classData[inx].length; i++){
            nams.push(classData[inx][i][0]);
            weist.push(classData[inx][i][1]);
          }
          var graded = Array.from(document.getElementsByClassName("student_assignment editable")).filter(ini => ini.getElementsByClassName("toggle_final_grade_info tooltip")[0].style.visibility == 'hidden');
          //add condition that requires no weights if new category is introduced
          graded.forEach(ini => function() {
            if(nams.indexOf(graded[i].getElementsByClassName("context")[0].innerHTML) >= 0){
              ini.getElementsByClassName("student_entered_score")[0].innerHTML = "";
            } else{
              //terminate sequence to new array
              classData.splice(inx,1);
              run = false;
              breakme;
            }
          });
          var grades = new Array(nams.length).fill(0); //
          var grades1 = new Array(nams.length).fill(0); //
          var j = 0;
          var c = 0.0;
          var q = Array(nams.length).fill(0);
          for(i=0; i < graded.length; i++){
            q[nams.indexOf(graded[i].getElementsByClassName("context")[0].innerHTML)] = 1;
          }  
          dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
          div = (a, b) => a.map((x, i) => a[i] / b);
          mul = (a, b) => a.map((x, i) => a[i] * b[i]);
          //console.log("Grades");
          //console.log(grades);
          //console.log(weist);
          //console.log(nams);
          var tot = dot(q,weist);
          weist = div(weist,tot);
          weist = mul(weist,q);
          for(i = 0;i < graded.length;i++){
            j = nams.indexOf(graded[i].getElementsByClassName("context")[0].innerHTML);
            c = isNaN(parseFloat(graded[i].getElementsByClassName("original_points")[0].innerHTML)) ? 0 : parseFloat(graded[i].getElementsByClassName("original_points")[0].innerHTML);
            d = isNaN(parseFloat(graded[i].getElementsByClassName("possible points_possible")[0].innerHTML)) ? 0 : parseFloat(graded[i].getElementsByClassName("possible points_possible")[0].innerHTML);
            //console.log(d);
            if(isNaN(c)){  
              grades[j] += 0.0;
              grades1[j] += d;
            } 
            else{
              grades[j] += c;
              grades1[j] += d;
            }
            if(i == graded.length - 1){
              for(j = 0;j < grades.length;j++){
                if(grades1[j] != 0){
                  grades[j] = grades[j]/grades1[j];
                }
              }
            }
          }
          var totalw = .9 * weist.reduce((partialSum, a) => partialSum + a, 0);
          add = (a, b) => a.map((x, i) => a[i] + b[i]);
          var result = totalw - dot(grades,weist);
          //console.log(result);
          if(result > 0){
            var graded3 = Array.from(document.getElementsByClassName("student_assignment editable")).filter(ini => !ini.classList.contains("assignment_graded")).filter(ini => ini.getElementsByClassName("toggle_final_grade_info tooltip")[0].style.visibility == 'hidden');
            var mat = new Array(nams.length);
            var ma = new Array(nams.length);
            var total = 0;
            var maskT = new Array(nams.length).fill(0);
            for(i = 0;i < graded3.length;i ++){
              j = nams.indexOf(graded3[i].getElementsByClassName("context")[0].innerHTML); 
              possi = parseFloat(graded3[i].getElementsByClassName("possible points_possible")[0].innerHTML);
              maskT[j] += possi;
              total += possi;
            }
            for(i = 0; i < maskT.length;i++){
              maskT[i] /= total;
            }
            mat.fill(0);
            ma.fill(0);
            var res = 0;
            if(dot(maskT, weist) != 0){
              while(res < result){
                mat = add(mat, maskT);
                for(j = 0;j < mat.length;j++){
                  if(grades1[j] != 0){
                    ma[j] = mat[j] / grades1[j];
                  }
                }
                res = dot(ma, weist);
                //console.log("Point");
              }
            }
            var flag = true;
            var space = 0;
            //console.log(mat);
            for(i = 0;i < mat.length;i++){
              flag = true;
              space = 0;
              for(j = 0;j < graded3.length;j++){
                if(graded3[j].getElementsByClassName("context")[0].innerHTML == nams[i]) {
                  space = parseFloat(graded3[j].getElementsByClassName("possible points_possible")[0].innerHTML);
                  if(mat[i] < space){
                    graded3[j].getElementsByClassName("student_entered_score")[0].innerHTML = mat[i];
                    mat[i] = 0;
                  }
                  else{
                    graded3[j].getElementsByClassName("student_entered_score")[0].innerHTML = space;
                    mat[i] = mat[i] - space;
                  }
                  //console.log("Sent");
                }
              }
            }
          document.getElementsByClassName("btn button-sidebar-wide show_guess_grades_link")[0].click();
          if(document.getElementsByClassName("custom").length == 0){
            //Add total bar implementation
                //if(!!!document.getElementsByClassName){
                  var t = document.createElement("tr");
                  t.classList.add("student_assignment");
                  t.classList.add("hard_coded");
                  t.classList.add("final_grade");
                  t.classList.add("custom");
                  t.id = "submission_final-grade";
                  t.innerHTML = `
                  <th class="title" scope="row">
                      Final Grade Before Optimization
                  </th>
                  <td class="due">
      
                  </td>
                  
                  <td class="status" scope="row">
                  </td>
                  
                  <td class="assignment_score" title="">
                    <div style="position: relative; height: 100%;" class="score_holder">
                        <span class="assignment_presenter_for_submission" style="display: none;"></span>
                        <span class="react_pill_container"></span>
                      <span class="tooltip">
                        <span class="grade">96.88%</span>
                      </span>
                      <div style="display: none;">
                        <!-- Store the original points so we don't need to parse and guess at locale -->
                        <span class="original_points">
      
                        </span>
                        <!-- Store the original score so that we can retrieve it after any "What-If" calculations -->
                        <span class="original_score">
      
                        </span>
                        <!-- Store the current score so that it can persist between multiple "What-If" calculations -->
                        <span class="what_if_score">
      
                        </span>
                        <!-- Load any previously saved "What-If" scores -->
                        <span class="student_entered_score">
      
                        </span>
                        <span class="submission_status">
                          none
                        </span>
                        <span class="assignment_group_id"></span>
                        <span class="assignment_id">final-grade</span>
                        <span class="group_weight"></span>
                        <span class="rules"></span>
                      </div>
                    </div>
                  </td>
                  <td class="possible points_possible" aria-label=""></td>
                  <td class="details">
                  </td>
                  `;
                //}
                t.getElementsByClassName("tooltip")[0].innerHTML = (dot(grades,weist) * 100).toFixed(2) + "%";;
              document.getElementById("assignments").getElementsByTagName("tbody")[0].appendChild(t);
            }
          }
          else{
            alert("Projected Grade Is Already An A");
          }
        }
      }
      if(!run){
        var nams = [];
        Array.from(document.getElementsByClassName("student_assignment editable")).forEach(ini => {
          if(!nams.includes(ini.getElementsByClassName("context")[0].innerHTML)){
            nams.push(ini.getElementsByClassName("context")[0].innerHTML);
          }
        });
        nams.push(document.getElementsByClassName("ellipsible")[1].innerHTML);
        if(confirm("No Grade Weights Found, would you like to add them manually? If so, click 'Ok' and then click on the extension icon to set grade weights")){
          //Focus Dialog Box (Not Yet possible)
          //.openPopup works for firefox
          chrome.storage.sync.set({names: nams}, function() {
            //console.log('Names Array Sent to popup');
            //console.log(nams);
          });
          browser.browserAction.openPopup();
        } 
      }
    });
  }
}; 
window.addEventListener("load", function() {
  var oztButton = document.getElementById("print-grades-button").cloneNode(true);
  oztButton.id = "ozt";
  oztButton.style.background = "#A4925A";
  oztButton.style.color="#ffffff";
  oztButton.removeAttribute("href");
  oztButton.classList.remove("icon-printer");
  oztButton.classList.remove('print-grades');
  document.getElementById("print-grades-button-container").appendChild(oztButton);
  document.getElementById("ozt").innerHTML = "Optimize";
  document.getElementById("ozt").addEventListener("click",charlie);
});