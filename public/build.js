

$(document).ready(function(){
	$nav = $('.test-nav-l #nav-body');
	$title = $('.test-body-title');
	$video = $('.test-body-video video');
	$des = $('.test-body-des');
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
	},{
		id: 2,
		title: '第三題',
		des: '他能讓你願意配合他嗎？比如他想看電影，他的說法或態度能讓你也願意看電影。',
		videoURL: 'test-media/3.mp4',
		answer: '',
	},{
		id: 2,
		title: '第三題',
		des: '他能讓你願意配合他嗎？比如他想看電影，他的說法或態度能讓你也願意看電影。',
		videoURL: 'test-media/3.mp4',
		answer: '',
	},{
		id: 2,
		title: '第三題',
		des: '他能讓你願意配合他嗎？比如他想看電影，他的說法或態度能讓你也願意看電影。',
		videoURL: 'test-media/3.mp4',
		answer: '',
	},{
		id: 2,
		title: '第三題',
		des: '他能讓你願意配合他嗎？比如他想看電影，他的說法或態度能讓你也願意看電影。',
		videoURL: 'test-media/3.mp4',
		answer: '',
	},{
		id: 2,
		title: '第三題',
		des: '他能讓你願意配合他嗎？比如他想看電影，他的說法或態度能讓你也願意看電影。',
		videoURL: 'test-media/3.mp4',
		answer: '',
	},{
		id: 2,
		title: '第三題',
		des: '他能讓你願意配合他嗎？比如他想看電影，他的說法或態度能讓你也願意看電影。',
		videoURL: 'test-media/3.mp4',
		answer: '',
	},{
		id: 2,
		title: '第三題',
		des: '他能讓你願意配合他嗎？比如他想看電影，他的說法或態度能讓你也願意看電影。',
		videoURL: 'test-media/3.mp4',
		answer: '',
	},{
		id: 2,
		title: '第三題',
		des: '他能讓你願意配合他嗎？比如他想看電影，他的說法或態度能讓你也願意看電影。',
		videoURL: 'test-media/3.mp4',
		answer: '',
	},{
		id: 2,
		title: '第三題',
		des: '他能讓你願意配合他嗎？比如他想看電影，他的說法或態度能讓你也願意看電影。',
		videoURL: 'test-media/3.mp4',
		answer: '',
	},{
		id: 2,
		title: '第三題',
		des: '他能讓你願意配合他嗎？比如他想看電影，他的說法或態度能讓你也願意看電影。',
		videoURL: 'test-media/3.mp4',
		answer: '',
	},{
		id: 2,
		title: '第三題',
		des: '他能讓你願意配合他嗎？比如他想看電影，他的說法或態度能讓你也願意看電影。',
		videoURL: 'test-media/3.mp4',
		answer: '',
	},{
		id: 2,
		title: '第三題',
		des: '他能讓你願意配合他嗎？比如他想看電影，他的說法或態度能讓你也願意看電影。',
		videoURL: 'test-media/3.mp4',
		answer: '',
	},{
		id: 2,
		title: '第三題',
		des: '他能讓你願意配合他嗎？比如他想看電影，他的說法或態度能讓你也願意看電影。',
		videoURL: 'test-media/3.mp4',
		answer: '',
	},{
		id: 2,
		title: '第三題',
		des: '他能讓你願意配合他嗎？比如他想看電影，他的說法或態度能讓你也願意看電影。',
		videoURL: 'test-media/3.mp4',
		answer: '',
	}];
	
	var switcher = new test_switcher(data);
	function append_nav(data){
		data.forEach(function(e){
			//$nav.append("<span class='nav-cell' id='nav"+e.id+"'><span class='check undone'>未填</span>("+e.id+")"+e.title+"</span><br/>");
			$nav.append("<a id='nav"+e.id+"' class='list-group-item nav-cell'><span class='check undone'>未填</span>("+e.id+")"+e.title+"</a>");
			$('#nav'+e.id).click(function(){
				switcher._switch(e.id);
			});
		});
	}
	append_nav(data);

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

	$('.next-btn').click(function(){
		switcher._switchNext();
	});
});

function test_switcher(data){ //耦合於data
	var switcher = {
		current_test: 0,
		finish_count: 0,
		data_length: data.length,
		testSwitch: function(id){
			this.current_test = id;
			$('#nav'+id).addClass('nav-avtive').siblings().removeClass('nav-avtive');
			console.log('test switched:', id);
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
		setAnswer: function setAnswer(id,ans){
			data[id].answer = ans;
			finish_count++;
			if(finish_count >= data_length){
				$('test-bodt-nav').append('<button class="btn-primary next-btn" style="font-size: 20px; padding: 5px 12px 5px 12px;">完成測驗</button>');
			}
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

