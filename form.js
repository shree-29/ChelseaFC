function validateEmail() {
    var phno=document.myForm.phno.value;
    var error = document.getElementById("error-msg");
    var p=document.myForm.pwd.value;
    var p1=document.myForm.pwd1.value;
    
    mob=/^\d{10}$/;
    txt=/^[a-zA-Z]+$/;
    
   if(p!==p1) {
      error.textContent = "Passwords not matching"
      error.style.color = "red"
      document.myForm.pwd.value=""
      document.myForm.pwd1.value=""
      document.myForm.pwd.focus();
      return false;
    } 
    else if (!(mob.test(phno))) {
      error.textContent = "Please enter a valid Mobile number"
      error.style.color = "red"
      document.myForm.phno.focus();
      return false;
    } 
    
    else {
        
        return true;
    }
                
 }