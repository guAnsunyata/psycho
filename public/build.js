

$(document).ready(function(){
	//temporay global object before factory object is done
	$nav = $('.test-nav-l #nav-body');
	$title = $('.test-body-title');
	$video = $('.test-body-video video');
	$des = $('.test-body-des');
	$answer = $('.answer');
	$test_body_nav = $('.test-body-nav');
	$finish_btn_html = "<button class='btn btn-danger submit-btn' style='font-size: 20px; padding: 5px 12px 5px 12px;'>完成測驗</button>";
	$event_finish_btn = function event_finish_btn (){
		//submit-btn
		$('.submit-btn').click(function(){
			if(window.sessionStorage || window.localStorage){
				location.href = './result.html#A';
			}else{
				
			}
		});
	};
	$answer_type0 = $('.test-body .answer_type0'); //input
	$answer_type1 = $('.test-body .answer_type1'); //radio
	$answer_type2 = $('.test-body .answer_type2'); //answer
	$answer_type3 = $('.test-body .answer_type3'); //string only
	$answer_all_type = $('.test-body .panel-body>div'); // all type for display control
	var data = [{
		id: 0,
		test_id: '0-1',
		type: 0,
		title: '測驗開場/學號',
		des: '請輸入學號',
		result_des: '',
		type0_input_des: '學號',
		videoURL: 'test-media/1.mp4',
		answer: '',
	},{
		id: 1,
		test_id: '0-2',
		type: 0,
		title: '日期',
		des: '輸入評測日期(Ex.104年10月1日，請填1041001)',
		result_des: '',
		type0_input_des: '日期',
		videoURL: 'test-media/1.mp4',
		answer: '',
	},{
		id: 2,
		test_id: '0-3',
		type: 1,
		subtype: 'radio',
		title: '性別',
		des: '請選擇性別',
		result_des: '',
		type1_options_des: ['男','女'],
		type1_options_val: ['1','0'],
		videoURL: 'test-media/1.mp4',
		answer: '',
	},{
		id: 3,
		test_id: '0-4',
		type: 0,
		title: '年齡',
		des: '請輸入出生年(民國85年出生，請輸入085)',
		result_des: '',
		type0_input_des: '民國',
		videoURL: 'test-media/1.mp4',
		answer: '',
	},{
		id: 4,
		test_id: '0-5',
		type: 1,
		subtype: 'radio',
		title: '就讀學校',
		des: '請選擇就讀學校的類型',
		result_des: '',
		type1_options_des: ['普通班沒有接受資源班的服務','普通班有接受資源班的服務','啟聰班','啟聰學校'],
		type1_options_val: ['1','2','3','4'],
		videoURL: 'test-media/1.mp4',
		answer: '',
	},{
		id: 5,
		test_id: '0-6',
		type: 1,
		subtype: 'radio',
		title: '聽力程度',
		des: '請選擇聽力程度',
		result_des: '',
		type1_options_des: ['輕度','中度','重度','極重度','正常'],
		type1_options_val: ['1','2','3','4','5'],
		videoURL: 'test-media/1.mp4',
		answer: '',
	},{
		id: 6,
		test_id: '0-7',
		type: 1,
		subtype: 'checkbox',
		title: '溝通方式',
		des: '習慣使用的溝通方式（可以複選）',
		result_des: '',
		type1_options_des: ['主要是用手語','主要是用口語','手口語並用','筆談','讀唇'],
		type1_options_val: ['1','2','3','4','5'],
		videoURL: 'test-media/1.mp4',
		answer: '',
	},{
		id: 7,
		test_id: '1',
		type: 2,
		title: '第一題',
		des: '他能邀請剛認識的人一起做些事，比如去打球或看電影嗎？',
		result_des: '',
		videoURL: 'test-media/1.mp4',
		answer: '',
	},{
		id: 8,
		test_id: '2',
		type: 2,
		title: '第二題',
		des: '當你不開心或難過時，他能做些事或說些話讓你心情好一點？',
		result_des: '',
		videoURL: 'test-media/2.mp4',
		answer: '',
	},{
		id: 9,
		test_id: '3',
		type: 2,
		title: '第三題',
		des: '他能讓你願意配合他嗎？比如他想看電影，他的說法或態度能讓你也願意看電影。',
		result_des: '',
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
				$nav.append("<a id='nav"+e.id+"' class='list-group-item nav-cell'>"+done_span+"("+e.test_id+")"+e.title+"</a>");
			}else{
				$nav.append("<a id='nav"+e.id+"' class='list-group-item nav-cell'>"+undone_span+"("+e.test_id+")"+e.title+"</a>");
			}
			$('#nav'+e.id).click(function(){
				switcher._switch(e.id);
			});
		});
	}
	append_nav(data);
	//finish btn !
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

	//answer type 0 : info submit
	$('.input_id').keyup(function(){
		switcher.setAnswer($(this).val());
	});

	//answer type 1 : radio
	$('.answer_type1 .input-group').delegate('.radio_id','click', function(){
		switcher.setAnswer($(this).attr('id'));
	});
	//answer type 1 : checkbox
	$('.answer_type1 .input-group').delegate('.checkbox_id','click', function(){
		var $id_clicked = $(this).attr('id');
		var checkbox_current_ans = switcher.getAnswer(switcher.current_test);
		if(!checkbox_current_ans){
			checkbox_current_ans = [];
			checkbox_current_ans.push($id_clicked);
		}else{
			if(checkbox_current_ans.indexOf($id_clicked) >= 0){
				checkbox_current_ans.splice(checkbox_current_ans.indexOf($id_clicked),1);
			}else{
				checkbox_current_ans.push($id_clicked);
			}
		}
		console.log(checkbox_current_ans);
		switcher.setAnswer(checkbox_current_ans);
	});

	//answer type 2 : setAnswer
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
		testSwitch: function(id){ //testSwitch 內含answer邏輯 需優化
			console.log('test switched:', id);
			this.current_test = id;
			//nav 更新
			$('#nav'+id).addClass('nav-avtive').siblings().removeClass('nav-avtive');

			//test-body 更新
			data_type = data[id].type;
			if(data_type == 0){
				$answer_all_type.css('display','none');
				$answer_type0.css('display','block');
				$answer_type0.find('.input_des').html(data[id].type0_input_des);
				$answer_type0.find('.input_id').attr('id',id);
				$answer_type0.find('.input_id').val(data[id].answer);
			}else if(data_type == 2){
				$answer_all_type.css('display','none');
				$answer_type2.css('display','block');
				//answer 更新
				var current_answer = this.getAnswer(id);
				$.each($answer, function(){
					$(this).children('img').attr('src','images/'+ $(this).attr('id')+'.png');
				});
				if(current_answer != ''){
					$('.answer#'+current_answer).children('img').attr('src','images/'+current_answer+'selected.png');
				}
			}else if(data_type == 1){
				$answer_all_type.css('display','none');
				$answer_type1.css('display','block');
				$answer_type1.children('.input-group').html('');
				//subtype
				if(data[id].subtype == 'radio'){
					var input_type = 'radio';
				}else if(data[id].subtype == 'checkbox'){
					var input_type = 'checkbox';
				}
				for(var i=0; i < data[id].type1_options_val.length; i++){
					//is checked?
					if(data[id].subtype == 'radio'){
						var isChecked = (data[id].answer == data[id].type1_options_val[i]);
					}else if(data[id].subtype == 'checkbox'){
						var isChecked = (data[id].answer.indexOf(data[id].type1_options_val[i]) >= 0);
					}
					if(isChecked){ //if answer is set
						var type1_option_html = "<input class='"+input_type+"_id' type='"+input_type+"' name='"+data[id].des+"' id='"+data[id].type1_options_val[i]+"' checked /><span class='test-radio-span'>"+data[id].type1_options_des[i]+"</span>&nbsp;&nbsp;&nbsp;";
						//$('#'+data[id].type1_options_val[i]).attr("checked",true);
					}else{
						var type1_option_html = "<input class='"+input_type+"_id' type='"+input_type+"' name='"+data[id].des+"' id='"+data[id].type1_options_val[i]+"' /><span class='test-radio-span'>"+data[id].type1_options_des[i]+"</span>&nbsp;&nbsp;&nbsp;";
					}
					$answer_type1.children('.input-group').append(type1_option_html);	
				}				
			}else if(data_type == 3){
				$answer_all_type.css('display','none');
				$answer_type3.css('display','block');
			}else{
				//error
			}
			
		},
		appendTitle: function(id, content){
			var html = "<h3>("+data[id].test_id+") "+content+"</h3>"
			$title.html(html);
		},
		appendDescription: function(id, content){
			var html = '<b>'+data[id].test_id+'. '+content+'</b>';
			$des.html(html);
		},
		appendVideoURL: function(content){
			//var html = "<video controls src='"+content+"' width='768' height='332'></video>";
			$video.attr('src', content);
		},
		_switch: function _switch(id){
			this.testSwitch(id);
			this.appendTitle(data[id].id, data[id].title);
			this.appendDescription(data[id].id, data[id].des);
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

