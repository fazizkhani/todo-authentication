var _notes = [];
    var _currentUser = {};
function allertmessage(){
  alert('input is empty');
}
function additem() { 
  new_line[i] = document.createElement('li');
  new_close_button[i]= document.createElement('span');
  new_complet_button[i]= document.createElement('input');
  new_edit_button[i]= document.createElement('button');
  new_line[i].textContent = new_item.value;
  new_line[i].className = 'newLineClass';
  list.appendChild(new_line[i]);  
  new_close_button[i].textContent = "x";
  new_close_button[i].style.cssFloat = "right";
  new_close_button[i].style.color = "red";
  new_close_button[i].style.cursor = "pointer";
  new_close_button[i].className = "new_close_button";
  new_line[i].appendChild(new_close_button[i]);
  new_complet_button[i].type = "checkbox";
  new_complet_button[i].style.cssFloat = "right";
  new_complet_button[i].style.cursor = "pointer";
  new_complet_button[i].className = "new_complete_button_class";
  new_complet_button[i].style.width='3%';
  new_line[i].appendChild(new_complet_button[i]);
  new_edit_button[i].textContent = 'Edit';
  new_edit_button[i].style.cursor = 'pointer';
  new_edit_button[i].style.cssFloat = "right";
  new_edit_button[i].style.fontSize = '15px';
  new_edit_button[i].className = "new_edit_button";
  new_line[i].appendChild(new_edit_button[i]);
  new_input[i]= document.createElement('input');
  new_submit[i]= document.createElement('span');
  new_submit[i].textContent = 'save';
  new_submit[i].style.cursor = 'pointer';
  new_submit[i].style.fontSize = '20px';
  new_submit[i].style.width='5%';
  new_submit[i].style.backgroundColor = 'green'; 
  new_input[i].className = "new_input_edit";
  new_submit[i].className = "new_submit_edit";
  new_complet_button[i].onclick = function(){
      for (let i = 0; i < item_status.length; i++) {
          if (item_status[i].checked == true) {
              new_line_task[i].style.backgroundColor = "grey"; 
          }
          else {
              new_line_task[i].style.backgroundColor = "white"; 
          }
        }
}   
for(let i = 0 ; i< item_status.length; i++){
new_close_button[i].onclick = function(){           
  list.removeChild(new_line_task[i]);} 
  new_edit_button[i].onclick = function(){
  new_edit_button[i].parentElement.appendChild(new_input[i]);
  new_edit_button[i].parentElement.appendChild(new_submit[i]);}
  new_submit[i].onclick = function () {
  new_line[i].textContent = new_input[i].value;
  new_line[i].append(new_close_button[i]);
  new_line[i].append(new_complet_button[i]);
  new_line[i].append(new_edit_button[i]);}
}

i = i+1;
    return new_line,new_close_button,new_complet_button,i;
          
}
    /////filters////
  all_filter.onclick = function () {
      all_filter.style.backgroundColor = 'grey';
      active_filter.style.backgroundColor =  'goldenrod';
      complete_filter.style.backgroundColor = 'green';
      for (let i = 0; i < item_status.length; i++) {
        item_status[i].parentElement.style.display = "block";
      }
    }
    active_filter.onclick = function () {
      all_filter.style.backgroundColor = 'cyan';
      active_filter.style.backgroundColor = 'grey';
      complete_filter.style.backgroundColor = 'green';
      for (let i = 0; i < item_status.length; i++) {
        if (item_status[i].checked == false) {
          item_status[i].parentElement.style.display = 'block';
        }
        else {
          item_status[i].parentElement.style.display = 'none';
        }
      }
    }
    complete_filter.onclick = function () {
        
      all_filter.style.backgroundColor = 'cyan';
      active_filter.style.backgroundColor = ' goldenrod';
      complete_filter.style.backgroundColor = 'grey';
      for (let i = 0; i < item_status.length; i++) {
        if (item_status[i].checked == true) {
          item_status[i].parentElement.style.display = 'block';
        }
        else {
          item_status[i].parentElement.style.display = 'none';
        }
      }
    }
    
