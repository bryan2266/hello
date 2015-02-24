//==========>studyRecordServer.js


//==========>include library || server settings
var config = require('./config/config.json');
var fn = require('./lib/functions.js');
var io = require('socket.io').listen(config.port);
var fs = require('fs');
//io.set('transports', ['xhr-polling']);

//==========>load record logs
var dir = config.logFolderName;
var bak = config.backupFolderName;
var imglog = config.imageFileName;

//==========>

var USERS = {}; //學員列表

var user = function () //學員屬性定義
{
	this.courseId = 1;
	this.userId = 2;
	this.section = 3;
	this.status = "test";
	this.t_login = 0;
	this.t_update = 0;
}

//==========>初始化
try{
	//檢查備份資料夾
	console.log("伺服器啟動, 進行初始化..");
	if (!fs.existsSync(bak))
	{
	    fs.mkdirSync(bak);
	    console.log("["+bak+"] 資料夾不存在, 已創建資料夾");
	}
	//檢查log資料夾
	if (!fs.existsSync(dir))
	{
	    fs.mkdirSync(dir);
	    console.log("["+dir+"] 資料夾不存在, 已創建資料夾");
	}
	else
	{
		//存在, 並檢查是否需要載入歷程
		console.log("["+dir+"] 資料夾存在, 載入歷程");
		//img檔存在, load img並移至備份區
		if(fs.existsSync(dir+'\\'+imglog))
		{
			//read img
			fs.readFile(dir+'\\'+imglog, function(err, data) 
			{
			    if(err) throw err;
			    var array = data.toString().split("\n");
			    for(i in array) 
			    {
			        //console.log(array[i]);
			    }
			});
			//mv img file to bak
			var _newFileName = "img-"+fn.getTime()+".bak";
			fs.rename(dir+'\\'+imglog, bak+'\\'+_newFileName, function (err) 
			{
				if (err) throw err;
			    fs.stat(bak+'\\'+_newFileName, function (err, stats) 
			    {
			  	    if (err) throw err;
			        //console.log('stats: ' + JSON.stringify(stats));
			    });
			});
			
			/*
			fs.appendFile(dir+'\\'+imglog, '1,1,1,1,1,1,1,1\r\n', function (err) 
			{
				if (err) throw err;
			  	console.log('++');
			});
			fs.appendFile(dir+'\\'+imglog, '2,2,2,2,2,2,2\r\n', function (err) 
			{
				if (err) throw err;
			  	console.log('++');
			});
			fs.appendFile(dir+'\\'+imglog, '3,3,3,3,3,3,3,3,3\r\n', function (err) 
			{
				if (err) throw err;
			  	console.log('++');
			});*/
		}
	}
}
catch(e)
{
	console.log(e);
}


setInterval(function()
{
	USERS[200] = new user;
	console.log(USERS[200].courseId);
	USERS[200].courseId = 10;
	console.log(USERS[200]);
}, 1000);

//==========>main
var conn = io.on('connection', function (socket) 
{
	console.log("add");
	socket.on('disconnect', function () 
	{
		console.log("out");
	});
});