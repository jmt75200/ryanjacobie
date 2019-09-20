function closeModal(e,a){$(e).removeClass("modal-flex-class").addClass("hidden"),a||body.hasClass("no-scroll")&&body.removeClass("no-scroll")}function openModal(e,a){$(e).removeClass("hidden").addClass("modal-flex-class"),null!=a&&body.addClass("no-scroll")}function getCollection(){return $.ajax({url:"/api/aerostat_collections/827",method:"GET",success:function(e){collection=e}}),collection}function setDate(){var e=new Date,a=e.getFullYear()+"-"+("0"+(e.getMonth()+1)).slice(-2)+"-"+("0"+e.getDate()).slice(-2),o=$("#date");o.attr("min",a),o.attr("value",a)}function radioCheck(e){0===$(e+":checked").length&&(formMsg($(e)[0],"err","please select one",1),valid.push(!1))}function validate(){$(".required").each(function(e,a){var o=$(a)[0];switch(o.tagName){case"INPUT":"radio"!=o.type&&""===o.value&&(valid.push(!1),formMsg(o,"err","please fill out this input"));break;default:""===o.value&&(valid.push(!1),formMsg(o,"err","please fill out this input"))}});radioCheck('.required[name="hair_length"]');radioCheck('.required[name="hair_type"]');radioCheck('.required[name="service"]'),0===valid.length?(positionArr=[],submitForm()):(toItem(positionArr),valid=[])}function submitForm(){var e={aerostat_collection_id:collection.id,fields:[]};e.fields=collection.fields.map(function(e){return $("input").each(function(a,o){if("radio"===(o=$(o)[0]).type){if($(o).prop("checked")){var l=$(o).val();e.variable_name===o.name&&(e.value=l)}}else e.variable_name===o.name&&(e.value=o.value)}),e}),$.ajax({url:"/api/aerostats",method:"POST",headers:{"Content-Type":"application/json"},data:JSON.stringify(e),success:function(){$("form")[0].reset(),openModal(".success-alert")}})}function toItem(e){var a=e.reduce(function(e,a){return Math.min(e,a)});console.log("min",a),$("html, body").animate({scrollTop:a},1e3),positionArr=[]}function formMsg(e,a,o){var l='<p class="field-alert">'+o+"</p>",s=$(e).parents(".field"),t=s.offset();console.log("item",t.top),positionArr.push(t.top),"err"===a?s.addClass("error-style"):s.addClass("success-style"),$(l).appendTo(s).delay("2000").fadeOut("4000",function(){s.hasClass("error-style")?(s.removeClass("error-style"),s.find("input").val("")):s.removeClass("success-style")})}function onSuccess(){closeModal(".success-alert"),location.href="/"}var body=$("body"),collection;getCollection(),setDate();var valid=[],positionArr=[];