$(document).ready(function() {
	// smooth anchor scrolling
	$(document).on('click', 'a[href^="#"]', function(event) {
		event.preventDefault();

		$('html, body').animate(
			{
				scrollTop: $($.attr(this, 'href')).offset().top
			},
			500
		);
	});

	// fix menu when passed
	$('.masthead').visibility({
		once: false,
		onBottomPassed: function() {
			$('.fixed.menu').transition('fade in');
		},
		onBottomPassedReverse: function() {
			$('.fixed.menu').transition('fade out');
		}
	});

	// create sidebar and attach to menu open
	$('.ui.sidebar').sidebar('attach events', '.toc.item');

	// Forn validation
	$('.ui.form').form({
		fields: {
			fname: {
				identifier: 'fname',
				rules: [
					{
						type: 'empty',
						prompt: 'Please enter your first name.'
					}
				]
			},
			lname: {
				identifier: 'lname',
				rules: [
					{
						type: 'empty',
						prompt: 'Please enter your last name.'
					}
				]
			},
			email: {
				identifier: 'email',
				rules: [
					{
						type: 'empty',
						prompt: 'Please enter your email address.'
					},
					{
						type: 'email',
						prompt: 'Please enter a valid email address.'
					}
				]
			},
			subject: {
				identifier: 'subject',
				rules: [
					{
						type: 'empty',
						prompt: 'Subject can not be empty.'
					}
				]
			},
			message: {
				identifier: 'message',
				rules: [
					{
						type: 'empty',
						prompt: 'Please enter your message.'
					}
				]
			}
		},
		onSuccess: function(e) {
			e.preventDefault();
			$('.ui.form').toggleClass('double loading');

			var href = $(this).attr('action');

			$.ajax({
				type: 'POST',

				dataType: 'json',

				url: href,

				data: $(this).serialize(),

				success: function(response) {
					if (response.status == 'success') {
						console.log('message sent');

						$('.ui.form').toggleClass('double loading');
						$('.ui.form').addClass('succuss');
					} else {
						console.log('message sending failed');

						$('.ui.form').toggleClass('double loading');
						$('.ui.form').addClass('error');
					}
				}
			});
		}
	});

	$('#formReset').click(function(e) {
		$('.ui.form').children('.inline.fields').children('.error').removeClass('error');
		$('.ui.form').removeClass('error');
	});

	$('.ui.primary.button').click(function(e) {
		$('.ui.modal').modal('show');
	});

	$('#sendMail').click(function(e) {
		$('.ui.modal').modal('hide');
		$('html, body').animate(
			{
				scrollTop: $('#contact').offset().top
			},
			500
		);
	});

	$('#learnMore').click(function(e) {
		$('.ui.modal').modal('hide');
		$('html, body').animate(
			{
				scrollTop: $('#mainInfo').offset().top
			},
			500
		);
	});
});
