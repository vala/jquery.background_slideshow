# jquery.backgroundSlideshow

This plugin can be used in order to set a background slideshow in the background of a 100% width & height body

## Usage

backgroundSlideshow's constructor method takes an option hash parameter.

Defaults are :
```javascript
{
	data: [],
	timer_delay: 5000,
	fade_time: 3000
}
```

Example usage :

```javascript
$('body')
	.backgroundSlideshow({
		data: [
			'/path/to/image1.jpg',
			'/path/to/image2.jpg'
		],
		timer_delay: 5000,
		fade_time: 3000
	});
```

