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

	let pHtml = '';
	let fHtml = '';
	let pFilters = [];
	let pFiltersStore = [];
	let tFilters = '';

	fetch('assets/custom/portfolio.json')
		.then((response) => {
			return response.json();
		})
		.then((portfolioItems) => {
			$.each(portfolioItems, function(portfolioIndex, portfolioItem) {
				pFilters = pFilters.concat(portfolioItem.tags);
				tFilters = '';
				$.each(portfolioItem.tags, function(tagIndex, tagValue) {
					tFilters += `${tagValue.toLowerCase()} `;
				});
				pHtml += `<div class="five wide column" id="item${portfolioIndex}" data-filters="${tFilters}">`;
				pHtml += `<h3 class="ui center aligned header">${portfolioItem.title}</h3>`;
				pHtml += `<p class="ui center aligned image content"><img src="assets/images/portfolio/${portfolioIndex}.jpg" class="ui bordered rounded image"></p>`;
				pHtml += `<p class="ui center aligned content"><a class="ui portfolio links center aligned blue button" href="${portfolioItem.link}"><i class="globe icon"></i> Visit</a></p>`;
				pHtml += `<p class="ui content">${portfolioItem.desc}</p>`;
				pHtml += `<p><i class="rocket icon"></i> `;
				$.each(portfolioItem.tags, function(tagIndex, tagValue) {
					pHtml += `<button class="ui tiny button" data-filter="${tagValue.toLowerCase()}">${tagValue}</button>`;
				});
				pHtml += `</p>`;
				pHtml += `</div>`;
			});

			pFiltersStore = [ ...new Set(pFilters) ];

			fHtml += `<p><i class="filter icon"></i> `;
			fHtml += `<button class="ui medium all active button" data-filter="all">All</button>`;
			$.each(pFiltersStore, function(tagIndex, tagValue) {
				fHtml += `<button class="ui medium filter button" data-filter="${tagValue.toLowerCase()}">${tagValue}</button>`;
			});
			fHtml += `</p>`;

			$('#portfolioTags').html($.parseHTML(fHtml));
			$('#portfolioItems').html($.parseHTML(pHtml));
		})
		.catch((err) => {
			console.log('An error occured:', err);
			$('.ui.text.loader').html('Fetching portfolio items failed.');
		});

	// filter function...

	$(document).on('click', '.ui.filter.button', function() {
		let filter = $(this).data('filter');
		if ($(this).hasClass('active')) {
			$('[data-filters~=' + filter + ']').fadeTo(300, 0.5).fadeTo(300, 1);
		} else {
			$('.ui.button').removeClass('active');
			$('.five.wide.column').fadeOut();
			$(this).addClass('active');
			$('[data-filters~=' + filter + ']').fadeIn();
		}
	});

	$(document).on('click', '.ui.all.button', function() {
		let filter = $(this).data('filter');
		if ($(this).hasClass('active')) {
			$('.five.wide.column').fadeTo(300, 0.5).fadeTo(300, 1);
		} else {
			$('.ui.button').removeClass('active');
			$(this).addClass('active');
			$('.five.wide.column').fadeIn();
		}
	});

	$('.ui.primary.button').click(function(e) {
		$('html, body').animate(
			{
				scrollTop: $('#portfolioTags').offset().top
			},
			500
		);
	});
});
