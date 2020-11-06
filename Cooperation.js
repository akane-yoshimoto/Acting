/*slackに通知を送るプログラム*/

(function() {
    "use strict";
    kintone.events.on("portal.show", async()=> {

        function NOTIFICATION(check,id){

            var thisUrl = "https://サブドメイン名.cybozu.com/k/appID/show#record=" + id;
            var　URL = "https://サブドメイン名.cybozu.com/k/appID/;
            var webhookUrl = 'https://hooks.slack.com/services/生成したURL';
            var payload = {
                "text": "<@メンションしたいID> <" + thisUrl + "|「" + check + "」>\n"+
                        "一覧画面は<" + URL + "|こちら>",
                "link_names" : 1
            };
            return new kintone.Promise(function(resolve, reject) {
                kintone.proxy(webhookUrl, 'POST', {}, payload, function(body, status, headers) {      
                    resolve();
                });
            });
        };

        //当日通知分
        var body = {
            "app" : appID,
            "query": '終了日 = TODAY() and 処理状況 not in ("済") and 当日 not in ("通知済")',
            "fields":['終了日','確認事項','処理状況','recordID']
        }

        const resp = await kintone.api('/k/v1/records','GET',body);
        var time = moment().format('HH');
        var rerec,id;

        for(var i = 0 ; i < resp.records.length ; i++){

            rerec = resp.records[i].確認事項.value;
            id = resp.records[i].recordID.value;
        
            if(time == 8 || time == 9){

                await NOTIFICATION(rerec,id);

                //何度も通知しないように1回通知したら通知済にする
                var pbody = {
                    "app":appID,
                    "id" : id,
                    "record":{
                        "当日": {
                            "value" : ['通知済']
                        }
                    }
                };

        const presp = await kintone.api('/k/v1/record','PUT',pbody);
        console.log(presp);

            }
        }
    });
})();
