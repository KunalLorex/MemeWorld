jQuery(function() {
	
	var db;

    // auth and setup event handlers
    var init = function () {
        
        //$('.like').click(like);
        $('#email-form').submit(save);
        // $("#submit_form").click(function(){
        // 	alert();
        // 		$('#email-form').submit(save);
        // })
		var db = firebase.firestore();
	    db.settings({ timestampsInSnapshots: true });
	    // list(db);
	    // likeCount(db);
    };

    // init on doc ready
    jQuery(document).ready(init);
    var list = function (db) {
        // get collection of comments
	        db.collection("birthday_comments").get().then(function (querySnapshot) {
			document.getElementById('jcf-scrollable').innerHTML = ''; 
		    querySnapshot.forEach(function (doc) {
		        
		        var data = doc.data();
		        console.log(data);
		        document.getElementById('jcf-scrollable').innerHTML += `						
		          <div class="comment-box">
									<blockquote>
										<q>${data.comment}</q>
										<cite>- ${data.fullname}</cite>
									</blockquote>
								</div>`;
			});
		    jcf.refreshAll();
		});
    };
	var save = function (e) {
	        e.preventDefault();
	        var db = firebase.firestore();
	       db.settings({ timestampsInSnapshots: true });
			var name = jQuery("#name").val();
			var email = jQuery("#email").val();
			var phone_number = jQuery("#phone_number").val();
			var inquiry_from = jQuery("#inquiry_from option:selected").val();
			var budget = jQuery("#budget option:selected").val();
			var newsletter = jQuery("#newsletter").val();
			var data = {'name':name,'email':email,'phone_number':phone_number,'inquiry_from':inquiry_from,'budget':budget,'newsletter':newsletter};
			db.collection("inquiry").add(data).then(function (result) {
		             $(".success_msg").show();
		             $(".failed_msg").hide();
		             $('#email-form')[0].reset();
		        })
	        .catch(function (error) {
	        	$(".success_msg").hide();
		        $(".failed_msg").show();
	     		alert("failed to save contact");
	        });
	    };


	    var like = function (e) {
	        e.preventDefault();
	        var _self = jQuery(this);
	        _self.addClass('liked');
	        setTimeout(function(){
						_self.removeClass('liked');
	        }, 2000)
	        var db = firebase.firestore();
	        db.settings({ timestampsInSnapshots: true });

	        let documentRef = firebase.firestore().doc('birthday_likes/hskxrdqYwHNG2ht3aFLV');

	        documentRef.get()
			  .then(documentSnapshot => {
			    const currentCount = documentSnapshot.exists ? documentSnapshot.data().like_count : 0

			    documentRef.set({
			      like_count: Number(currentCount) + 1
			    })
			    .then(() => {
			      console.log('Incomers counter increased!');
			      likeCount(db);
			    })
  			})
	  	};

	  	

});