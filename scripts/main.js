function clearForm(myFormElement) {

  var elements = myFormElement.elements;
  myFormElement.reset();
  for(i=0; i<elements.length; i++) {
   var field_type = elements[i].type.toLowerCase();

  switch(field_type) {

    case "text":
    case "password":
    case "textarea":
    case "hidden":

      elements[i].value = "";
      break;

    case "radio":
    case "checkbox":
        if (elements[i].checked) {
          elements[i].checked = false;
      }
      break;

    case "select-one":
    case "select-multi":
                elements[i].selectedIndex = -1;
      break;

    default:
      break;
     }
  }
}

document.addEventListener('DOMContentLoaded', function() {
        
    let textfield = document.getElementById('mySearch');
    let suggestions = document.getElementById('infoBlock');
    let myButt = document.getElementById('myButt');
    let states=[];

    for( let contact of contactList ){
        states.push(contact.form_index);
        states.push(contact.okud);
    }

function autoAdd(arr) {
   suggestions.innerHTML = "";
    arr.slice(0, 10).forEach(function(term) {
      let node = document.createElement("div");
      node.innerText = term;
      node.className = 'formOptions';
      node.addEventListener('click', function() {
            textfield.value = term;
            suggestions.innerText = "";
        });
      suggestions.appendChild(node);
    }); 
}

function infoMsg(str){
    suggestions.innerHTML = str;
    
}

textfield.addEventListener("keydown", function(event) {
    if(event.code == 'Space'){
        event.preventDefault();
    }
});

textfield.onpaste = function(event){
    infoMsg('<p>Начните вручную вводить значение в поле поиска, затем кликните на искомом значении и нажмите кнопку "Найти"</p>');
    return false;
};

textfield.addEventListener("input", function() {
    
  let matching = states.filter(function(state) {
       return state.toUpperCase().indexOf(textfield.value.toUpperCase()) == 0;
   });
    
   autoAdd(matching);
});

myButt.addEventListener('click', function(){
    
    let mySearchValue=textfield.value;
               
        if(mySearchValue) {
            
            let searchRez = [];
                                     
              for( let contact of contactList ){
                if(contact.okud==mySearchValue || contact.form_index==mySearchValue){
                    searchRez.push(contact);
                }
              }
              
             if(searchRez.length==0){
                infoMsg('<p>По Вашему запросу ничего не найдено.</p>');
                clearForm(myForm);
             }
                        
            else{
                let tab = document.createElement('table');
                tab.classList.add('myTab');
                for( let rez of searchRez ){
                    let myEntries = Object.entries(rez);
                    
                    for( let entry of myEntries ){
                        let myTr = document.createElement('tr');
                        let myTd1 = document.createElement('td');
                        let myTd2 = document.createElement('td');
                        let myKey;
                        
                        switch(entry[0]){
                            case 'okud':
                                myKey = 'ОКУД';
                                break;
                            case 'form_index':
                                myKey = 'Индекс формы';
                                break;
                            case 'form_name':
                                myKey = 'Наименование формы';
                                break;
                            case 'period':
                                myKey = 'Периодичность';
                                break;
                            case 'srok_pred':
                                myKey = 'Срок предоставления';
                                break;
                            case 'otdel_name':
                                myKey = 'Отдел, ответственный за разработку формы';
                                break;
                            case 'fio_boss':
                                myKey = 'Начальник отдела';
                                break; 
                            case 'otdel_tel':
                                myKey = 'Телефоны специалистов отдела';
                                break;      
                                
                                
                            default:
                              myKey = '';
                              break;  
                        }
                        
                        myTd1.innerHTML = myKey;
                        myTr.append(myTd1);
                        myTd2.innerHTML = entry[1];
                        myTr.append(myTd2);
                        tab.append(myTr);
                    }
                    
                }
                suggestions.append(tab);
                clearForm(myForm);
             }
            
        }
        else{
            infoMsg('<p>Вы не ввели значение для поиска</p>');
            clearForm(myForm);
            }
});      

});