function validateEmpty(controlId, errorControlId, errorMessage)
 {
    var refToControl = document.getElementById(controlId);
    var refErrorControl = document.getElementById(errorControlId);
    refErrorControl.innerText = "";
  
    if (refToControl.value == "") 
    {
      refErrorControl.innerText = errorMessage;
    }
    else 
    {
      console.log(refToControl.value);
    }
  }


