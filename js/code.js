$(document).ready(function() {
    $("input[type='button']").click(function(event){
        var nom = document.getElementById('nom').value;
        var prenom = document.getElementById('prenom').value;
        var courriel = document.getElementById('courriel').value;
        var message = document.getElementById('msg').value;
        
        var compteur = 0;
        $("input[required='required']").each(function(test){
            var identity = $(this).attr("id");
            if(this.value == ""){
                event.preventDefault();
                compteur++;
                $("input[id=" + identity + "]").css('border-color', 'red');
                if(compteur == 1){
                $("input[id=" + identity + "]").attr('rel', 'fo');
            }
            } else {
                if(identity == 'courriel'){
                    
                            if(!ValidateEmail($("input[id=" + identity + "]").val())) {
                                event.preventDefault();
                                compteur++;
                                $("#erreur").append("<p>Addresse Email incorrecte</p>");
                                $("input[id=" + identity + "]").css('border-color', 'red');
                                if(compteur == 1){
                                    $("input[id=" + identity + "]").attr('rel', 'fo');
                                }
                            } else {
                                $("input[id=" + identity + "]").css('border-color', '#ddd');
                            }
                }else {
                    $("input[id=" + identity + "]").css('border-color', '#ddd');
                }
            }
            $("input[rel='fo']").focus();
        });
        
        if(nom!="" && prenom!="" && courriel!="" && message!=""){
            var params = {
                "from": 'gab.mhfu@gmail.com',
                "to": courriel,
                "text": message
            }
        
            $.ajax({
                headers: {"Authorization": "Basic YXBpOmU4NmFiZDI1MGJjZTE1MTU1YmVkZmQ4ZTI1M2M5MDhkLTM5MzliOTNhLThhNTRhNjg1"},
                url: 'https://api.mailgun.net/v3/sandbox34ad4474cdfd45718d0c459c08239448.mailgun.org/messages',
                type: 'POST',
                data: params,
                success: function(result){
                    alert("Mail envoyé");
                },
                error: function(result){
                    console.log(result);
                } 
            });
        }

    });      
});

function ValidateEmail(email) {
    var emailReg = /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/;
    var valid = emailReg.test(email);
    return valid;
};

