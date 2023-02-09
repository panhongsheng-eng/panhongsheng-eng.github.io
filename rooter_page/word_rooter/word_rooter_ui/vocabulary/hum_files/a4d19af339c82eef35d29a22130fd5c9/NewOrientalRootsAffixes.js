FixNewOrientalRootAffixUI();
function FixNewOrientalRootAffixUI() {
	if (!navigator.userAgent.toLowerCase().includes('goldendict')) {
		var paddingDiv = document.querySelector("div.golden-dict-padding"); // 点击每个例词的音标返回顶部div.golden-dict-padding 元素位置，对于欧路本不用添加此仅用于GoldenDict的padding，故将该元素height设置为1px
		if (paddingDiv) {
			paddingDiv.style.height = '1px';
		}
		var arrWordEntries = document.querySelectorAll("div.words-entries div.word-entry, div.words-entries div.key-word-entry");
		for (var i=0; i<arrWordEntries.length; i++) {
			arrWordEntries[i].classList.add('non-golden-dict-padding'); // 欧路词典每个词entry之间间距看起来太小在此加大
		}
		var arrPTags = document.querySelectorAll("div.words-entries div.word-entry p, div.words-entries div.key-word-entry p");
		for (var j=0; j<arrPTags.length; j++) {
			arrPTags[j].classList.add('non-golden-dict-padding'); // 欧路词典每个词entry之间间距看起来太小在此加大
		}		
	}	
}

function SwitchMore(event) {
	var noticeNode = document.querySelector('.new-oriental-root-affix-notice-status-added');
	if (noticeNode) {		
		noticeNode.remove();
		return;
	}
		
	clearTimeout(timerNewOrientalRootAffix);
	var next = event.target.nextElementSibling;
	while (next && !(next.classList.contains('words-entries'))) {
		next = next.nextElementSibling;
	}
	if (next) {
		SwitchOnOffUnderEle(next);
	}
}

function SwitchMoreMouseDown (event) {
	if (!rootAffixTools.storage || event.button != 0) {
		return;
	}
	target = event.target.nextElementSibling;
	var next = target;
	while (next && !(next.classList.contains('words-entries'))) {
		next = next.nextElementSibling;
	}
	if (next) {
		timerNewOrientalRootAffix = setTimeout(ToggleMenuNewOrientalRootAffix(next), 1000);
	}
}
var timerNewOrientalRootAffix, target;
function ToggleMenuNewOrientalRootAffix (wordsEntries) { // 长按超过时延设置当前展开或收纳状态为默认状态
	return function() {
		var noticeNode = document.createElement("div");
		noticeNode.classList.add('new-oriental-root-affix-notice-status-added');
		noticeNode.style.textAlign = 'center';
		noticeNode.style.fontSize = '16px';			
		noticeNode.style.fontWeight = 'bold';		
		noticeNode.style.color = 'red';
		target.parentNode.insertBefore(noticeNode, target);		
		if (CheckOnOffUnderEle(wordsEntries)) {			
			rootAffixTools.storage.setItem('New-Oriental-Root-Affix', 'true');
			noticeNode.innerText = '默认展开';
		} else {			
			rootAffixTools.storage.removeItem('New-Oriental-Root-Affix');
			noticeNode.innerText = '默认收纳';
		}		
	}		
}

function SwitchMoreInSense(event) {
	SwitchOnOffUnderEle(event.target.parentNode);
}

var flashingTimes = 0;
var flashingTimer;
var lastFlashingEle;

function SwitchHeadWord(event) {
	var wordsEntries = event.target.parentNode.nextElementSibling.nextElementSibling;
	var arrHeadWordSpans = wordsEntries.querySelectorAll("div.word-entry>p>span.bold, div.key-word-entry>p>span.bold");
	var wordEntryToShow;
	for (var i=0; i<arrHeadWordSpans.length; i++) {
		if (arrHeadWordSpans[i].innerText == event.target.innerText) {
			wordEntryToShow = arrHeadWordSpans[i].parentNode.parentNode;
			wordEntryToShow.style.display = 'block';
			toggleClass(wordEntryToShow, 'flashing-shown-word-entry');	
			break;
		}
	}
	flashingTimes = 0;
	if (flashingTimer) { // 如果点击一个单词之后闪烁尚未结束就立即点击下一个单词，会出现混乱
		clearInterval(flashingTimer); 
		lastFlashingEle.classList.remove('flashing-shown-word-entry');
	}
	lastFlashingEle = wordEntryToShow;
	flashingTimer = setInterval(function() {
		if (flashingTimes++ == 3) {
			// var evt = document.createEvent("HTMLEvents"); //模拟再次点击，避免手工点击之后被隐藏元素转为显示但不跳转的现象
			// evt.initEvent("click", false, true);
			// event.target.dispatchEvent(evt);			
			clearInterval(flashingTimer);
			wordEntryToShow.classList.remove('flashing-shown-word-entry');			
		} else {
			toggleClass(wordEntryToShow, 'flashing-shown-word-entry');
		}		
	}, 500);
}

function SwitchOnOffUnderEle(ele) {
	var target0nOff = !CheckOnOffUnderEle(ele);
	var arrWordEntries = ele.querySelectorAll('div.word-entry');
	for (var i=0; i<arrWordEntries.length; i++) {
		if (target0nOff) {
			arrWordEntries[i].style.display = 'block';
		} else {
			arrWordEntries[i].style.display = 'none';
		}
	}
	var keywordEntries = ele.querySelectorAll('div.key-word-entry');	
	for (var i=0; i<keywordEntries.length; i++) {
		if (target0nOff) {
			keywordEntries[i].classList.add('key-head-word');
		} else {
			keywordEntries[i].classList.remove('key-head-word');
		}
	}
}

function CheckOnOffUnderEle(ele) {
	var arrWordEntries = ele.querySelectorAll('div.word-entry');
	for (var i=0; i<arrWordEntries.length; i++) {
		if (getComputedStyle(arrWordEntries[i]).display == 'none') {
			return false;
		}		
	}
	return true;
}

function hasClass(obj, cls) {  
	return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
}  
              
function addClass(obj, cls) {  
	if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
}  

function removeClass(obj, cls) {  
	if (hasClass(obj, cls)) {  
		var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
		obj.className = obj.className.replace(reg, ' ');  
	}  
}  
              
function toggleClass(obj, cls) {  
	if (hasClass(obj,cls)) {  
		removeClass(obj, cls);  
	} else {  
		addClass(obj, cls);  
	}  
}

rootAffixTools = {};
rootAffixTools.DetectStorage = function() {
	var keyTesting = 'KeyTestingRootAffix', valTesting = 'KeyTestingRootAffix';	
	if (localStorage) {
		localStorage.setItem(keyTesting, valTesting);
		if (localStorage.getItem(keyTesting) == valTesting) {
			localStorage.removeItem(keyTesting);
			rootAffixTools.storage = localStorage;
		}			
	} else if (sessionStorage) {
		sessionStorage.setItem(keyTesting, valTesting);
		if (sessionStorage.getItem(keyTesting) == valTesting) {
			sessionStorage.removeItem(keyTesting);
			rootAffixTools.storage = sessionStorage;				
		}		
	}
}
rootAffixTools.DetectStorage();
if (rootAffixTools.storage.getItem('New-Oriental-Root-Affix') != null) {
	var arrWordsEntries = document.querySelectorAll('div.MdxNewOrientalRootsAffixes div.words-entries.default-show-key-head-word-only');
	for (var i=0; i<arrWordsEntries.length; i++) {
		SwitchOnOffUnderEle(arrWordsEntries[i]);
	}	
}
