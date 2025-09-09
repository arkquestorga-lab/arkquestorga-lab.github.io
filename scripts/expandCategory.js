function hide(target, button) {
	let info = document.getElementById(target);
	let source = document.getElementById(button);
	if (info.style.display === "none") {
		info.style.display = "block";
		source.innerHTML = "&#9652;";
	} else {
		info.style.display = "none";
		source.innerHTML = "&#9662;";
	}
}

function flipContent(a) {
	let elem1 = document.getElementById(a);
	if (elem1.style.display === "none") {
		elem1.style.display = "block";
	} else {
		elem1.style.display = "none";
	}
}

function openDest(target) {
	closeOther(target);
	let info = document.getElementById(target);
	if (info.style.display === "none") {
		info.style.display = "block";
	}
}

function openDetails(target) {
	disableScroll();
	let show = document.getElementById(target);
	show.style.display = "block";
}

function closeDetails(target) {
	let hide = document.getElementById(target);
	hide.style.display = "none";
	enableScroll();
}

function switchDetails(source, target) {
	closeDetails(source);
	openDetails(target);
}

function switchTo(target) {
	closeOther(target);
	let show = document.getElementById(target);
	if (show.style.display === "none") {
		show.style.display = "block";
	} else {
		show.style.display = "none";
	}
}

function closeOther(target) {
	switch (target) {
		case "portraitsRed":
			document.getElementById("portraitsGreen").style.display = "none";
			document.getElementById("portraitsBlue").style.display = "none";
			break;
		case "portraitsGreen":
			document.getElementById("portraitsRed").style.display = "none";
			document.getElementById("portraitsBlue").style.display = "none";
			break;
		case "portraitsBlue":
			document.getElementById("portraitsRed").style.display = "none";
			document.getElementById("portraitsGreen").style.display = "none";
	}
}

function toggle(layer) {
	let overlay = document.getElementById("layer" + layer);
	let marker = document.getElementById("check" + layer);
	if (overlay.style.display === "none") {
		overlay.style.display = "block";
		marker.innerHTML = "&#9745;";
	} else {
		overlay.style.display = "none";
		marker.innerHTML = "&#9744;";
	}
}

function toggleHalf(layer) {
	let overlay = document.getElementById("layer" + layer);
	let marker = document.getElementById("check" + layer);
	if (overlay.style.display === "none") {
		overlay.style.display = "block";
	} else {
		overlay.style.display = "none";
	}
}

function toggleAll(layer, count) {
	let marker = document.getElementById("check" + layer);
	// not all marked or shown
	if (marker.innerText === "☐") {
		console.log("attempt filling all Checkmarks");
		for (let i = 1; i <= count; i++) {
			document.getElementById("layer" + layer + i).style.display = "block";
			document.getElementById("check" + layer + i).innerHTML = "&#9745;";
		}
		marker.innerHTML = "&#9745;";
	}
	// all marked or shown
	else {
		for (let i = 1; i <= count; i++) {
			document.getElementById("layer" + layer + i).style.display = "none";
			document.getElementById("check" + layer + i).innerHTML = "&#9744;";
		}
		marker.innerHTML = "&#9744;";
	}
}

function checkAll(layer, count) {
	let allChecked = true;
	for (let i = 1; i <= count; i++) {
		if(document.getElementById("check" + layer + i).innerText === "☐"){
			allChecked = false;
			break;
		}
	}
	if(allChecked) {
		document.getElementById("check" + layer).innerHTML = "&#9745;";
	} else {
		document.getElementById("check" + layer).innerHTML = "&#9744;";
	}
}

function expand(category) {
	let subsection = document.getElementById("submenu" + category);
	let marker = document.getElementById("extend" + category);
	if (subsection.style.display === "none") {
		subsection.style.display = "block";
		marker.innerHTML = "&#9652;";
	} else {
		subsection.style.display = "none";
		marker.innerHTML = "&#9662;";
	}
}

function disableScroll() {
	/*
	// Get the current page scroll position
	scrollTop =
		window.pageYOffset ||
		document.documentElement.scrollTop;
	scrollLeft =
		window.pageXOffset ||
		document.documentElement.scrollLeft,

		// if any scroll is attempted,
		// set this to the previous value
		window.onscroll = function() {
			window.scrollTo(scrollLeft, scrollTop);
		};
	/**/
}

function enableScroll() {
	window.onscroll = function() { };
}

function lost(target) {
	let useless = document.getElementById(target);
	useless.style.display = "block";
}