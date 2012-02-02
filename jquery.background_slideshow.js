;(function($, window, undefined) {

	var $window = $(window);
	var defaults = {
		data: [],
		timer_delay: 5000,
		fade_time: 3000
	};
	
	var _each = function(ary, cb) {
		if($.isArray(ary) && $.isFunction(cb)) { 
			for(var i in ary) {
				cb(ary[i], i);
			}
		}
	};
	
	var BackgroundSlideshow = function(parent, args) {
		var options = $.extend({}, defaults, args);
		
		// Set the parent
		this.parent = parent;
		// Create the container
		this.container = $('<div id="background_slideshow_container"/>');
		this.container
			.css({
					display: 'none',
					width: '100%',
					height: '100%',
					position: 'fixed',
					left: 0,
					top: 0,
					zIndex: -1
				});
		
		this.timer = {
			delay: options.timer_delay,
			id: null
		};
		
		this.slideshow = {
			current_index: 0,
			images_len: 0,
			fade_time: options.fade_time
		};
		
		this.images = [];
		this.loadImages(args.data);
		
	};
	
	BackgroundSlideshow.prototype = {
		
		// images loading routine
		loadImages: function(ary) {
			var self = this,
					ary_len = ary.length,
					loaded = 0;
					
			_each(ary, function(item) {
				var img = new Image();
				$(img)
					.load(function() {
						self.container
							.append(
								$(this)
									.css({
										position: 'absolute',
										top: 0,
										left: 0,
										display: 'none'
									})
							);
						if(++loaded == ary_len)
							self.isReady();
					});
				img.src = item.src;
			});
		},
		
		// On Images ready
		isReady: function() {
			this.images = this.container.find('img');
			this.slideshow.images_len = this.images.length;
			
			this.render();
			this.handleResize();
			this.launchTimer();
		},
		
		// Render the slideshow
		render: function() {
			this.parent
				.css({
					width: '100%',
					height: '100%'
				})
				.append(
					this.container
						.fadeIn(500)
				);
		},
		
		launchTimer: function() {
			var self = this;
			
			this.images
				.removeClass('current')
				.css('display', 'none')
				.eq(this.slideshow.current_index)
					.addClass('current')
					.css('display', 'block');
			
			this.timer.id = setTimeout(function() {
				self.timerTick();
			}, this.timer.delay);
		},
		
		timerTick: function() {
			this.images
				.eq(this.slideshow.current_index)
					.fadeOut(this.slideshow.fade_time);
			
			this.setNext();
			
			var self = this;
			
			this.images
				.eq(this.slideshow.current_index)
					.fadeIn(this.slideshow.fade_time, function() {
						self.launchTimer();
					});
				
		},
		
		setNext: function() {
			this.slideshow.current_index++;
			if(this.slideshow.current_index >= this.slideshow.images_len)
				this.slideshow.current_index = 0;
		},
		
		/**
		 *	Window or container resize handling
		 */
		handleResize: function() {
			this.images_aspect_ratio = this.images.width() / this.images.height();
		
			// Init functionalities
			var self = this;
			// Auto adjust
			$window
				.resize(function(e) {
					self.onResize(e.currentTarget);
				}).trigger('resize');
		},
		
		onResize: function(target) {
			var $target = $(target);
			
			console.log(this.images_aspect_ratio);
			
			if($target.width() / $target.height() < this.images_aspect_ratio) {
				this.images
					.css({
						width: '',
						height: '100%'
					});
				} else {
					this.images
						.css({
							width: '100%',
							height: ''
						});
				}
		}
		
	};

	$.fn.backgroundSlideshow = function(args) {
		return this.each(function() {
			new BackgroundSlideshow($(this), args);
		});
	};
	
})(jQuery, window);