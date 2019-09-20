// GET collection: collection_id = 827

var collection;
function getCollection(){
  $.ajax({
    url: '/api/aerostat_collections/827',
    method: 'GET',
    success: function (data){
      collection =  data;
    }
  });
  return collection;
};

getCollection();

function setDate(){
  var today = new Date();
  var setDate = today.getFullYear() + '-' + ("0" + (today.getMonth()+1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2);

  var dateContainer = $('#date');
  dateContainer.attr('min', setDate);
  dateContainer.attr('value', setDate);
}

setDate();

var valid = [];
var positionArr = [];

function radioCheck(group){
  var is_checked = $(group + ':checked');
  if(is_checked.length === 0){
    var field = $(group)[0];
    formMsg(field, 'err', 'please select one',1);
    // valid = false;
    valid.push(false);
  }
}

// Validate Form
function validate(){
  //validate form inputs
  $('.required').each(function(idx, item){
    var field = $(item)[0];
    switch(field.tagName){
      case "INPUT":
        if(field.type != 'radio'){
          if(field.value === ""){
            // valid = false;
            valid.push(false);
            formMsg(field, 'err', 'please fill out this input');
          }
        }
      break;
      default: 
        if(field.value === ""){
          valid.push(false);
          formMsg(field, 'err', 'please fill out this input');
        }
    }
  });
  //check each radio by name and make sure at least one is checked per group

  var hairLength = '.required[name="hair_length"]';
  radioCheck(hairLength);

  var hairType = '.required[name="hair_type"]';
  radioCheck(hairType);

  var service = '.required[name="service"]';
  radioCheck(service);

  if(valid.length === 0){
    //validate captcha
    // var response = grecaptcha.getResponse();
    // $.ajax({
    //   url: 'https://www.google.com/recaptcha/api/siteverify',
    //   method: 'POST',
    //   data: {'secret': '6LfhRKEUAAAAAHel5kcKs-ZpZkSJbeRibrZ1xKEDs','response': response},
    //   contentType: 'application/x-www-form-urlencoded',
    //   success:function(data){
    //     console.log('data',data);
    //     // Submit form on success
    //     submitForm();
    //   }
    // });
    positionArr = [];
    submitForm();
  }else{
    toItem(positionArr);
    valid = [];
  }
};

// Submit Form
function submitForm(){
  var payload = {
    aerostat_collection_id: collection.id,
    fields: []
  }
  // console.log(payload);
  payload.fields = collection.fields.map(function(collectionField){
    $('input').each(function(i, field){
      field = $(field)[0];
      if(field.type === 'radio'){
        if($(field).prop('checked')){
          var this_checked = $(field).val();
          this_checked
          if(collectionField.variable_name === field.name){
            collectionField.value = this_checked;
          }
        }
      }else{
        if(collectionField.variable_name === field.name){
          collectionField.value = field.value;
        }
      }
    });
    return collectionField;
  });

  $.ajax({
    url: '/api/aerostats',
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(payload),
    success: function(){
      $("form")[0].reset();
      // Send success message
      openModal('.success-alert');
    }
  });
};

function toItem(arr){
  var min = arr.reduce(function(a,b){
    return Math.min(a, b);
  });
  console.log('min',min);
  $('html, body').animate({
    scrollTop: min
  },1000);
  positionArr = []
}

function formMsg(item, type, msg){
  var msgItem = '<p class="field-alert">'+msg+'</p>';
  var parentContainer = $(item).parents('.field');
  var goto = parentContainer.offset();
  console.log('item', goto.top);
  positionArr.push(goto.top);
  //add class 
  if(type === 'err'){
    parentContainer.addClass('error-style');
  }else{
    parentContainer.addClass('success-style');
  };
  // if(idx === 0){
  //   $('html, body').animate({
  //     scrollTop: goto.top
  //   },1000);
  // }
  //append message
  $(msgItem).appendTo(parentContainer).delay('2000').fadeOut('4000', function(){
    if(parentContainer.hasClass('error-style')){
      parentContainer.removeClass('error-style');
      parentContainer.find('input').val('');
    }else{
      parentContainer.removeClass('success-style');
    }
  });
}



function onSuccess(){
  closeModal('.success-alert');
  location.href='/';
}