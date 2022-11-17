jQuery(document).ready(function($){
	$('#waveoffAmount').hide();
	$('#department').hide();
	$('#studentId').show();
	$('#bookName').show();
	$('#departmentissueId').hide();
$('.issueType').change(function() {
	if (this.value == '001') {
		$('#studentId').show();
		$('#department').hide();
		$('#bookName').show();
		$('#departmentissueId').hide();
	}
	else if (this.value == '002') {
		$('#studentId').hide();
		$('#bookName').hide();
		$('#department').show();
		$('#departmentissueId').show();
	}
	
   });

   $('#waveOff').change(function(){
	if(this.value =="Yes"){
	$('#waveoffAmount').show();
	}
	else{
		$('#waveoffAmount').hide();

	}
   });
   
	//if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
	var MqL = 1170;
	//move nav element position according to window width
	moveNavigation();
	$(window).on('resize', function(){
		(!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
	});

	//mobile - open lateral menu clicking on the menu icon
	$('.cd-nav-trigger').on('click', function(event){
		event.preventDefault();
		if( $('.cd-main-content').hasClass('nav-is-visible') ) {
			closeNav();
			$('.cd-overlay').removeClass('is-visible');
		} else {
			$(this).addClass('nav-is-visible');
			$('.cd-main-header').addClass('nav-is-visible');
			$('.cd-main-content').addClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').addClass('overflow-hidden');
			});
			toggleSearch('close');
			$('.cd-overlay').addClass('is-visible');
		}
	});

	//open search form
	$('.cd-search-trigger').on('click', function(event){
		event.preventDefault();
		toggleSearch();
		closeNav();
	});

	
	//date-input
	$(".date").focusin("input",function(){
		this.type='date';
	});
	$(".date").focusout("input",function(){
		console.log(this.value + "jkhkj");
		if(this.value=="" && this.type=='date'){
			this.type='text';

		}else{
			this.type='date';

		}
	});
	
	//datetime-input
	$(".datetime").focusin("input",function(){
		this.type='datetime-local';
	});
	$(".datetime").focusout("input",function(){
		console.log(this.value + "jkhkj");
		if(this.value=="" && this.type=='datetime-local'){
			this.type='text';

		}else{
			this.type='datetime-local';

		}
	});

	jQuery(function($) {
		$('.navbar .dropdown').hover(function() {
		$(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown();
		
		}, function() {
		$(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp();
		
		});
		
		$('.navbar .dropdown > a').click(function(){
		location.href = this.href;
		});
		
		});

	//submenu items - go back link
	$('.go-back').on('click', function(){
		$(this).parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('moves-out');
	});

	function closeNav() {
		$('.cd-nav-trigger').removeClass('nav-is-visible');
		$('.cd-main-header').removeClass('nav-is-visible');
		$('.cd-primary-nav').removeClass('nav-is-visible');
		$('.has-children ul').addClass('is-hidden');
		$('.has-children a').removeClass('selected');
		$('.moves-out').removeClass('moves-out');
		$('.cd-main-content').removeClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			$('body').removeClass('overflow-hidden');
		});
	}

	function toggleSearch(type) {
		if(type=="close") {
			//close serach 
			$('.cd-search').removeClass('is-visible');
			$('.cd-search-trigger').removeClass('search-is-visible');
			$('.cd-overlay').removeClass('search-is-visible');
		} else {
			//toggle search visibility
			$('.cd-search').toggleClass('is-visible');
			$('.cd-search-trigger').toggleClass('search-is-visible');
			$('.cd-overlay').toggleClass('search-is-visible');
			if($(window).width() > MqL && $('.cd-search').hasClass('is-visible')) $('.cd-search').find('input[type="search"]').focus();
			($('.cd-search').hasClass('is-visible')) ? $('.cd-overlay').addClass('is-visible') : $('.cd-overlay').removeClass('is-visible') ;
		}
	}

	function checkWindowWidth() {
		//check window width (scrollbar included)
		var e = window, 
            a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        if ( e[ a+'Width' ] >= MqL ) {
			return true;
		} else {
			return false;
		}
	}

	function moveNavigation(){
		var navigation = $('.cd-nav');
  		var desktop = checkWindowWidth();
        if ( desktop ) {
			navigation.detach();
			navigation.insertBefore('.cd-header-buttons');
		} else {
			navigation.detach();
			navigation.insertAfter('.cd-main-content');
		}
	}

	//penalty
	$('#btn-return').click(function(){
     if( $('#late-fee').val() !="" ){
		window.location.href = "penalty.html";
	 }
	});
		//logout
		$('.btn-logout').click(function(){
           $('.logout-dropdown').show();
		   });


	//chart--line--
	const labels = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
	  ];
	
	  const data = {
		labels: labels,
		datasets: [{
		  label: 'Total Book Issued',
		  backgroundColor: 'rgb(54, 162, 235)',
		  borderColor: 'rgb(54, 162, 235)',
		  data: [10, 30, 20, 40, 60, 70],
		  cubicInterpolationMode: 'monotone',
		},
		{
			label: 'Total Books Pending For Returned',
			backgroundColor: 'rgb(255, 99, 132)',
			borderColor: 'rgb(255, 99, 132)',
			data: [10, 20, 20, 60, 50, 60,],
			cubicInterpolationMode: 'monotone',
		  }]
	  };
	
	  const config = {
		type: 'bar',
		data: data,
		options: {}
	  };
	  

	  const lineChart = new Chart(
		document.getElementById('lineChart'),
		config
	  );


	  /*--polarchart--*/
	  const dataPolar = {
		labels: [
		  'Total User',
		  'Total Issued',
		  'Total Overdue for Returned',
		],
		datasets: [{
		  data: [100, 75, 30],
		  backgroundColor: [
			'rgb(75, 192, 192)',
			'rgb(54, 162, 235)',
			'rgb(255, 99, 132)',

		  ]
		}]
	   }
	const configPolar = {
		type: 'polarArea',
		data: dataPolar,
		options: {}
	  };
  const polarChart = new Chart(
	document.getElementById('polarChart'),
	configPolar
  );

});