var data = (function () {
	var key = 'state';
	return {
		getItems: getItems1,
		setItems: setItems1
	};

	function getItems1() {
		var value = localStorage.getItem(key);
		if (!value) return null;
		return value;
	};

	function setItems1(value) {
		!value && (value = {});
		localStorage.setItem(key, value);
	};
}());
 

    function download() {
      connection.download(function (data) {
        if (!data) return alert('there is nothing on the server to replace client data.');
        var confirmResult = confirm('data on the local storage will be repaced!, are you sure to continue?');
        if (!confirmResult) return;
        model = JSON.parse(data);
        dataBase.setModel(_currentUser.id, { notes: model.notes, filter: model.filter });
        init();
    }, function (err) {
        alert(err);
    });
  }

  function upload() {
    var data = dataBase.getModel(_currentUser.id);
    console.log('data to upload is :' + data);
    if (!data) return alert('there is nothing to upload.');
    var confirmResult = confirm('data on the server will be replaced!, are you sure to continue?');
    if (!confirmResult) return;
    connection.upload(data, function () {
        alert('upload done successfully.');
    }, function () {
        alert('upload failed !!!');
    });
  }

  function login() {
      var username = usernameInput.value;
      var password = passwordInput.value;
      if (!username || !password) return;
      connection.authenticate(username, password, function (user) {
        if (!user) {
            return alert('authentication failed.');
        }
        dataBase.setCurrentUser(user);
        init();
    }, function (err) {
        alert('Error: ' + err);
    });
      usernameInput.value = '';
      passwordInput.value = '';

     
  }

  function register() {
      var fisrtname = fisrtnameSignup.value;
      var lastname = lastnameSignup.value;
      var username = usernameSignup.value;
      var password = passwordSignup.value;
      if (!fisrtname || !lastname || !username || !password) return;

      connection.registerUser(fisrtname, lastname, username, password, function (user) {
        if (!user) {
            return alert('register failed.');
        }
        alert('register done successfuly for  ' + user.firstName + ' ' + user.lastName);
        dataBase.setCurrentUser(user);
       init();
    }, function (err) {
        alert(err);
    });
      fisrtnameSignup.value = '';
      lastnameSignup.value = '';
      usernameSignup.value = '';
      passwordSignup.value = '';

     
  }

  function showLoginPage() {
    appPage.style.display = 'none';
    spnUserDisplayName.style.display = 'none';
    loginPage.style.display = 'block';
    btnSignin.style.display = 'none';
    btnSignout.style.display = 'none';
    btnSignup.style.display = 'block';
}

function showRegisterPage() {
    appPage.style.display = 'none';
    spnUserDisplayName.style.display = 'none';
    signupPage.style.display = 'block';
    btnSignin.style.display = 'none';
    btnSignout.style.display = 'none';
    btnSignup.style.display = 'none';
}

function showApp(user) {
    loginPage.style.display = 'none';
    signupPage.style.display = 'none';
    appPage.style.display = 'block';
    spnUserDisplayName.style.display = 'inline-block';

    if (user && user.id) {
        btnSignup.style.display = 'none';
        btnSignin.style.display = 'none';
        btnSignout.style.display = 'inline-block';
        spnUserDisplayName.textContent = user.firstName + ' ' + user.lastName;
        downloadButton.style.display = 'inline-block';
        uploadButton.style.display = 'inline-block';
    } else {
        btnSignup.style.display = 'block';
        btnSignin.style.display = 'block';
        btnSignout.style.display = 'none';
        spnUserDisplayName.textContent = 'anonymous user';
        downloadButton.style.display = 'none';
        uploadButton.style.display = 'none';
    }
};

function logoff() {
    controller.logoff();
}

function cancelLogin() {
    showApp();
}

function cancelRegister() {
    showApp();
}



function logoff() {
  dataBase.setCurrentUser();
  connection.signout();
  init();
}


function init() {
  _currentUser = dataBase.getCurrentUser() || { id: 0 };
  connection.init(_currentUser.id);
  showApp(_currentUser);
  var model = dataBase.getModel(_currentUser.id) || {};
  _notes = model.list || [];
  renderList();
}
function renderList() {
  dataBase.setModel(_currentUser.id, { list: _notes });
  
}


