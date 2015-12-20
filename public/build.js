

$(document).ready(function(){
	//temporay global object before factory object is done
	$nav = $('.test-nav-l #nav-body');
	$title = $('.test-body-title');
	$video = $('.test-body-video video');
	$des = $('.test-body-des');
	$answer = $('.answer');
	$test_body_nav = $('.test-body-nav');
	$finish_btn_html = "<button class='btn btn-primary submit-btn' style='font-size: 20px; padding: 5px 12px 5px 12px;'>完成測驗</button>";
	$event_finish_btn = function event_finish_btn (){
		//submit-btn
		$('.submit-btn').click(function(){
			if(window.sessionStorage || window.localStorage){
				location.href = './result.html#A';
			}else{
				
			}
		});
	};
	var data = [{
		id: 0,
		title: '第一題',
		des: '他能邀請剛認識的人一起做些事，比如去打球或看電影嗎？',
		videoURL: 'test-media/1.mp4',
		answer: '',
	},{
		id: 1,
		title: '第二題',
		des: '當你不開心或難過時，他能做些事或說些話讓你心情好一點？',
		videoURL: 'test-media/2.mp4',
		answer: '',
	},{
		id: 2,
		title: '第三題',
		des: '他能讓你願意配合他嗎？比如他想看電影，他的說法或態度能讓你也願意看電影。',
		videoURL: 'test-media/3.mp4',
		answer: '',
	}];
	//storage
	var finish_count = 0;
	if(window.sessionStorage || window.localStorage){
		console.log(JSON.parse(sessionStorage.getItem('psycho-Answer-storage-A')));
		if(sessionStorage.getItem('psycho-Answer-storage-A')){
			//若已經有記錄，使用記錄作為資料。
			data = JSON.parse(sessionStorage.getItem('psycho-Answer-storage-A'));
			finish_count = sessionStorage.getItem('psycho-Answer-storage-A-finish_count');
		}
	}else{
		alert('警告：您的瀏覽器不支援永久儲存功能，請勿重新整理或關閉瀏覽器。(可執行資料夾中的chrome安裝檔，使用chrome可獲得此功能)');
	}
	
	var switcher = new test_switcher(data, finish_count);
	function append_nav(data){
		var done_span = "<span class='check done'></span>";
		var undone_span = "<span class='check undone'></span>"
		data.forEach(function(e){
			//$nav.append("<span class='nav-cell' id='nav"+e.id+"'><span class='check undone'>未填</span>("+e.id+")"+e.title+"</span><br/>");
			if(e.answer){
				$nav.append("<a id='nav"+e.id+"' class='list-group-item nav-cell'>"+done_span+"("+e.id+")"+e.title+"</a>");
			}else{
				$nav.append("<a id='nav"+e.id+"' class='list-group-item nav-cell'>"+undone_span+"("+e.id+")"+e.title+"</a>");
			}
			$('#nav'+e.id).click(function(){
				switcher._switch(e.id);
			});
		});
	}
	append_nav(data);
	if(switcher.finish_count >= switcher.data_length){
		switcher.alert_finish = false;
		$test_body_nav.append($finish_btn_html);
		$event_finish_btn();
	}

	switcher._switch(0);
	//$video[0].pause();

	//video addition controls
	var video_status = true;
	$video.click(function(){
		if(!video_status){
			$video[0].play();
			video_status = !video_status;
		}else{
			$video[0].pause();
			video_status = !video_status;
		}
	});

	//next-btn
	$('.next-btn').click(function(){
		switcher._switchNext();
	});

	//answer
	$answer.click(function(){
		switcher.setAnswer($(this).attr('id'));
		$siblings_div = $(this).siblings();
		//answer-siblings
		$.each($siblings_div, function(){
			$(this).children('img').attr('src','images/'+ $(this).attr('id')+'.png');
		});
		//answer-onclick
		$(this).children('img').attr('src','images/'+$(this).attr('id')+'selected.png');
		console.log('set answer ',$(this).attr('id'));
	});

});

function test_switcher(data, finish_count){ //耦合於data
	var switcher = {
		current_test: 0,
		finish_count: finish_count,
		alert_finish: true,
		data_length: data.length,
		testSwitch: function(id){
			console.log('test switched:', id);
			this.current_test = id;
			//nav 更新
			$('#nav'+id).addClass('nav-avtive').siblings().removeClass('nav-avtive');
			//answer 更新
			console.log('get getAnswer: ',this.getAnswer(id));
			var current_answer = this.getAnswer(id);
			$.each($answer, function(){
				$(this).children('img').attr('src','images/'+ $(this).attr('id')+'.png');
			});
			if(current_answer != ''){
				$('.answer#'+current_answer).children('img').attr('src','images/'+current_answer+'selected.png');
			}
		},
		appendTitle: function(id, content){
			var html = "<h3>("+id+") "+content+"</h3>"
			$title.html(html);
		},
		appendDescription: function(id, content){
			var html = '<b>'+id+'. '+content+'</b>';
			$des.html(html);
		},
		appendVideoURL: function(content){
			//var html = "<video controls src='"+content+"' width='768' height='332'></video>";
			$video.attr('src', content);
		},
		_switch: function _switch(id){
			this.testSwitch(id);
			this.appendTitle(data[id].id+1, data[id].title);
			this.appendDescription(data[id].id+1, data[id].des);
			this.appendVideoURL(data[id].videoURL);
			$video[0].play();
		},
		_switchNext: function _switchNext(){
			console.log(this.current_test);
			this._switch(this.current_test+1);
		},
		getCurrent: function getCurrent(){
			return this.current_test
		},
		setAnswer: function setAnswer(ans){
			data[this.current_test].answer = ans;
			var temp_count = 0;
			data.forEach(function(d){
				if(d.answer != '') temp_count++;
			});
			this.finish_count = temp_count;
			sessionStorage.setItem('psycho-Answer-storage-A', JSON.stringify(data));
			sessionStorage.setItem('psycho-Answer-storage-A-finish_count', this.finish_count);
			console.log(this.data_length);
			if(this.finish_count >= this.data_length && this.alert_finish){
				if(this.alert_finish){
					window.setTimeout(function(){alert('您已完成測驗！請點選頁面下方的按鈕將答案送出。')},10);
					this.alert_finish = false;
					$test_body_nav.append($finish_btn_html);
					$event_finish_btn();
				}
			}
			$('#nav'+this.current_test+' span').removeClass('undone').addClass('done');
		},
		getAnswer: function getAnswer(id){
			return data[id].answer
		},
		printResult: function printResult(){
			return this.data.answer
		},
		getSource: function getSource(){
			return data
		}
	};
	return switcher
}

