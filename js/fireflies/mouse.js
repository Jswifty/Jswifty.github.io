/**  
 *	mouse.js is an object class which monitors mouse events triggered from the given div container.
 *  It also captures details of the input over time in terms of location and motion.
 */ 
define(function (require) {

	return function(divContainer) {
		
		var mouse = this;
		
		/* Time delay determined to be a mouse click, by default is 0.15 second. */
		this.CLICK_DELAY = 150;
		
		/* The DOM element that this mouse is listening to. */
		this.listenElement = null;
		
		/* The thread for calling the mouse stop event function. */
		this.stoppingThread = null;
		
		/* Previous update time-stamp of all mouse actions. */
		this.lastUpdateTime = 0;
		
		/* Whether the a mouse key is pressed down. */
		this.isMouseDown = false;
		
		/* Previous update time-stamp of a mouse down action. */
		this.lastMouseDownTime = 0;
		
		/* Whether the mouse is currently contacted by touch surface. */
		this.isTouching = false;
		
		/* Previous mouse position. */
		this.previousPosition = null;
		
		/* Current mouse position. */
		this.position = null;
		
		/* Current mouse direction. */
		this.direction = 0;
		
		/* Current mouse moved distance. */
		this.movedDistance = 0;
		
		/* Current mouse moving speed. */
		this.movingSpeed = 0;
		
		/* Whether the mouse skips the default behaviours upon the listen element. */
		this.preventDefault = false;
		
		/* The list of listeners this mouse is appended to. Each mouse event will trigger the corresponding method of each listeners. */
		this.listeners = [];
		
		/** Calculate the distance from the origin position to the destination position. */
		this.getDistance = function (position1, position2) {
			var distance = { x: position2.x - position1.x, y: position2.y - position1.y };
			return Math.sqrt(distance.x * distance.x + distance.y * distance.y);
		};
		
		/** Calculate the angle using trigonometry. Returns angle ranged from -180 to 180 degrees in radian. */
		this.getAngle = function (x, y, z) {
			return x > 0 ? Math.asin(y / z) : (y > 0 ? Math.PI - Math.asin(y / z) : -Math.asin(y / z) - Math.PI);
		};
		
		/** Calculate the directional angle to the destination position in terms of the angle oriented from the East. */
		this.getDirection = function (position1, position2) {
			var distance = { x: position2.x - position1.x, y: position2.y - position1.y };
			var distanceMag = Math.sqrt(distance.x * distance.x + distance.y * distance.y);
			return mouse.getAngle(distance.x, distance.y, distanceMag);
		};
		
		/** Update the Position of the mouse. */
		this.updatePosition = function (newPosition) {

			/* Get the current time. */
			var currentTime = Date.now();
			
			/* Calculate the moved distance. */
			mouse.movedDistance = mouse.position != null && newPosition != null ? mouse.getDistance(mouse.position, newPosition) : 0;
			
			/* Calculate the moving speed from time difference and distance. */
			var timeDiff = (currentTime - mouse.lastUpdateTime) / 1000;
			mouse.movingSpeed = timeDiff > 0 ? mouse.movedDistance / timeDiff : 0;
			
			/* Update the mouse direction with the new position. */
			mouse.direction = mouse.position != null && newPosition != null ? mouse.getDirection(mouse.position, newPosition) : 0;
			
			/* Update the mouse position. */
			mouse.previousPosition = mouse.position != null ? { x : mouse.position.x, y : mouse.position.y } : null;
			mouse.position = newPosition != null ? { x : newPosition.x, y : newPosition.y } : null;
			
			/* Update the time-stamp. */
			mouse.lastUpdateTime = currentTime;
		};
		
		/** Perform action for over event */
		this.onMouseOver = function (event) {
			for (var i = 0; i < mouse.listeners.length; i++) {
				mouse.listeners[i].onMouseOver(event);
			}
		};
		
		/** Perform action for out event */
		this.onMouseOut = function (event) {
			for (var i = 0; i < mouse.listeners.length; i++) {
				mouse.listeners[i].onMouseOut(event);
			}
		};
		
		/** Perform action for down event */
		this.onMouseDown = function (event) {
			for (var i = 0; i < mouse.listeners.length; i++) {
				mouse.listeners[i].onMouseDown(event);
			}
		};

		/** Perform action for up event */
		this.onMouseUp = function (event) {
			for (var i = 0; i < mouse.listeners.length; i++) {
				mouse.listeners[i].onMouseUp(event);
			}
		};

		/** Perform action for move event */
		this.onMouseMove = function (event) {
			for (var i = 0; i < mouse.listeners.length; i++) {
				mouse.listeners[i].onMouseMove(event);
			}
		};
		
		/** Perform action for stop event */
		this.onMouseStop = function (event) {
			for (var i = 0; i < mouse.listeners.length; i++) {
				mouse.listeners[i].onMouseStop(event);
			}
		};

		/** Perform action for click event */
		this.onMouseClick = function (event) {
			for (var i = 0; i < mouse.listeners.length; i++) {
				mouse.listeners[i].onMouseClick(event);
			}
		};

		/** When the mouse comes into the parent container. */
		this.overEventMethod = function (event) {

			if (mouse.isTouching === false) {
				
				/* Put mouse as a reference in the event. */
				event.mouse = mouse;
				
				/* Skip the default behaviours upon this event. */
				if (mouse.preventDefault) {
					event.preventDefault();
				}
				
				/* Update the mouse position with a null position to refresh the statistics. */
				mouse.updatePosition(null);
				
				/* Perform action for over event */
				mouse.onMouseOver(event);
			}
		};

		/** When the mouse moves out from the parent container. */
		this.outEventMethod = function (event) {

			if (mouse.isTouching === false) {
				
				/* Put mouse as a reference in the event. */
				event.mouse = mouse;
				
				/* Skip the default behaviours upon this event. */
				if (mouse.preventDefault) {
					event.preventDefault();
				}
				
				/* Update the mouse position with a null position to clear the statistics. */
				mouse.updatePosition(null);
				
				/* Perform action for out event */
				mouse.onMouseOut(event);
			}
		};

		/** When the mouse is pressed. */
		this.downEventMethod = function (event) {

			if (mouse.isTouching === false) {
				
				/* Put mouse as a reference in the event. */
				event.mouse = mouse;
				
				/* Skip the default behaviours upon this event. */
				if (mouse.preventDefault) {
					event.preventDefault();
				}
				
				/* Update the mouse position. */
				mouse.updatePosition({ x: event.pageX, y: event.pageY });
				
				/* Update the mouse down flag and time-stamp. */
				mouse.isMouseDown = true;
				mouse.lastMouseDownTime = mouse.lastUpdateTime;
				
				/* Perform action for down event. */
				mouse.onMouseDown(event);
			}
		};

		/** When the mouse's button is released. */
		this.upEventMethod = function (event) {

			if (mouse.isTouching === false) {
				
				/* Put mouse as a reference in the event. */
				event.mouse = mouse;
				
				/* Skip the default behaviours upon this event. */
				if (mouse.preventDefault) {
					event.preventDefault();
				}
				
				/* Update the mouse position. */
				mouse.updatePosition({ x: event.pageX, y: event.pageY });
				
				/* Update the mouse down flag. */
				mouse.isMouseDown = false;

				if (mouse.lastUpdateTime - mouse.lastMouseDownTime <= mouse.CLICK_DELAY) {
					mouse.clickEventMethod(event);
				}
				
				/* Perform action for up event. */
				mouse.onMouseUp(event);
			}
		};

		/** When the mouse is moving. */
		this.moveEventMethod = function (event) {

			if (mouse.isTouching === false) {
				
				/* Put mouse as a reference in the event. */
				event.mouse = mouse;
				
				/* Skip the default behaviours upon this event. */
				if (mouse.preventDefault) {
					event.preventDefault();
				}
				
				/* Update the mouse position. */
				mouse.updatePosition({ x: event.pageX, y: event.pageY });
				
				/* Re-initiate the stopping thread, calling the mouse stop in 0.05s. */
				clearTimeout(mouse.stoppingThread);
				mouse.stoppingThread = setTimeout(function() { mouse.stopEventMethod(event); }, 50);
				
				/* Perform action for move event */
				mouse.onMouseMove(event);
			}
		};
		
		/** When the mouse has stop moving in the container. */
		this.stopEventMethod = function (event) {

			if (mouse.isTouching === false) {
				
				/* Put mouse as a reference in the event. */
				event.mouse = mouse;
				
				/* Update the mouse position. */
				mouse.updatePosition({ x: event.pageX, y: event.pageY });
				
				/* Perform action for stop event */
				mouse.onMouseStop(event);
			}
		};

		/** When the mouse clicks. */
		this.clickEventMethod = function (event) {

			if (mouse.isTouching === false) {

				/* Put mouse as a reference in the event. */
				event.mouse = mouse;
				
				/* Update the mouse position. */
				mouse.updatePosition({ x: event.pageX, y: event.pageY });
				
				/* Perform action for stop event */
				mouse.onMouseClick(event);
			}
		};

		/** When a contact is made on the touch surface. */
		this.touchStartMethod = function (event) {
			
			mouse.isTouching = true;

			/* Put mouse as a reference in the event. */
			event.mouse = mouse;
			
			/* Skip the default behaviours upon this event. */
			if (mouse.preventDefault) {
				event.preventDefault();
			}
			
			/* Update the mouse position. */
			mouse.updatePosition({ x: event.changedTouches[0].pageX, y: event.changedTouches[0].pageY });
			
			/* Update the mouse down flag and time-stamp. */
			mouse.isMouseDown = true;
			mouse.lastMouseDownTime = mouse.lastUpdateTime;
			
			/* Perform action for down event. */
			mouse.onMouseDown(event);
		};

		/** When a contact is remove on the touch surface. */
		this.touchEndMethod = function (event) {

			/* Put mouse as a reference in the event. */
			event.mouse = mouse;
			
			/* Skip the default behaviours upon this event. */
			if (mouse.preventDefault) {
				event.preventDefault();
			}
			
			/* Update the mouse position. */
			mouse.updatePosition({ x: event.changedTouches[0].pageX, y: event.changedTouches[0].pageY });
			
			/* Update the mouse down flag. */
			mouse.isMouseDown = false;

			if (mouse.lastUpdateTime - mouse.lastMouseDownTime <= mouse.CLICK_DELAY) {
				mouse.clickEventMethod(event);
			}
			
			/* Perform action for up event. */
			mouse.onMouseUp(event);

			setTimeout(function () { mouse.isTouching = false; }, 0);
		};

		/** When a touch point moves across the touch surface. */
		this.touchMoveMethod = function (event) {
			
			mouse.isTouching = true;

			/* Put mouse as a reference in the event. */
			event.mouse = mouse;
			
			/* Skip the default behaviours upon this event. */
			if (mouse.preventDefault) {
				event.preventDefault();
			}
			
			/* Update the mouse position. */
			mouse.updatePosition({ x: event.changedTouches[0].pageX, y: event.changedTouches[0].pageY });
			
			/* Re-initiate the stopping thread, calling the mouse stop in 0.05s. */
			clearTimeout(mouse.stoppingThread);
			mouse.stoppingThread = setTimeout(function() { mouse.stopEventMethod(event); }, 50);
			
			/* Perform action for move event */
			mouse.onMouseMove(event);
		};

		/** When a contact enters the bound-to element on the touch surface. */
		this.touchEnterMethod = function (event) {
			
			mouse.isTouching = true;

			/* Put mouse as a reference in the event. */
			event.mouse = mouse;
			
			/* Skip the default behaviours upon this event. */
			if (mouse.preventDefault) {
				event.preventDefault();
			}
			
			/* Update the mouse position with a null position to refresh the statistics. */
			mouse.updatePosition(null);
			
			/* Perform action for over event */
			mouse.onMouseOver(event);
		};

		/** When a contact leaves the bound-to element on the touch surface. */
		this.touchLeaveMethod = function (event) {

			/* Put mouse as a reference in the event. */
			event.mouse = mouse;
			
			/* Skip the default behaviours upon this event. */
			if (mouse.preventDefault) {
				event.preventDefault();
			}
			
			/* Update the mouse position with a null position to refresh the statistics. */
			mouse.updatePosition(null);
			
			/* Perform action for over event */
			mouse.onMouseOut(event);

			setTimeout(function () { mouse.isTouching = false; }, 0);
		};

		/** When a contact gets cancelled. This can occur if the user has moved 
		 *	the touch point outside the browser UI or into a plugin or if an alert modal pops up. */
		this.touchCancelMethod = function (event) {
			
			/* Put mouse as a reference in the event. */
			event.mouse = mouse;
			
			/* Skip the default behaviours upon this event. */
			if (mouse.preventDefault) {
				event.preventDefault();
			}
			
			/* Update the mouse position with a null position to refresh the statistics. */
			mouse.updatePosition(null);
			
			/* Perform action for over event */
			mouse.onMouseOut(event);

			setTimeout(function () { mouse.isTouching = false; }, 0);
		};

		/** Add a mouse listener to the mouse. */
		this.addMouseListener = function (mouseListener) {
			
			/* Check if the input object is an instance of MouseListener. */
			if (mouseListener.onMouseOver && mouseListener.onMouseOut && mouseListener.onMouseDown && mouseListener.onMouseUp && 
				mouseListener.onMouseMove && mouseListener.onMouseStop && mouseListener.onMouseClick) {
				mouse.listeners.push(mouseListener);
			}
		};

		/** Remove a mouse listener from the mouse. */
		this.removeMouseListener = function (mouseListener) {
			
			/* Check if the input object is an instance of MouseListener. */
			if (mouseListener.onMouseOver && mouseListener.onMouseOut && mouseListener.onMouseDown && mouseListener.onMouseUp && 
				mouseListener.onMouseMove && mouseListener.onMouseStop && mouseListener.onMouseClick) {
				
				/* Attempt to find the index of the given listener and then remove it. */
				for (var i = mouse.listeners.length - 1; i >= 0; i--) {
					if (mouse.listeners[i] === mouseListener) {
						mouse.listeners.splice(i, 1);
					}
				}
			}
		};

		/** Append the mouse to the a DOM element and event functions to it. */
		this.attachToElement = function (element) {
		
			/* Store a reference of the DOM element. */
			mouse.listenElement = element;
			
			/* Engage the essential mouse events to each corresponding handler. */
			
			mouse.listenElement.addEventListener("mouseover", mouse.overEventMethod, false);
			mouse.listenElement.addEventListener("mouseout", mouse.outEventMethod, false);
			mouse.listenElement.addEventListener("mousedown", mouse.downEventMethod, false);
			mouse.listenElement.addEventListener("mouseup", mouse.upEventMethod, false);
			mouse.listenElement.addEventListener("mousemove", mouse.moveEventMethod, false);
			
			mouse.listenElement.addEventListener("touchenter", mouse.touchEnterMethod, false);
			mouse.listenElement.addEventListener("touchleave", mouse.touchLeaveMethod, false);
			mouse.listenElement.addEventListener("touchstart", mouse.touchStartMethod, false);
			mouse.listenElement.addEventListener("touchend", mouse.touchEndMethod, false);
			mouse.listenElement.addEventListener("touchmove", mouse.touchMoveMethod, false);
			mouse.listenElement.addEventListener("touchcancel", mouse.touchCancelMethod, false);
		};

		/** Disengage the mouse from DOM element and event functions from it. */
		this.detachFromElement = function () {
			
			/* Remove the reference of the DOM element. */
			mouse.listenElement = null;

			/* Disengage all the mouse events from each corresponding handler. */
			
			mouse.listenElement.removeEventListener("mouseover", mouse.overEventMethod, false);
			mouse.listenElement.removeEventListener("mouseout", mouse.outEventMethod, false);
			mouse.listenElement.removeEventListener("mousedown", mouse.downEventMethod, false);
			mouse.listenElement.removeEventListener("mouseup", mouse.upEventMethod, false);
			mouse.listenElement.removeEventListener("mousemove", mouse.moveEventMethod, false);

			mouse.listenElement.removeEventListener("touchenter", mouse.touchEnterMethod, false);
			mouse.listenElement.removeEventListener("touchleave", mouse.touchLeaveMethod, false);
			mouse.listenElement.removeEventListener("touchstart", mouse.touchStartMethod, false);
			mouse.listenElement.removeEventListener("touchend", mouse.touchEndMethod, false);
			mouse.listenElement.removeEventListener("touchmove", mouse.touchMoveMethod, false);
			mouse.listenElement.removeEventListener("touchcancel", mouse.touchCancelMethod, false);
		};

		/** Toggle value for mouse prevent default on all events. */
		this.setPreventDefault = function (preventDefault) {
			mouse.preventDefault = preventDefault;
		};

		/* Append the canvas to the DIV container. */
		if (divContainer) {
			this.attachToElement(divContainer);
		}
	};
});
